import type { HeroData } from '../types/hero';

export const HERO_DATA: HeroData = {
  name: 'Dicky Alfian Irvansyah',
  greeting: {
    id: 'Hai, saya',
    en: "Hi, I'm"
  },
  major: {
    id: 'Teknik Industri',
    en: 'Bachelor of Industrial Engineering'
  },
  locationBadge: {
    id: 'Kepala Asisten Laboratorium ELITE, Universitas Gunadarma',
    en: 'Head of Assistant ELITE Laboratory, Universitas Gunadarma'
  },
  experienceBadge: {
    number: '2+',
    line1: {
      id: 'Tahun Praktik',
      en: 'Years of Practice'
    },
    line2: {
      id: 'Laboratorium & Analisis Data',
      en: 'Laboratory & Data Analysis'
    }
  },
  rollingRoles: {
    id: [
      'Peminat Rantai Pasok',
      'Teknik Kualitas',
      'Perencanaan Produksi',
      'Peminat Analitik Data'
    ],
    en: [
      'Supply Chain Enthusiast',
      'Quality Engineering',
      'Production Planning',
      'Data Analytics Enthusiast'
    ]
  },
  tags: ['🏷️ Inovatif', '🏷️ Kreatif', '🏷️ Pemecah Masalah'],
  quote: {
    id: '"Pastikan untuk memiliki mimpi dan memiliki kepercayaan untuk mewujudkan mimpi itu!."',
    en: '"Make sure to have dreams and the confidence to make those dreams come true!"'
  },
  about: {
    heading: {
      id: 'Tentang Saya',
      en: 'About Me!'
    },
    paragraphs: [
      {
        id: 'Saya merupakan lulusan baru Teknik Industri, saat ini menjabat Kepala Asisten Laboratorium di ELITE Lab, memimpin 18 asisten di lima divisi praktikum.',
        en: "I'm an Industrial Engineering fresh-graduate, currently Head of Assistant Laboratory at the ELITE Lab, leading 18 assistants across five practicum divisions."
      },
      {
        id: 'Sebagian besar proyek saya berawal dari sesuatu yang masih dikerjakan manual. Saya merombak rubrik penilaian setelah sistem lama merugikan mahasiswa secara tidak adil akibat kesalahan kelompok, dan membangun dashboard Google Apps Script yang menggantikan spreadsheet dan WhatsApp untuk penilaian, absensi, dan keuangan lab. Saya juga mengubah script Python pribadi menjadi web app publik untuk mengoreksi ujian yang tidak praktis diperiksa manual.',
        en: 'Most of my projects start from something still done manually. I rewrote our grading rubric after it unfairly penalized students for group mistakes, and built Google Apps Script dashboards that replaced spreadsheets and WhatsApp for grading, attendance, and lab finances. I also turned a personal Python script into a public web app for auto-grading exams that were impractical to check by hand.'
      },
      {
        id: 'Pola yang sama muncul juga di luar lab, mulai dari proyek perutean kendaraan dengan algoritma genetika hingga menemukan kesalahan metodologi dalam modul sertifikasi Quality Control. Apa pun konteksnya, saya cenderung berakhir melakukan hal yang sama: menemukan proses yang rusak atau masih manual, lalu membangun sesuatu yang benar-benar memperbaikinya.',
        en: 'The same pattern shows up outside the lab too, from a genetic algorithm vehicle routing project to catching a methodology error in a Quality Control certification module. Whatever the context, I tend to end up doing the same thing: finding where a process is broken or manual, and building something that fixes it properly.'
      }
    ],
    quickFactsTag: {
      id: '// RINGKASAN CEPAT',
      en: '// QUICK FACTS'
    },
    quickFacts: [
      {
        id: 'S1 Teknik Industri — Universitas Gunadarma',
        en: "Bachelor's in Industrial Engineering — Universitas Gunadarma"
      },
      {
        id: 'Kepala Asisten, Laboratorium ELITE — memimpin 18 asisten laboratorium',
        en: 'Head of Assistant, ELITE Laboratory — leading 18 lab assistants'
      },
      {
        id: 'Membangun 3+ sistem terotomasi (Python & Google Apps Script) yang digunakan puluhan pengguna aktif',
        en: 'Built 3+ automation systems (Python & Google Apps Script) used by dozens of active users'
      }
    ],
    metrics: [
      {
        value: '3.84',
        label: {
          id: 'IPK',
          en: 'GPA'
        }
      },
      {
        value: '18',
        label: {
          id: 'ASISTEN DIPIMPIN',
          en: 'ASSISTANTS LED'
        }
      },
      {
        value: '3',
        label: {
          id: 'SISTEM DIBANGUN',
          en: 'SYSTEMS BUILT'
        }
      }
    ]
  }
};
