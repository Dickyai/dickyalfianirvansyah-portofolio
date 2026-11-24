import type { LocalizedText, Project, ProjectImage } from '../types/project';

const text = (id: string, en: string): LocalizedText => ({ id, en });

const image = (src: string, id: string, en: string): ProjectImage => ({
  src,
  alt: text(id, en),
  caption: text(id, en),
});

export const PROJECTS: Project[] = [
  {
    slug: 'mrp-lot-sizing-automator',
    title: 'MRP Lot-Sizing Automator',
    category: 'automation',
    status: 'completed',
    period: 'Jun – Jul 2026',
    summary: text(
      'Aplikasi Python/Pandas yang membuat latihan MRP lot-sizing dan kunci jawaban secara otomatis berdasarkan NPM.',
      'A Python/Pandas app that generates MRP lot-sizing exercises and answer keys based on each student ID.',
    ),
    problem: text(
      'Soal lot-sizing MRP memiliki variasi perhitungan yang sulit diperiksa dan dilacak secara manual.',
      'MRP lot-sizing questions have varied calculations that are difficult to check and trace manually.',
    ),
    approach: text(
      'Mengubah metode Least Total Cost, Least Unit Cost, dan Part Period Balancing/EPP menjadi algoritma terstruktur; input tiap mahasiswa diparameterkan berdasarkan digit NPM.',
      'Implemented Least Total Cost, Least Unit Cost, and Part Period Balancing/EPP as structured algorithms, with each student’s inputs parameterized by their ID digits.',
    ),
    metrics: [
      {
        label: text('Tipe soal didukung', 'Question types supported'),
        value: '60+',
        detail: text('Kunci jawaban instan untuk membantu menemukan deviasi perhitungan.', 'Instant answer keys help identify calculation deviations.'),
      },
    ],
    stack: ['Python', 'Pandas', 'Data Automation'],
    images: [
      image('/projects/midexam-mrp-tool/1.png', 'Tampilan dashboard awal', 'Initial dashboard view'),
      image('/projects/midexam-mrp-tool/2.png', 'Contoh dashboard lot-sizing', 'Lot-sizing example dashboard'),
    ],
    links: {
      github: 'https://github.com/Dickyai/midexam-mrp-tool',
      live: 'https://dickyai.github.io/midexam-mrp-tool/',
    },
    thumbType: 'terminal',
  },
  {
    slug: 'presentation-exam-evaluation-portal',
    title: 'Presentation Exam (UP) Evaluation Portal',
    category: 'automation',
    status: 'active',
    period: 'Apr 2026 – Present',
    summary: text(
      'Portal evaluasi sidang dengan login individual untuk penguji dan timer presentasi tersinkronisasi.',
      'An exam evaluation portal with individual examiner logins and a synchronized presentation timer.',
    ),
    problem: text(
      'Penguji dapat melihat akumulasi nilai sementara satu sama lain, sehingga membuka peluang bias penilaian.',
      'Examiners could see one another’s running scores, creating an opportunity for scoring bias.',
    ),
    approach: text(
      'Membangun dashboard individual yang mengisolasi nilai tiap penguji dan menerapkan countdown timer global yang tersinkronisasi.',
      'Built individual dashboards that isolate each examiner’s scores and use a synchronized global countdown timer.',
    ),
    metrics: [
      {
        label: text('Asisten pengguna', 'Assistant users'),
        value: '18',
        detail: text(
          'Dirancang untuk 18 asisten. Hak akses penilai dipisahkan dan nilai tersinkron otomatis ke spreadsheet utama divisi Penilaian.',
          'Designed for 18 assistants. Examiner access is isolated, and scores sync automatically to the Assessment division’s primary spreadsheet.',
        ),
      },
    ],
    stack: ['Google Apps Script', 'Auth System', 'Live DOM', 'Realtime Sheets'],
    images: [
      image('/projects/presentation-exam-evaluation-portal/1.png', 'Tampilan dashboard login', 'Login dashboard'),
      image('/projects/presentation-exam-evaluation-portal/2.png', 'Tampilan dashboard akun', 'Account dashboard'),
      image('/projects/presentation-exam-evaluation-portal/3.png', 'Tampilan dashboard penilai', 'Examiner dashboard'),
      image('/projects/presentation-exam-evaluation-portal/4.png', 'Tampilan dashboard operator', 'Operator dashboard'),
      image('/projects/presentation-exam-evaluation-portal/5.png', 'Ruang chat asisten', 'Assistant chat room'),
      image('/projects/presentation-exam-evaluation-portal/6.png', 'Rekapitulasi progres', 'Progress summary'),
      image('/projects/presentation-exam-evaluation-portal/7.png', 'Evaluasi praktikan', 'Student evaluation'),
    ],
    links: {
      github: 'https://github.com/Dickyai/presentation-exam-evaluation-portal',
      live: 'https://script.google.com/macros/s/AKfycbzsju2sULnwRAV1N7iVn4OZkgJGErCSk1xW6e4Y0qHbb0BFkj36X7r3IotzT7Jp7NnOBQ/exec',
    },
    thumbType: 'monitor',
  },
  {
    slug: 'governance-finance-dashboard',
    title: 'Governance & Finance Dashboard',
    category: 'automation',
    status: 'active',
    period: 'Feb 2026 – Present',
    summary: text(
      'Sistem tata kelola keuangan dua lapis berbasis Google Apps Script untuk 18 asisten laboratorium.',
      'A two-layer Google Apps Script finance governance system for 18 laboratory assistants.',
    ),
    problem: text(
      'Pencatatan pelanggaran melalui WhatsApp sulit didokumentasikan dengan rapi dan rawan salah hitung.',
      'Violation records kept through WhatsApp were difficult to document consistently and prone to calculation errors.',
    ),
    approach: text(
      'Membangun tampilan kas publik read-only dan panel bendahara terautentikasi, serta menjadwalkan pengiriman tagihan otomatis.',
      'Built a read-only public cash view and an authenticated treasurer panel, with scheduled automatic billing.',
    ),
    metrics: [
      {
        label: text('Asisten laboratorium', 'Laboratory assistants'),
        value: '18',
      },
      {
        label: text('Denda tertunggak', 'Outstanding fines'),
        value: '0',
        detail: text('Status zero outstanding fine yang tercatat pada deskripsi proyek.', 'The project records a zero-outstanding-fine status.'),
      },
    ],
    stack: ['Google Apps Script', 'Automation', 'Finance', 'System Security'],
    images: [
      image('/projects/cashflow-system-laboratory/1.png', 'Tampilan sistem denda', 'Fine management view'),
      image('/projects/cashflow-system-laboratory/2.png', 'Tampilan sistem kas', 'Cash system view'),
      image('/projects/cashflow-system-laboratory/3.png', 'Ringkasan sistem kas', 'Cash system summary'),
      image('/projects/cashflow-system-laboratory/4.png', 'Form autentikasi bendahara', 'Treasurer authentication form'),
      image('/projects/cashflow-system-laboratory/5.png', 'Otoritas denda bendahara', 'Treasurer fine controls'),
      image('/projects/cashflow-system-laboratory/6.png', 'Otoritas kas bendahara', 'Treasurer cash controls'),
      image('/projects/cashflow-system-laboratory/7.png', 'Otoritas pengeluaran bendahara', 'Treasurer expense controls'),
    ],
    links: {
      github: 'https://github.com/Dickyai/cashflow-system-laboratory-webapp',
      live: 'https://script.google.com/macros/s/AKfycbw7HnlfVyeeGyfuVxCObtueOLP8bMlA8cwNgcSLyD-b_vkaXbXG1jIRLDP2b7AAui8b/exec',
    },
    thumbType: 'settings',
  },
  {
    slug: 'academic-live-sync-web-app',
    title: 'Academic Live-Sync Web App',
    category: 'analytics',
    status: 'active',
    period: 'Feb 2026 – Present',
    summary: text(
      'Portal akademik serverless yang menghubungkan Google Sheets dengan peringkat dan perbandingan nilai langsung.',
      'A serverless academic portal connecting Google Sheets with live rankings and score comparisons.',
    ),
    problem: text(
      'Lembar nilai cetak manual rentan hilang, hanya mencatat sebagian sesi, dan membatasi transparansi umpan balik.',
      'Printed grade sheets could be lost, captured only part of practicum sessions, and limited feedback transparency.',
    ),
    approach: text(
      'Membangun portal nilai berbasis Google Apps Script yang terhubung langsung ke Google Sheets dan mendukung pembaruan live grading.',
      'Built a Google Apps Script grading portal connected to Google Sheets with live grading updates.',
    ),
    metrics: [
      {
        label: text('Pengguna aktif', 'Active users'),
        value: '79',
        detail: text('67 mahasiswa dan 12 asisten.', '67 students and 12 assistants.'),
      },
    ],
    stack: ['Google Apps Script', 'HTML', 'CSS', 'Spreadsheet API'],
    images: [
      image('/projects/academic-live-sync/1.png', 'Halaman login portal akademik', 'Academic portal login'),
      image('/projects/academic-live-sync/2.png', 'Tampilan dashboard login', 'Login dashboard'),
      image('/projects/academic-live-sync/3.png', 'Tampilan dashboard operator', 'Operator dashboard'),
    ],
    links: {
      github: 'https://github.com/Dickyai/academic-live-sync-webapp',
      live: 'https://script.google.com/macros/s/AKfycbyRYMub_miQrTZ9cW1t7IGaz-3_wqP-XLxDovp8GER7K0cmFEDbD8D7FWXR6YqnP1gI/exec',
    },
    thumbType: 'code',
  },
  {
    slug: 'lpg-distribution-gvrp-optimization',
    title: 'LPG Distribution GVRP Optimisation',
    category: 'optimization',
    status: 'completed',
    period: 'Dec 2025 – Mar 2026',
    summary: text(
      'Pemodelan rute distribusi LPG ke 12 titik menggunakan Green Vehicle Routing Problem dan Genetic Algorithm.',
      'Modeled LPG distribution routes across 12 points using a Genetic Algorithm-based Green Vehicle Routing Problem.',
    ),
    problem: text(
      'Rute distribusi LPG memiliki jarak tempuh dan emisi yang dapat ditekan melalui optimasi rute.',
      'LPG distribution routes had travel distance and emissions that could be reduced through route optimization.',
    ),
    approach: text(
      'Memodelkan GVRP berbasis Genetic Algorithm dengan jarak jalan dari OpenStreetMap dan rute dua kendaraan.',
      'Modeled a Genetic Algorithm-based GVRP using road distances from OpenStreetMap and a two-vehicle route.',
    ),
    metrics: [
      {
        label: text('Jarak rute berkurang', 'Route distance reduced'),
        value: '54.83 km',
      },
      {
        label: text('Reduksi jarak', 'Distance reduction'),
        value: '40.29%',
      },
      {
        label: text('Reduksi emisi CO₂', 'CO₂ emissions reduced'),
        value: '40.34%',
        detail: text('Sebesar 24.283 gram pada hasil proyek.', 'A total of 24,283 grams in the project results.'),
      },
    ],
    stack: ['Python', 'Genetic Algorithm', 'OpenStreetMap', 'Optimization'],
    images: [
      image('/projects/LPG-distribution-GVRP/1.png', 'Tampilan dashboard peta', 'Map dashboard'),
      image('/projects/LPG-distribution-GVRP/2.png', 'Tampilan ringkasan utama', 'Main summary'),
      image('/projects/LPG-distribution-GVRP/3.png', 'Tampilan konvergensi algoritma', 'Algorithm convergence view'),
      image('/projects/LPG-distribution-GVRP/4.png', 'Tampilan ringkasan rute', 'Route summary'),
    ],
    links: {
      github: 'https://github.com/Dickyai/LPG-distribution-GVRP',
      live: 'https://dickyai.github.io/LPG-distribution-GVRP/',
    },
    thumbType: 'database',
  },
];
