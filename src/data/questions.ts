export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  questions: Question[];
}

export const subjects: Subject[] = [
  {
    id: "matematika",
    name: "Matematika",
    icon: "🔢",
    color: "text-kids-blue",
    bgColor: "bg-kids-blue/10",
    questions: [
      { id: 1, question: "Berapa hasil dari 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: 2 },
      { id: 2, question: "Berapa hasil dari 12 - 4?", options: ["6", "7", "8", "9"], correctAnswer: 2 },
      { id: 3, question: "Berapa hasil dari 3 x 4?", options: ["7", "10", "12", "15"], correctAnswer: 2 },
      { id: 4, question: "Berapa hasil dari 20 ÷ 5?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
      { id: 5, question: "Berapa hasil dari 15 + 7?", options: ["20", "21", "22", "23"], correctAnswer: 2 },
    ],
  },
  {
    id: "ipa",
    name: "IPA",
    icon: "🔬",
    color: "text-kids-green",
    bgColor: "bg-kids-green/10",
    questions: [
      { id: 1, question: "Matahari terbit dari arah?", options: ["Barat", "Timur", "Utara", "Selatan"], correctAnswer: 1 },
      { id: 2, question: "Hewan yang bertelur disebut?", options: ["Vivipar", "Ovipar", "Ovovivipar", "Herbivor"], correctAnswer: 1 },
      { id: 3, question: "Air mendidih pada suhu?", options: ["50°C", "75°C", "100°C", "150°C"], correctAnswer: 2 },
      { id: 4, question: "Planet terdekat dari Matahari?", options: ["Venus", "Merkurius", "Bumi", "Mars"], correctAnswer: 1 },
      { id: 5, question: "Bagian tumbuhan yang menyerap air?", options: ["Daun", "Batang", "Akar", "Bunga"], correctAnswer: 2 },
    ],
  },
  {
    id: "bahasa",
    name: "Bahasa Indonesia",
    icon: "📖",
    color: "text-kids-orange",
    bgColor: "bg-kids-orange/10",
    questions: [
      { id: 1, question: "Huruf kapital digunakan untuk?", options: ["Awal kalimat", "Tengah kata", "Akhir kalimat", "Semua huruf"], correctAnswer: 0 },
      { id: 2, question: "Sinonim dari kata 'besar' adalah?", options: ["Kecil", "Raksasa", "Pendek", "Tipis"], correctAnswer: 1 },
      { id: 3, question: "Antonim dari kata 'gelap' adalah?", options: ["Malam", "Suram", "Terang", "Dingin"], correctAnswer: 2 },
      { id: 4, question: "Tanda titik (.) digunakan di?", options: ["Awal kalimat", "Akhir kalimat", "Tengah kalimat", "Judul"], correctAnswer: 1 },
      { id: 5, question: "Kata benda disebut juga?", options: ["Verba", "Adjektiva", "Nomina", "Adverbia"], correctAnswer: 2 },
    ],
  },
];
