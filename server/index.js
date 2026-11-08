import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
const messagesFile = path.join(dataDir, "messages.json");
fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, "[]");

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

const profile = {
  name: "ANGELLO ERIYA DEWANGGA",
  role: "FULL STACK DEVELOPER",
  location: "Indonesia",
  email: "angellodewangga784@gmail.com",
  phone: "+62 82335819350",
  availability: "Terbuka untuk peluang dan kolaborasi",
  about: "Saya adalah developer yang senang mengubah ide menjadi produk digital yang fungsional, cepat, dan mudah digunakan. Saya menikmati proses membangun antarmuka, merancang API, mengelola database, hingga menyiapkan aplikasi untuk digunakan.",
  stats: [{ value: "03+", label: "TAHUN BELAJAR & BERKARYA" }, { value: "12+", label: "PROJECT DIKERJAKAN" }, { value: "08+", label: "TEKNOLOGI DIKUASAI" }]
};

const projects = [
  { id: 1, number: "01", name: "MADRASAHKU", type: "EDUCATION PLATFORM", description: "Aplikasi manajemen madrasah untuk membantu pengelolaan data guru, jadwal, materi, tugas, dan aktivitas belajar.", stack: ["Flutter", "PHP", "MySQL"], result: "Sistem informasi pendidikan", theme: "project-red", url: "https://www.bengkuluinteraktif.com/wp-content/uploads/2019/05/Kosong.png" },
  { id: 2, number: "02", name: "DAPUR BU MON", type: "CATERING MANAGEMENT", description: "Aplikasi pemesanan katering dengan alur pelanggan, keranjang, aktivitas pesanan, pembayaran, dan dashboard pemilik.", stack: ["Flutter", "PHP", "MySQL"], result: "Pemesanan dan pengelolaan pesanan", theme: "project-cream", url: "https://www.bengkuluinteraktif.com/wp-content/uploads/2019/05/Kosong.png" },
  { id: 3, number: "03", name: "SI-AKADEMIK API", type: "REST API DEVELOPMENT", description: "Backend sistem akademik dengan autentikasi, token, validasi input, dan operasi CRUD data mahasiswa.", stack: ["PHP", "REST API", "JWT"], result: "API terstruktur dengan autentikasi", theme: "project-olive", url: "https://www.bengkuluinteraktif.com/wp-content/uploads/2019/05/Kosong.png" }
];

const experience = [
  { period: "2025 — SEKARANG", role: "STUDENT DEVELOPER", company: "Personal & Academic Projects", detail: "Membangun aplikasi web dan mobile sebagai bagian dari pembelajaran, eksplorasi teknologi, dan project kolaborasi." },
  { period: "2024 — 2025", role: "WEB DEVELOPMENT LEARNER", company: "Independent Learning", detail: "Mempelajari dasar frontend, backend, database relasional, REST API, version control, dan proses debugging." }
];

const certifications = [
  { year: "2025", title: "Web Development Fundamentals", issuer: "Tambahkan nama penyelenggara", note: "Ganti dengan sertifikasi yang benar-benar Anda miliki." },
  { year: "2025", title: "Database & API Development", issuer: "Tambahkan nama penyelenggara", note: "Tambahkan nomor atau tautan sertifikat jika tersedia." }
];

const skills = [
  { group: "FRONTEND", items: ["HTML5", "CSS3", "JavaScript", "React", "Responsive UI"] },
  { group: "BACKEND", items: ["Node.js", "Express.js", "PHP", "REST API"] },
  { group: "DATABASE & TOOLS", items: ["MySQL", "SQLite", "Git", "Postman", "VS Code"] }
];

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "portfolio-api" }));
app.get("/api/portfolio", (_req, res) => res.json({ profile, projects, experience, certifications, skills }));

app.post("/api/contact", (req, res) => {
  const { name, email, subject = "Pesan dari portfolio", message } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi." });
  }
  const messages = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
  const item = {
    id: Date.now().toString(),
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 150),
    subject: String(subject).trim().slice(0, 150),
    message: message.trim().slice(0, 3000),
    createdAt: new Date().toISOString()
  };
  messages.unshift(item);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  return res.status(201).json({ message: "Pesan berhasil dikirim. Terima kasih!", id: item.id });
});

const clientDist = path.resolve(__dirname, "../dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}

app.listen(PORT, () => console.log(`Portfolio API berjalan di http://localhost:${PORT}`));
