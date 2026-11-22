import type { LangCode, Translation } from './types';

export const TRANSLATIONS: Record<LangCode, Translation> = {
  id: {
    nav: {
      about: '// TENTANG',
      skills: '// KOMPETENSI',
      projects: '// PROYEK',
      certifications: '// SERTIFIKAT',
      contact: '// KONTAK',
    },
    hero: {
      experienceLine1: 'Tahun Praktik',
      experienceLine2: 'Laboratorium & Analisis Data',
      locationBadge: 'Kepala Asisten Laboratorium ELITE, Universitas Gunadarma',
      greeting: 'Hai, saya',
      major: 'Bachelor of Industrial Engineering',
      specializationTitle: 'Teknik Industri & Optimasi Sistem',
      tagline: 'Systems Optimization | Operations Research | Supply Chain Management',
      ctaWorks: 'Lihat Proyek',
      ctaCv: 'Unduh CV',
      rollingRoles: [
        'Supply Chain Enthusiast',
        'Quality Engineering & SPC',
        'Production Planning & Control',
        'Operational Data Analytics',
      ],
      tags: ['Sistem Presisi', 'Riset Operasi', 'Otomasi Solutif'],
      quote:
        '"Pastikan untuk memiliki mimpi dan memiliki kepercayaan untuk mewujudkan mimpi itu!."',
    },
    coreCompetencies: {
      tag: '// COMPETENCY MAP',
      heading: 'Core Competencies',
      exploreCta: 'Eksplorasi kapabilitas →',
      panelHeaders: {
        capabilities: 'CAPABILITIES & METHODS',
        applications: 'APPLICATION AREAS',
        evidence: 'EMPIRICAL EVIDENCE',
        relatedProjects: 'RELATED PROJECTS',
        viewProjectCta: 'Lihat arsip proyek →'
      },
      items: [
        {
          title: 'Optimization & Decision Analysis',
          category: 'OPTIMIZATION',
          description: 'Menyelesaikan persoalan terstruktur yang melibatkan kendala, efisiensi, perutean, dan alokasi sumber daya.',
          capabilities: ['Mathematical Modeling', 'Heuristic Optimization', 'Routing Analysis', 'Decision Analysis'],
          applicationAreas: ['Distribution', 'Transportation', 'Operations'],
          evidence: ['GVRP Distribution Routing', 'Transportation Problem Analysis'],
          relatedProjects: [1] // 1: GVRP
        },
        {
          title: 'Supply Chain & Production Planning',
          category: 'OPERATIONS',
          description: 'Mengelola aliran material dan perencanaan operasional dari kebutuhan bahan baku hingga produksi dan distribusi.',
          capabilities: ['Supply Chain Analysis', 'Material Planning', 'MRP', 'Lot-Sizing', 'Distribution Analysis'],
          applicationAreas: ['Production Planning', 'Inventory', 'Distribution', 'Logistics'],
          evidence: ['MRP Lot-Sizing Tool', 'Distribution Analysis', 'LPG Distribution'],
          relatedProjects: [1, 5] // 1: GVRP, 5: MRP
        },
        {
          title: 'Data-Driven Analysis',
          category: 'ANALYTICS',
          description: 'Menggunakan analisis data terstruktur untuk mengevaluasi performa, mengidentifikasi pola, dan mendukung keputusan rekayasa.',
          capabilities: ['Data Processing', 'Statistical Analysis', 'Performance Analysis', 'Quality Analysis', 'Comparative Analysis'],
          applicationAreas: ['Academic Performance', 'Quality Analysis', 'Operational Evaluation'],
          evidence: ['Academic Live-Sync Dashboard', 'SPC Analysis', 'Performance Evaluation'],
          relatedProjects: [2] // 2: Live-Sync
        },
        {
          title: 'Process Improvement & Quality',
          category: 'IMPROVEMENT',
          description: 'Menganalisis variasi proses, metode kerja, dan prosedur operasi untuk mengidentifikasi peluang perbaikan terukur.',
          capabilities: ['Statistical Process Control', 'Process Capability', 'Time Study', 'Work Sampling', 'SOP Development'],
          applicationAreas: ['Quality', 'Work Systems', 'Process Operations', 'Standardization'],
          evidence: ['SPC Methodology Review', 'Work Measurement Project', '3D Printing Operational System'],
        },
        {
          title: 'Digital Process Automation',
          category: 'SYSTEMS',
          description: 'Mengubah alur kerja manual menjadi sistem digital terstruktur yang meningkatkan visibilitas, konsistensi, dan efisiensi operasional.',
          capabilities: ['Workflow Automation', 'Dashboard Systems', 'Real-Time Data', 'Multi-User Systems', 'Process Digitization'],
          applicationAreas: ['Academic Operations', 'Laboratory Governance', 'Administrative Workflows'],
          evidence: ['Academic Live-Sync Dashboard', 'Evaluation Portal', 'Governance Dashboard'],
          relatedProjects: [4, 3, 2] // 4: UP Portal, 3: Cashflow, 2: Live-Sync
        },
        {
          title: 'Technical Training & Knowledge Transfer',
          category: 'ENABLEMENT',
          description: 'Menerjemahkan pengetahuan teknis menjadi pelatihan, dokumentasi, dan panduan operasional terstruktur yang dapat diterapkan oleh orang lain.',
          capabilities: ['Technical Instruction', 'SOP Development', 'Cross-Training', 'Mentoring', 'Knowledge Documentation'],
          applicationAreas: ['Laboratory Training', 'Technical Assessment', 'Production Systems', 'Equipment Operations'],
          evidence: ['3D Printing Cross-Training', 'LSP Training', 'Production Systems Teaching'],
        }
      ],
    },
    skills: {
      tag: '// SKILL ARCHIVE',
      heading: 'Technical Capabilities Matrix',
      tagLabel: '// 01 SKILLS MATRIX',
    },
    sections: {
      projectsHeading: 'Project',
      certificationsHeading: 'Certificates & Credentials',
      certTagLabel: '// 02 CREDENTIALS',
    },
    music: {
      title: 'Jiraiya Theme',
      status: 'Oleh Anime Kei',
      playLabel: 'Putar musik latar',
      pauseLabel: 'Jeda musik latar',
    },
    footer: {
      copyright: '© 2026 Dicky Alfian Irvansyah. Hak Cipta Dilindungi.',
      builtWith: 'NEXT.JS + TAILWIND CSS',
    },
    projectsSection: {
      tag: '// DIGITAL ARCHIVE',
      searchPlaceholder: 'Cari teknologi, judul, atau domain teknik...',
      noResultsPrefix: 'Tidak ada proyek yang sesuai dengan kriteria',
    },
    about: {
      heading: 'Profile & Background',
      p1: 'Saya merupakan lulusan baru Teknik Industri yang berfokus pada optimasi sistem, riset operasi, dan perancangan otomatisasi alur kerja operasional. Saat ini menjabat sebagai Kepala Asisten Laboratorium di ELITE Lab, memimpin 18 asisten di lima divisi praktikum.',
      p2: 'Sebagian besar inisiatif saya berawal dari proses yang masih manual dan tidak efisien. Saya merombak rubrik penilaian setelah sistem terdahulu rentan menimbulkan bias, serta merancang aplikasi Google Apps Script 2-layer untuk otomatisasi keuangan lab dengan status zero outstanding fine. Saya juga mengembangkan perangkat lunak berbasis Python untuk memvalidasi soal ujian kalkulasi lot-sizing MRP secara otomatis.',
      p3: 'Di ranah riset logistik, saya memodelkan Green Vehicle Routing Problem (GVRP) berbasis Algoritma Genetika dan OpenStreetMap untuk memangkas jarak tempuh distribusi LPG sebesar 40.3%. Bagi saya, fungsi selalu mendahului bentuk: rekayasa yang baik selalu menghasilkan efisiensi yang terukur.',
      quickFactsTag: '// VERIFIED DOSSIER',
      quickFacts: [
        'S1 Teknik Industri — Universitas Gunadarma (IPK 3.84)',
        'Kepala Asisten, Laboratorium ELITE — memimpin 18 asisten di 5 divisi',
        '3+ Sistem Terotomasi (Python & Google Apps Script) aktif digunakan pengguna riil',
      ],
      metrics: [
        { value: '3.84', label: 'IPK' },
        { value: '18', label: 'ASISTEN DIPIMPIN' },
        { value: '40.3%', label: 'EFISIENSI RUTE' },
      ],
    },
    contact: {
      nameLabel: 'NAMA LENGKAP / IDENTITAS',
      namePlaceholder: 'Nama Anda',
      emailLabel: 'ALAMAT EMAIL',
      messageLabel: 'PESAN / TAWARAN KERJASAMA',
      messagePlaceholder: 'Sampaikan pertanyaan proyek atau peluang kolaborasi...',
      secureHeading: 'Kirim Pesan',
      buttonIdle: 'KIRIM PESAN',
      buttonSubmitting: 'MENGIRIMKAN PESAN...',
      buttonSuccess: '✓ PESAN BERHASIL TERKIRIM',
    },
    certificationsSection: {
      tag: '// OFFICIAL CREDENTIALS',
      loadMore: 'Muat Sertifikat Lainnya',
      showLess: 'Tampilkan Lebih Sedikit',
    },
    contactSection: {
      heading: 'Get In Touch',
      description:
        'Terbuka untuk diskusi proyek optimasi sistem, manajemen rantai pasok, atau peluang karir di bidang teknik industri.',
      successMessage: 'Pesan Anda berhasil terkirim!',
      errorMessage: 'Gagal mengirim pesan. Silakan coba lagi.',
    },
    detail: {
      back: 'KEMBALI KE STUDI KASUS',
      goalsHeading: 'Tujuan & Tahapan Rekayasa',
      stage: 'Tahap',
      techUsed: 'Teknologi & Alat',
      toolJustification: 'Justifikasi Alat',
      statusLabels: {
        active: 'STATUS: AKTIF & DIRAWAT',
        inDevelopment: 'STATUS: SEDANG DIKEMBANGKAN',
        completed: 'STATUS: SELESAI',
      },
    },
  },
  en: {
    nav: {
      about: '// ABOUT',
      skills: '// COMPETENCIES',
      projects: '// PROJECTS',
      certifications: '// CERTIFICATES',
      contact: '// CONTACT',
    },
    hero: {
      experienceLine1: 'Years of Practice',
      experienceLine2: 'Laboratory & Data Analysis',
      locationBadge: 'Head of Assistant ELITE Laboratory, Universitas Gunadarma',
      greeting: "Hi, I'm",
      major: 'Bachelor of Industrial Engineering',
      specializationTitle: 'Industrial Engineering & Systems Optimization',
      tagline: 'Systems Optimization | Operations Research | Supply Chain Management',
      ctaWorks: 'View Projects',
      ctaCv: 'Download CV',
      rollingRoles: [
        'Supply Chain Enthusiast',
        'Quality Engineering & SPC',
        'Production Planning & Control',
        'Operational Data Analytics',
      ],
      tags: ['Precise Systems', 'Operations Research', 'Actionable Automation'],
      quote:
        '"Make sure to have dreams and the confidence to make those dreams come true!"',
    },
    coreCompetencies: {
      tag: '// COMPETENCY MAP',
      heading: 'Core Competencies',
      exploreCta: 'Explore capability →',
      panelHeaders: {
        capabilities: 'CAPABILITIES & METHODS',
        applications: 'APPLICATION AREAS',
        evidence: 'EMPIRICAL EVIDENCE',
        relatedProjects: 'RELATED PROJECTS',
        viewProjectCta: 'View project archive →'
      },
      items: [
        {
          title: 'Optimization & Decision Analysis',
          category: 'OPTIMIZATION',
          description: 'I work with structured decision problems involving constraints, efficiency, routing, and resource allocation.',
          capabilities: ['Mathematical Modeling', 'Heuristic Optimization', 'Routing Analysis', 'Decision Analysis'],
          applicationAreas: ['Distribution', 'Transportation', 'Operations'],
          evidence: ['GVRP Distribution Routing', 'Transportation Problem Analysis'],
          relatedProjects: [1]
        },
        {
          title: 'Supply Chain & Production Planning',
          category: 'OPERATIONS',
          description: 'I work with material flows and operational planning from material requirements through production and distribution.',
          capabilities: ['Supply Chain Analysis', 'Material Planning', 'MRP', 'Lot-Sizing', 'Distribution Analysis'],
          applicationAreas: ['Production Planning', 'Inventory', 'Distribution', 'Logistics'],
          evidence: ['MRP Lot-Sizing Tool', 'Distribution Analysis', 'LPG Distribution'],
          relatedProjects: [1, 5]
        },
        {
          title: 'Data-Driven Analysis',
          category: 'ANALYTICS',
          description: 'I use structured data analysis to evaluate performance, identify patterns, and support engineering decisions.',
          capabilities: ['Data Processing', 'Statistical Analysis', 'Performance Analysis', 'Quality Analysis', 'Comparative Analysis'],
          applicationAreas: ['Academic Performance', 'Quality Analysis', 'Operational Evaluation'],
          evidence: ['Academic Live-Sync Dashboard', 'SPC Analysis', 'Performance Evaluation'],
          relatedProjects: [2]
        },
        {
          title: 'Process Improvement & Quality',
          category: 'IMPROVEMENT',
          description: 'I analyze process variation, work methods, and operating procedures to identify opportunities for measurable improvement.',
          capabilities: ['Statistical Process Control', 'Process Capability', 'Time Study', 'Work Sampling', 'SOP / Work Instruction'],
          applicationAreas: ['Quality', 'Work Systems', 'Process Operations', 'Standardization'],
          evidence: ['SPC Methodology Review', 'Work Measurement Project', '3D Printing Operational System'],
        },
        {
          title: 'Digital Process Automation',
          category: 'SYSTEMS',
          description: 'I transform manual workflows into structured digital systems that improve visibility, consistency, and operational efficiency.',
          capabilities: ['Workflow Automation', 'Dashboard Systems', 'Real-Time Data', 'Multi-User Systems', 'Process Digitization'],
          applicationAreas: ['Academic Operations', 'Laboratory Governance', 'Administrative Workflows'],
          evidence: ['Academic Live-Sync Dashboard', 'Evaluation Portal', 'Governance Dashboard'],
          relatedProjects: [4, 3, 2]
        },
        {
          title: 'Technical Training & Knowledge Transfer',
          category: 'ENABLEMENT',
          description: 'I translate technical knowledge into structured training, documentation, and operational guidance that can be applied by others.',
          capabilities: ['Technical Instruction', 'SOP Development', 'Cross-Training', 'Mentoring', 'Knowledge Documentation'],
          applicationAreas: ['Laboratory Training', 'Technical Assessment', 'Production Systems', 'Equipment Operations'],
          evidence: ['3D Printing Cross-Training', 'LSP Training', 'Production Systems Teaching'],
        }
      ],
    },
    skills: {
      tag: '// SKILL ARCHIVE',
      heading: 'Technical Capabilities Matrix',
      tagLabel: '// 01 SKILLS MATRIX',
    },
    sections: {
      projectsHeading: 'Projects',
      certificationsHeading: 'Certificates & Credentials',
      certTagLabel: '// 02 CREDENTIALS',
    },
    music: {
      title: 'Jiraiya Theme',
      status: 'by Anime Kei',
      playLabel: 'Play background music',
      pauseLabel: 'Pause background music',
    },
    footer: {
      copyright: '© 2026 Dicky Alfian Irvansyah. All Rights Reserved.',
      builtWith: 'NEXT.JS + TAILWIND CSS',
    },
    projectsSection: {
      tag: '// DIGITAL ARCHIVE',
      searchPlaceholder: 'Search technology, title, or engineering domain...',
      noResultsPrefix: 'No projects match your query',
    },
    about: {
      heading: 'Profile & Background',
      p1: 'I am an Industrial Engineering fresh graduate focused on systems optimization, operations research, and automated workflow engineering. I currently serve as Head of Assistant Laboratory at ELITE Lab, leading 18 assistants across five practicum divisions.',
      p2: 'Most of my projects began from manual and inefficient procedures. I re-architected evaluation rubrics after previous methods induced bias, built 2-layer Google Apps Script applications for lab financial governance achieving zero outstanding fines, and wrote automated Python engines to evaluate complex MRP lot-sizing calculations.',
      p3: 'In logistics research, I formulated a Green Vehicle Routing Problem (GVRP) using Genetic Algorithms and OpenStreetMap to cut LPG distribution travel distance by 40.3%. Form always follows function: true engineering produces measurable efficiency.',
      quickFactsTag: '// VERIFIED DOSSIER',
      quickFacts: [
        "Bachelor's in Industrial Engineering — Universitas Gunadarma (GPA 3.84)",
        'Head of Assistant, ELITE Laboratory — leading 18 assistants in 5 divisions',
        '3+ Automated Systems (Python & Google Apps Script) used in production daily',
      ],
      metrics: [
        { value: '3.84', label: 'GPA' },
        { value: '18', label: 'ASSISTANTS LED' },
        { value: '40.3%', label: 'ROUTE EFFICIENCY' },
      ],
    },
    contact: {
      nameLabel: 'FULL NAME / IDENTITY',
      namePlaceholder: 'Your Name',
      emailLabel: 'EMAIL ADDRESS',
      messageLabel: 'MESSAGE / COLLABORATION INQUIRY',
      messagePlaceholder: 'Share project details or professional inquiries...',
      secureHeading: 'Send Me a Message',
      buttonIdle: 'SEND MESSAGE',
      buttonSubmitting: 'SENDING MESSAGE...',
      buttonSuccess: '✓ MESSAGE SENT',
    },
    certificationsSection: {
      tag: '// OFFICIAL CREDENTIALS',
      loadMore: 'Load More Certificates',
      showLess: 'Show Less',
    },
    contactSection: {
      heading: 'Get In Touch',
      description:
        'Open for discussions on systems optimization, supply chain engineering, or operational engineering opportunities.',
      successMessage: 'Your message has been successfully sent!',
      errorMessage: 'Failed to send message. Please try again.',
    },
    detail: {
      back: 'BACK TO CASE STUDIES',
      goalsHeading: 'Engineering Goals & Stages',
      stage: 'Phase',
      techUsed: 'Technologies & Tools',
      toolJustification: 'Tool Justification',
      statusLabels: {
        active: 'STATUS: ACTIVE',
        inDevelopment: 'STATUS: IN DEVELOPMENT',
        completed: 'STATUS: COMPLETED',
      },
    },
  },
};