import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 3000;
const MAX_EMAIL_LENGTH = 254;

/**
 * Inisialisasi lazy singleton untuk rate limiter agar aman dari build-time crash
 * dan fail-open jika Upstash Redis sedang offline atau lambat.
 */
let ratelimitInstance: Ratelimit | null = null;
let redisInitialized = false;

function getRateLimiter(): Ratelimit | null {
  if (redisInitialized) return ratelimitInstance;
  redisInitialized = true;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) return null;

  try {
    ratelimitInstance = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(10, '10 m'), // 10 request per 10 menit
      analytics: true,
      prefix: 'ratelimit:contact-form',
    });
  } catch (err) {
    console.warn('[contact] Gagal menginisialisasi Redis rate limiter:', err);
    ratelimitInstance = null;
  }

  return ratelimitInstance;
}

/**
 * Anti-spoofing IP extraction
 */
function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const primary = forwardedFor.split(',')[0]?.trim();
    if (primary) return primary;
  }

  return '127.0.0.1';
}

/**
 * Sanitasi HTML untuk mencegah XSS pada email client
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    // 1. Verifikasi konfigurasi server
    if (!resendApiKey) {
      console.error('[contact] RESEND_API_KEY tidak ditemukan di environment variables.');
      return NextResponse.json(
        { error: 'Server belum dikonfigurasi untuk pengiriman email (API key kosong).' },
        { status: 500 }
      );
    }

    if (!toEmail) {
      console.error('[contact] CONTACT_TO_EMAIL tidak ditemukan di environment variables.');
      return NextResponse.json(
        { error: 'Server belum dikonfigurasi (email tujuan belum diatur).' },
        { status: 500 }
      );
    }

    // 2. Proteksi Payload Size (maks 64KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json(
        { error: 'Ukuran data pengiriman melebihi batas (Maks 64KB).' },
        { status: 413 }
      );
    }

    // 3. Rate Limiting dengan Timeout Cepat (Fail-Open)
    // Di mode development (localhost), lewati rate limiting agar tidak menahan proses testing
    if (process.env.NODE_ENV === 'production') {
      const ratelimit = getRateLimiter();
      if (ratelimit) {
        try {
          const ip = getClientIp(request);
          // Batasi waktu evaluasi Redis maks 1 detik agar pengguna tidak stuck di loading
          const limitPromise = ratelimit.limit(ip);
          const timeoutPromise = new Promise<{ success: boolean }>((resolve) =>
            setTimeout(() => resolve({ success: true }), 1000)
          );
          const { success } = await Promise.race([limitPromise, timeoutPromise]);
          if (!success) {
            return NextResponse.json(
              { error: 'Terlalu banyak pengiriman pesan. Silakan coba lagi dalam beberapa menit.' },
              { status: 429 }
            );
          }
        } catch (rateLimitErr) {
          console.warn('[contact] Rate limiting dilewati karena latency/error:', rateLimitErr);
        }
      }
    }

    // 4. Parsing & Validasi Request Body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Format data JSON tidak valid.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
    }

    const { name, email, message, company, website_url } = body as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      company?: unknown;
      website_url?: unknown;
    };

    // Honeypot check (jika bot mengisi field tersembunyi)
    if (company || website_url) {
      return NextResponse.json({ success: true });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Format data tidak valid.' }, { status: 400 });
    }

    // Sanitasi CRLF injection dari name & email
    const cleanName = name.replace(/[\r\n\t]/g, ' ').trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: 'Semua kolom wajib diisi.' }, { status: 400 });
    }

    if (cleanName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Nama terlalu panjang (maksimum ${MAX_NAME_LENGTH} karakter).` },
        { status: 400 }
      );
    }

    if (cleanEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: 'Format alamat email tidak valid.' }, { status: 400 });
    }

    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Pesan terlalu panjang (maksimum ${MAX_MESSAGE_LENGTH} karakter).` },
        { status: 400 }
      );
    }

    // 5. Pengiriman Email melalui Resend dengan Timeout 8 Detik
    const resend = new Resend(resendApiKey);

    const escapedName = escapeHtml(cleanName);
    const escapedEmail = escapeHtml(cleanEmail);
    const escapedMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br/>');
    const sentTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pesan Baru dari Portofolio</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #0f172a; padding: 24px 32px; border-bottom: 2px solid #3b82f6;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">Pesan Baru Portofolio</h2>
      <p style="color: #94a3b8; margin: 6px 0 0; font-size: 13px;">Diterima pada ${sentTime} WIB</p>
    </div>
    
    <div style="padding: 32px;">
      <div style="margin-bottom: 24px;">
        <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">Pengirim</p>
        <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f172a;">${escapedName}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">Email</p>
        <p style="margin: 0; font-size: 15px; font-weight: 500; color: #2563eb;">
          <a href="mailto:${escapedEmail}" style="color: #2563eb; text-decoration: none;">${escapedEmail}</a>
        </p>
      </div>

      <div style="margin-bottom: 8px;">
        <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">Pesan</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #334155;">
          ${escapedMessage}
        </div>
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #64748b;">Anda dapat langsung membalas email ini untuk merespons ke <strong>${escapedEmail}</strong>.</p>
    </div>
  </div>
</body>
</html>
`;

    // Kirim email dengan batas waktu maks 8 detik agar tidak hang
    const sendEmailPromise = resend.emails.send({
      from: 'Portofolio Contact Form <onboarding@resend.dev>',
      to: toEmail,
      replyTo: cleanEmail,
      subject: `Pesan baru dari ${cleanName} (Portofolio)`,
      text: `Nama: ${cleanName}\nEmail: ${cleanEmail}\nWaktu: ${sentTime} WIB\n\nPesan:\n${cleanMessage}`,
      html: htmlBody,
    });

    const emailTimeoutPromise = new Promise<{ data: null; error: { message: string } }>((_, reject) =>
      setTimeout(() => reject(new Error('Koneksi ke penyedia email timeout.')), 8000)
    );

    const { data, error } = await Promise.race([sendEmailPromise, emailTimeoutPromise]);

    if (error) {
      console.error('[contact] Resend menolak pengiriman:', error);
      return NextResponse.json(
        { error: 'Layanan email sementara gagal memproses permintaan. Silakan hubungi langsung via LinkedIn atau email.' },
        { status: 502 }
      );
    }

    console.log('[contact] Email berhasil diterima Resend, ID:', data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('[contact] Exception tidak tertangani:', error);
    const errorMsg =
      error instanceof Error && error.message.includes('timeout')
        ? 'Pengiriman email membutuhkan waktu terlalu lama. Silakan coba sesaat lagi.'
        : 'Terjadi kesalahan sistem saat mengirim pesan. Silakan coba lagi nanti.';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
