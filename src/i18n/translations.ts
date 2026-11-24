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
      headline: 'Saya membangun sistem berbasis data untuk keputusan operasional yang lebih baik.',
      tagline: 'Systems Optimization | Operations Research | Supply Chain Management',
      ctaWorks: 'Lihat Proyek',
      ctaCv: 'Unduh CV',
      metrics: [
        { value: '3.84', label: 'IPK' },
        { value: '18', label: 'ASISTEN DIPIMPIN' },
        { value: '40.29%', label: 'REDUKSI JARAK RUTE' },
      ],
      rollingRoles: [
        'Systems Optimization',
        'Operations Research',
        'Operational Data Analytics',
      ],
      tags: ['Sistem Presisi', 'Riset Operasi', 'Otomasi Solutif'],
      quote:
        '"Pastikan untuk memiliki mimpi dan memiliki kepercayaan untuk mewujudkan mimpi itu!."',
    },
    coreCompetencies: {
      tag: '// COMPETENCY MAP',
      heading: 'Core Competencies',
      panelHeaders: {
        capabilities: 'CAPABILITIES & METHODS',
        applications: 'APPLICATION AREAS',
        evidence: 'EMPIRICAL EVIDENCE',
        relatedProjects: 'RELATED PROJECTS',
      },
      items: [
        {
          title: 'Optimization & Decision Analysis',
          category: 'OPTIMIZATION',
          description: 'Menyelesaikan persoalan terstruktur yang melibatkan kendala, efisiensi, perutean, dan alokasi sumber daya.',
          capabilities: ['Mathematical Modeling', 'Heuristic Optimization', 'Routing Analysis', 'Decision Analysis'],
          applicationAreas: ['Distribution', 'Transportation', 'Operations'],
          evidence: ['GVRP Distribution Routing', 'Transportation Problem Analysis'],
          relatedProjects: ['lpg-distribution-gvrp-optimization']
        },
        {
          title: 'Supply Chain & Production Planning',
          category: 'OPERATIONS',
          description: 'Mengelola aliran material dan perencanaan operasional dari kebutuhan bahan baku hingga produksi dan distribusi.',
          capabilities: ['Supply Chain Analysis', 'Material Planning', 'MRP', 'Lot-Sizing', 'Distribution Analysis'],
          applicationAreas: ['Production Planning', 'Inventory', 'Distribution', 'Logistics'],
          evidence: ['MRP Lot-Sizing Tool', 'Distribution Analysis', 'LPG Distribution'],
          relatedProjects: ['mrp-lot-sizing-automator', 'lpg-distribution-gvrp-optimization']
        },
        {
          title: 'Data-Driven Analysis',
          category: 'ANALYTICS',
          description: 'Menggunakan analisis data terstruktur untuk mengevaluasi performa, mengidentifikasi pola, dan mendukung keputusan rekayasa.',
          capabilities: ['Data Processing', 'Statistical Analysis', 'Performance Analysis', 'Quality Analysis', 'Comparative Analysis'],
          applicationAreas: ['Academic Performance', 'Quality Analysis', 'Operational Evaluation'],
          evidence: ['Academic Live-Sync Dashboard', 'SPC Analysis', 'Performance Evaluation'],
          relatedProjects: ['academic-live-sync-web-app']
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
          relatedProjects: [
            'presentation-exam-evaluation-portal',
            'governance-finance-dashboard',
            'academic-live-sync-web-app',
          ]
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
      playLabel: 'Nyalakan musik latar',
      pauseLabel: 'Bisukan musik latar',
    },
    footer: {
      copyright: '© 2026 Dicky Alfian Irvansyah. Hak Cipta Dilindungi.',
      builtWith: 'NEXT.JS + TAILWIND CSS',
    },
    projectsSection: {
      tag: '// DIGITAL ARCHIVE',
      searchPlaceholder: 'Cari teknologi, judul, atau domain teknik...',
      noResultsPrefix: 'Tidak ada proyek yang sesuai dengan kriteria',
      filters: {
        all: 'Semua Proyek',
        optimization: 'Optimization',
        automation: 'Automation',
        analytics: 'Analytics',
        quality: 'Quality',
      },
    },
    about: {
      heading: 'Profile & Background',
      studyStatusLabel: 'STATUS STUDI',
      points: [
        'Memimpin 18 asisten di lima divisi praktikum ELITE Lab.',
        'Mengubah alur kerja manual menjadi sistem digital untuk evaluasi ujian dan tata kelola keuangan laboratorium.',
        'Menerapkan Python/Pandas untuk latihan lot-sizing MRP dan Algoritma Genetika dengan OpenStreetMap untuk optimasi rute distribusi LPG.',
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
      copyEmail: 'Salin alamat email',
      copiedEmail: 'Email disalin',
      copyEmailFailed: 'Email tidak dapat disalin',
    },
    detail: {
      back: 'KEMBALI KE PROYEK',
      problem: 'Masalah',
      approach: 'Pendekatan',
      results: 'Hasil',
      stack: 'Stack',
      links: 'Tautan Proyek',
      github: 'Lihat GitHub',
      live: 'Lihat proyek live',
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
      headline: 'I build data-backed systems for better operational decisions.',
      tagline: 'Systems Optimization | Operations Research | Supply Chain Management',
      ctaWorks: 'View Projects',
      ctaCv: 'Download CV',
      metrics: [
        { value: '3.84', label: 'GPA' },
        { value: '18', label: 'ASSISTANTS LED' },
        { value: '40.29%', label: 'ROUTE DISTANCE REDUCED' },
      ],
      rollingRoles: [
        'Systems Optimization',
        'Operations Research',
        'Operational Data Analytics',
      ],
      tags: ['Precise Systems', 'Operations Research', 'Actionable Automation'],
      quote:
        '"Make sure to have dreams and the confidence to make those dreams come true!"',
    },
    coreCompetencies: {
      tag: '// COMPETENCY MAP',
      heading: 'Core Competencies',
      panelHeaders: {
        capabilities: 'CAPABILITIES & METHODS',
        applications: 'APPLICATION AREAS',
        evidence: 'EMPIRICAL EVIDENCE',
        relatedProjects: 'RELATED PROJECTS',
      },
      items: [
        {
          title: 'Optimization & Decision Analysis',
          category: 'OPTIMIZATION',
          description: 'I work with structured decision problems involving constraints, efficiency, routing, and resource allocation.',
          capabilities: ['Mathematical Modeling', 'Heuristic Optimization', 'Routing Analysis', 'Decision Analysis'],
          applicationAreas: ['Distribution', 'Transportation', 'Operations'],
          evidence: ['GVRP Distribution Routing', 'Transportation Problem Analysis'],
          relatedProjects: ['lpg-distribution-gvrp-optimization']
        },
        {
          title: 'Supply Chain & Production Planning',
          category: 'OPERATIONS',
          description: 'I work with material flows and operational planning from material requirements through production and distribution.',
          capabilities: ['Supply Chain Analysis', 'Material Planning', 'MRP', 'Lot-Sizing', 'Distribution Analysis'],
          applicationAreas: ['Production Planning', 'Inventory', 'Distribution', 'Logistics'],
          evidence: ['MRP Lot-Sizing Tool', 'Distribution Analysis', 'LPG Distribution'],
          relatedProjects: ['mrp-lot-sizing-automator', 'lpg-distribution-gvrp-optimization']
        },
        {
          title: 'Data-Driven Analysis',
          category: 'ANALYTICS',
          description: 'I use structured data analysis to evaluate performance, identify patterns, and support engineering decisions.',
          capabilities: ['Data Processing', 'Statistical Analysis', 'Performance Analysis', 'Quality Analysis', 'Comparative Analysis'],
          applicationAreas: ['Academic Performance', 'Quality Analysis', 'Operational Evaluation'],
          evidence: ['Academic Live-Sync Dashboard', 'SPC Analysis', 'Performance Evaluation'],
          relatedProjects: ['academic-live-sync-web-app']
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
          relatedProjects: [
            'presentation-exam-evaluation-portal',
            'governance-finance-dashboard',
            'academic-live-sync-web-app',
          ]
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
      playLabel: 'Unmute background music',
      pauseLabel: 'Mute background music',
    },
    footer: {
      copyright: '© 2026 Dicky Alfian Irvansyah. All Rights Reserved.',
      builtWith: 'NEXT.JS + TAILWIND CSS',
    },
    projectsSection: {
      tag: '// DIGITAL ARCHIVE',
      searchPlaceholder: 'Search technology, title, or engineering domain...',
      noResultsPrefix: 'No projects match your query',
      filters: {
        all: 'All Projects',
        optimization: 'Optimization',
        automation: 'Automation',
        analytics: 'Analytics',
        quality: 'Quality',
      },
    },
    about: {
      heading: 'Profile & Background',
      studyStatusLabel: 'STUDY STATUS',
      points: [
        'Lead 18 assistants across five practicum divisions at ELITE Lab.',
        'Turn manual workflows into digital systems for exam evaluation and laboratory finance governance.',
        'Apply Python/Pandas to MRP lot-sizing exercises and Genetic Algorithms with OpenStreetMap to optimize LPG distribution routes.',
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
      copyEmail: 'Copy email address',
      copiedEmail: 'Email copied',
      copyEmailFailed: 'Could not copy email',
    },
    detail: {
      back: 'BACK TO PROJECTS',
      problem: 'Problem',
      approach: 'Approach',
      results: 'Results',
      stack: 'Stack',
      links: 'Project links',
      github: 'View on GitHub',
      live: 'Open live project',
      statusLabels: {
        active: 'STATUS: ACTIVE',
        inDevelopment: 'STATUS: IN DEVELOPMENT',
        completed: 'STATUS: COMPLETED',
      },
    },
  },
};