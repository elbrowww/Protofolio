# Full Stack Developer Portfolio

Portfolio dark editorial dengan aksen merah, terinspirasi dari referensi desain yang diberikan. Dibuat menggunakan React + Vite di frontend dan Node.js + Express di backend.

## Fitur
- Landing page responsif bergaya editorial: hero, project, pendidikan & skill, proses kerja, dan kontak.
- Data portfolio diambil dari endpoint `GET /api/portfolio`.
- Form kontak mengirim data ke `POST /api/contact` dan menyimpannya ke `server/data/messages.json`.
- Endpoint health check: `GET /api/health`.
- Layout mobile-friendly dan navigasi mobile.
- Mudah mengganti data profil, project, pengalaman, dan sertifikasi.

## Persyaratan
- Node.js 18 atau lebih baru
- npm

## Menjalankan project
1. Ekstrak ZIP.
2. Buka folder project di terminal.
3. Install dependency:

   ```bash
   npm install
   ```

4. Salin `.env.example` menjadi `.env` (opsional; nilai default sudah tersedia).
5. Jalankan frontend dan backend bersamaan:

   ```bash
   npm run dev
   ```

6. Buka `http://localhost:5173`.

Backend berjalan di `http://localhost:5000`.

## Build production

```bash
npm run build
npm start
```

Express akan menyajikan hasil build dari folder `dist` jika folder tersebut tersedia.

## Bagian yang WAJIB Anda sesuaikan
Data awal dibuat sebagai template dan bukan klaim data pribadi. Ubah informasi berikut sebelum portfolio dipublikasikan:

1. **Nama, email, nomor telepon, lokasi, dan deskripsi diri** di `server/index.js`, objek `profile`.
2. **Jumlah statistik** di `profile.stats` sesuai pencapaian nyata.
3. **Project** di array `projects`: nama, deskripsi, teknologi, hasil, dan URL repository/demo.
4. **Pengalaman dan pendidikan** di array `experience` serta bagian `EDUCATION` di `src/App.jsx`.
5. **Sertifikasi** di array `certifications`; hapus contoh yang tidak sesuai dan masukkan sertifikat asli.
6. **Skill** di array `skills`, sesuaikan dengan kemampuan yang benar-benar dikuasai.
7. Ubah judul halaman dan meta description pada `index.html`.

### Mengubah data portfolio
Data backend terdapat di `server/index.js`. Setelah mengubah data, simpan file dan refresh browser. Untuk mengubah tampilan, edit `src/App.jsx` dan `src/styles.css`.

### Menambahkan sertifikat
Edit daftar `certifications` di `server/index.js`, lalu isi tahun, nama sertifikat, dan penyelenggara. Simpan gambar sertifikat di folder `public` (misalnya `public/sertifikat-web.jpg`) dan isi properti `image` dengan path publiknya (misalnya `/sertifikat-web.jpg`). Jika `image` dikosongkan, portfolio akan menampilkan slot gambar sertifikat.

## API
### `GET /api/portfolio`
Mengambil seluruh data portfolio.

### `POST /api/contact`
Contoh body JSON:

```json
{
  "name": "Nama Pengirim",
  "email": "pengirim@email.com",
  "subject": "Kolaborasi website",
  "message": "Saya ingin berdiskusi mengenai project."
}
```

Field `name`, `email`, dan `message` wajib diisi. Pesan tersimpan di `server/data/messages.json`.

### `GET /api/health`
Memeriksa status backend.

## Catatan keamanan
Contoh ini cocok untuk starter portfolio/pembelajaran. Sebelum deployment publik, tambahkan rate limiting, validasi email yang lebih kuat, proteksi spam/CAPTCHA, logging, dan penyimpanan database produksi. Jangan menyimpan secret di frontend.
