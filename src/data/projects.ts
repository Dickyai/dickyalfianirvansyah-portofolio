import type { Project } from '../types/project';

export const PROJECTS: Project[] = [
    {
    id: 5,
    title: 'MRP Lot-Sizing Automator',
    thumbType: 'terminal',
    status: 'completed', /* active; completed; in-development */
    desc: {
      id: 'Skrip perhitungan MRP yang di-generate secara unik berbasis nomor induk mahasiswa (NPM) untuk melacak letak kesalahan pengerjaan ujian secara instan.',
      en: "An MRP calculation script uniquely generated per student ID number (NPM) to instantly track where errors occur in a student's exam work."
    },
    tech: ['Python', 'Pandas', 'Data Automation'],
    period: 'Jun – Jul 2026',
    repo: 'https://github.com/Dickyai/midexam-mrp-tool',
    demo: 'https://dickyai.github.io/midexam-mrp-tool/',
    objectives: [
      { phase: { id: 'Formulasi Logika', en: 'Logic Formulation' }, detail: { id: 'Mengonversi metode Lot-Sizing manufaktur (Least Total Cost, Least Unit Cost, Part Period Balancing/EPP) ke algoritma pemrograman terstruktur.', en: 'Converted manufacturing Lot-Sizing methods (Least Total Cost, Least Unit Cost, Part Period Balancing/EPP) into a structured programming algorithm.' } },
      { phase: { id: 'Parameterisasi NPM', en: 'NPM Parameterization' }, detail: { id: 'Mengunci variabel input soal ujian berdasarkan digit unik NPM agar setiap mahasiswa menerima soal dengan kalkulasi yang berbeda.', en: 'Locked exam input variables based on unique NPM digits so each student receives questions with different calculations.' } },
      { phase: { id: 'Otomatisasi Ujian', en: 'Exam Automation' }, detail: { id: 'Menghasilkan kunci jawaban instan untuk 60+ tipe soal guna mempermudah asisten dalam mendeteksi lokasi deviasi perhitungan mahasiswa.', en: "Generated instant answer keys for 60+ question types to help assistants pinpoint students' calculation deviations." } }
    ],
    tools: [
      { name: 'Python (Pandas)', reason: { id: 'Mengelola dan memanipulasi baris matriks Material Requirements Planning (MRP) secara dinamis dalam format tabel tabular.', en: 'Manages and manipulates Material Requirements Planning (MRP) matrix rows dynamically in tabular format.' } }
    ],
    media: [
      { type: 'image', src: '/projects/midexam-mrp-tool/1.png', alt: 'Tampilan dashboard awal' },
      { type: 'image', src: '/projects/midexam-mrp-tool/2.png', alt: 'Tampilan dashboard contoh lot sizing' }
    ]
  },
    {
    id: 4,
    title: 'Presentation Exam (UP) Evaluation Portal',
    thumbType: 'monitor',
    status: 'active',
    desc: {
      id: 'Sistem evaluasi sidang terisolasi dengan keamanan login mandiri per-penguji. Mencegah bias nilai dengan sinkronisasi countdown timer multi-layar.',
      en: 'An isolated exam-evaluation system with independent per-examiner login security. Prevents score bias through multi-screen synchronized countdown timers.'
    },
    tech: ['Google Apps Script', 'Auth System', 'Live DOM', 'Realtime Sheets'],
    period: 'Apr 2026 – Present',
    repo: 'https://github.com/Dickyai/presentation-exam-evaluation-portal',
    demo: 'https://script.google.com/macros/s/AKfycbzsju2sULnwRAV1N7iVn4OZkgJGErCSk1xW6e4Y0qHbb0BFkj36X7r3IotzT7Jp7NnOBQ/exec',
    objectives: [
      { phase: { id: 'Identifikasi Root Cause', en: 'Root Cause Identification' }, detail: { id: 'Terjadinya bias penilaian (score drift) akibat para assessor atau penguji melihat akumulasi nilai sementara satu sama lain secara transparan.', en: "Score bias (score drift) occurred because examiners could transparently see each other's cumulative scores in real time." } },
      { phase: { id: 'Isolasi Akses', en: 'Access Isolation' }, detail: { id: 'Merancang dasbor login individual yang mengisolasi nilai dari masing-masing penguji sebelum finalisasi sidang.', en: "Designed individual login dashboards that isolate each examiner's scores before the exam is finalized." } },
      { phase: { id: 'Standardisasi Waktu', en: 'Time Standardization' }, detail: { id: 'Menerapkan timer mundur global tersinkronisasi lintas perangkat penguji guna menyamakan alokasi durasi presentasi antar kelompok.', en: 'Implemented a synchronized global countdown timer across examiner devices to equalize presentation time allocation between groups.' } }
    ],
    tools: [
      { name: 'Google Apps Script Security', reason: { id: 'Memanfaatkan otentikasi aman bawaan Google Workspace untuk mempartisi hak edit database per penguji.', en: "Leverages Google Workspace's built-in secure authentication to partition database edit rights per examiner." } }
    ],
    media: [
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/1.png', alt: 'Tampilan dashboard login' },
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/2.png', alt: 'Tampilan dashboard akun' },
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/3.png', alt: 'Tampilan dashboard penilai' },
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/4.png', alt: 'Tampilan dashboard operator' },
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/5.png', alt: 'Ruang Chat Asisten' },
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/6.png', alt: 'Rekapitulasi Progresi' },
      { type: 'image', src: '/projects/presentation-exam-evaluation-portal/7.png', alt: 'Evaluasi Praktikan' }
    ]
  },
  {
    id: 3,
    title: 'Governance & Finance Dashboard',
    thumbType: 'settings',
    status: 'active',
    desc: {
      id: 'Sistem tata kelola keuangan otomatis 2-layer dengan Google Apps Script untuk 18 asisten laboratorium. Menyelesaikan sengketa denda dengan status zero outstanding fine.',
      en: 'An automated 2-layer financial governance system built with Google Apps Script for 18 lab assistants. Resolved fine disputes with a zero-outstanding-fine status.'
    },
    tech: ['Google Apps Script', 'Automation', 'Finance', 'System Security'],
    period: 'Feb 2026 – Present',
    repo: 'https://github.com/Dickyai/cashflow-system-laboratory-webapp',
    demo: 'https://script.google.com/macros/s/AKfycbw7HnlfVyeeGyfuVxCObtueOLP8bMlA8cwNgcSLyD-b_vkaXbXG1jIRLDP2b7AAui8b/exec',
    objectives: [
      { phase: { id: 'Pemetaan Masalah', en: 'Problem Mapping' }, detail: { id: 'Pencatatan pelanggaran asisten via WhatsApp tidak terdokumentasi dengan rapi dan rawan terjadi salah hitung.', en: 'Assistant violation records kept via WhatsApp were poorly documented and prone to calculation errors.' } },
      { phase: { id: 'Arsitektur 2-Layer', en: '2-Layer Architecture' }, detail: { id: 'Membuat modul enkripsi pembacaan kas (read-only bagi publik) dan panel masukan khusus bendahara yang terautentikasi kunci enkripsi.', en: 'Built a read-only public cash-viewing module and an authenticated treasurer input panel secured with an encryption key.' } },
      { phase: { id: 'Automated Billing', en: 'Automated Billing' }, detail: { id: 'Menjadwalkan trigger otomatis pengiriman tagihan asisten tepat waktu pada pukul 00:00 setiap tanggal 25.', en: 'Scheduled automatic triggers to send assistant billing on time at 00:00 on the 25th of every month.' } }
    ],
    tools: [
      { name: 'GAS Trigger Scheduling', reason: { id: 'Menjamin otomatisasi tugas terjadwal berjalan tepat waktu di background cloud tanpa intervensi manual.', en: 'Ensures scheduled tasks run on time in the cloud background without manual intervention.' } }
    ],
    media: [
      { type: 'image', src: '/projects/cashflow-system-laboratory/1.png', alt: 'Tampilan Sistem Denda' },
      { type: 'image', src: '/projects/cashflow-system-laboratory/2.png', alt: 'Tampilan Sistem Kas' },
      { type: 'image', src: '/projects/cashflow-system-laboratory/3.png', alt: 'Tampilan Sistem Kas' },
      { type: 'image', src: '/projects/cashflow-system-laboratory/4.png', alt: 'Form autentikasi bendahara' },
      { type: 'image', src: '/projects/cashflow-system-laboratory/5.png', alt: 'Tampilan otoritas denda bendahara' },
      { type: 'image', src: '/projects/cashflow-system-laboratory/6.png', alt: 'Tampilan otoritas kas bendahara' },
      { type: 'image', src: '/projects/cashflow-system-laboratory/7.png', alt: 'Tampilan otoritas pengeluaran bendahara' }
    ]
  },
  {
    id: 2,
    title: 'Academic Live-Sync Web App',
    thumbType: 'code',
    status: 'active',
    desc: {
      id: 'Portal akademik berbasis cloud serverless yang mengeliminasi lembar nilai cetak manual untuk 79 pengguna. Menyajikan live ranking dan komparasi statistik nilai individu.',
      en: 'A serverless, cloud-based academic portal that eliminates manual printed grade sheets for 79 users. Delivers live rankings and individual score comparison statistics.'
    },
    tech: ['Google Apps Script', 'HTML', 'CSS', 'Spreadsheet API'],
    period: 'Feb 2026 – Present',
    repo: 'https://github.com/Dickyai/academic-live-sync-webapp',
    demo: 'https://script.google.com/macros/s/AKfycbyRYMub_miQrTZ9cW1t7IGaz-3_wqP-XLxDovp8GER7K0cmFEDbD8D7FWXR6YqnP1gI/exec',
    objectives: [
      { phase: { id: 'Analisis Masalah', en: 'Problem Analysis' }, detail: { id: 'Sistem cetak manual terdahulu rentan hilang, hanya mengabadikan sebagian sesi praktikum, dan menghambat transparansi umpan balik bagi mahasiswa.', en: 'The previous manual printing system was prone to loss, only captured part of practicum sessions, and hindered feedback transparency for students.' } },
      { phase: { id: 'Desain Sistem', en: 'System Design' }, detail: { id: 'Membangun portal nilai serverless terintegrasi langsung dengan database Google Sheets menggunakan Web App Deployment dari Google Apps Script.', en: "Built a serverless grading portal integrated directly with a Google Sheets database using Google Apps Script's Web App deployment." } },
      { phase: { id: 'Deployment & Optimasi', en: 'Deployment & Optimization' }, detail: { id: 'Diadopsi sukses oleh 79 pengguna aktif (67 mahasiswa + 12 asisten) dengan update live-grading yang tersinkronisasi instan.', en: 'Successfully adopted by 79 active users (67 students + 12 assistants) with instantly synchronized live-grading updates.' } }
    ],
    tools: [
      { name: 'Google Apps Script', reason: { id: 'Mengintegrasikan antarmuka web langsung dengan database cloud Google Sheets tanpa adanya latensi atau biaya server tambahan.', en: 'Integrates a web interface directly with the Google Sheets cloud database with no added latency or server costs.' } },
      { name: 'Advanced Sheets Formula', reason: { id: 'Formulasi komparatif internal menggunakan INDEX MATCH, VSTACK, dan pengkondisian logika untuk kalkulasi performa real-time.', en: 'Internal comparison logic using INDEX MATCH, VSTACK, and conditional logic for real-time performance calculations.' } }
    ],
    media: [
      { type: 'image', src: '/projects/academic-live-sync/1.png', alt: 'Halaman login portal akademik' },
      { type: 'image', src: '/projects/academic-live-sync/2.png', alt: 'Tampilan dashboard login' },
      { type: 'image', src: '/projects/academic-live-sync/3.png', alt: 'Tampilan dashboard operator' }
    ]
  },
  {
    id: 1,
    title: 'LPG Distribution GVRP Optimisation',
    thumbType: 'database',
    status: 'completed',
    desc: {
      id: 'Pemodelan rute distribusi LPG ke 12 titik menggunakan Green Vehicle Routing Problem berbasis Genetic Algorithm. Sukses mengurangi jarak tempuh dan emisi CO2 hingga 40.3%.',
      en: 'Modeled LPG distribution routes across 12 points using a Genetic Algorithm-based Green Vehicle Routing Problem. Successfully cut travel distance and CO2 emissions by up to 40.3%.'
    },
    tech: ['Python', 'Genetic Algorithm', 'OpenStreetMap', 'Optimization'],
    period: 'Dec 2025 – Mar 2026',
    repo: 'https://github.com/Dickyai/LPG-distribution-GVRP',
    demo: 'https://dickyai.github.io/LPG-distribution-GVRP/',
    objectives: [
      { phase: { id: 'Analisis Deskriptif', en: 'Descriptive Analysis' }, detail: { id: 'Pemetaan inefisiensi aliran distribusi eksisting di PT Teknoplast dan kalkulasi emisi karbon dasar sebagai baseline empiris.', en: "Mapped inefficiencies in PT Teknoplast's existing distribution flow and calculated baseline carbon emissions as an empirical benchmark." } },
      { phase: { id: 'Formulasi Model', en: 'Model Formulation' }, detail: { id: 'Membangun algoritma GVRP (Green Vehicle Routing Problem) berbasis Algoritma Genetika dengan parameter jarak riil yang ditarik secara dinamis dari OpenStreetMap API.', en: 'Built a Genetic Algorithm-based GVRP (Green Vehicle Routing Problem) using real distance parameters pulled dynamically from the OpenStreetMap API.' } },
      { phase: { id: 'Evaluasi Kinerja', en: 'Performance Evaluation' }, detail: { id: 'Menghasilkan 2-vehicle rute optimal yang memotong jarak total sejauh 54.83 km (efisiensi 40.29%) serta memangkas emisi karbon CO2 sebesar 24.283 gram (reduksi 40.34%).', en: 'Produced an optimal 2-vehicle route that cut total distance by 54.83 km (40.29% efficiency) and reduced CO2 emissions by 24,283 grams (40.34% reduction).' } }
    ],
    tools: [
      { name: 'Python (Google Colab)', reason: { id: 'Kapasitas komputasi awan yang andal untuk memproses iterasi ratusan generasi algoritma genetika dengan data logistik yang kompleks.', en: 'Reliable cloud computing capacity for processing hundreds of genetic algorithm generations with complex logistics data.' } },
      { name: 'OpenStreetMap API', reason: { id: 'Menyediakan representasi jarak operasional dunia nyata (bukan sekedar rumus Euclidean) untuk presisi rute jalan raya.', en: 'Provides real-world operational distance data (rather than simple Euclidean formulas) for road-route precision.' } }
    ],
    media: [
      { type: 'image', src: '/projects/LPG-distribution-GVRP/1.png', alt: 'Tampilan dashboard peta' },
      { type: 'image', src: '/projects/LPG-distribution-GVRP/2.png', alt: 'Tampilan ringkasan utama' },
      { type: 'image', src: '/projects/LPG-distribution-GVRP/3.png', alt: 'Tampilan konvergensi algoritma' },
      { type: 'image', src: '/projects/LPG-distribution-GVRP/4.png', alt: 'Tampilan ringkasan' }
    ]
  }
];