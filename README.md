# 🏛️ Web Desa Sukamaju & Dashboard Admin Supabase

Portal website desa modern terintegrasi dengan **Next.js 15 (App Router)**, **Tailwind CSS**, dan database **Supabase PostgreSQL**. Dilengkapi fitur layanan administrasi permohonan surat online warga, pengecekan status tiket, warta desa, dan dashboard pengelolaan bagi perangkat desa.

---

## ✨ Fitur Utama

### 1. Portal Publik Warga
- **Beranda Desa**: Banner visi misi, statistik kependudukan (Penduduk, KK, RT/RW, Dusun), potensi desa & UMKM, dan kontak layanan.
- **Layanan Surat Online**: Warga dapat mengajukan surat administrasi (SKCK, SKU, Domisili, SKTM, dll.) langsung dari HP/komputer dan langsung mendapatkan **Kode Tiket Registrasi**.
- **Lacak Status Surat**: Fitur tracking dokumen secara real-time dengan memasukkan Kode Tiket & NIK.
- **Warta & Berita Desa**: Informasi publik, jadwal kegiatan, dan penyaluran bantuan sosial.
- **Struktur Perangkat Desa**: Profil pamong dan aparatur desa.

### 2. Dashboard Admin Desa (`/admin`)
- **Overview & Metrik**: Ringkasan total surat masuk, permohonan yang menunggu verifikasi, proses tanda tangan, dan selesai.
- **Kelola Surat Masuk**: Verifikasi permohonan, ubah status (Menunggu → Diproses → Selesai / Ditolak), dan kirim catatan kepada warga.
- **Kelola Berita**: Tambah berita/pengumuman baru dan hapus artikel lama.
- **Supabase Auth**: Login terenkripsi untuk petugas/admin desa.

---

## 🗄️ Panduan Setup Supabase Database

Semua skrip database telah disiapkan di folder `supabase/`:

### Langkah 1: Eksekusi Schema
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan buat project baru.
2. Buka menu **SQL Editor** di sidebar kiri.
3. Buka file `supabase/schema.sql` pada proyek ini, salin seluruh kodenya, lalu klik **Run** di SQL Editor Supabase.
   - Ini akan membuat tabel `profil_desa`, `berita`, `permohonan_surat`, `aparatur`, dan `potensi_desa` beserta aturan **Row Level Security (RLS)** yang aman.

### Langkah 2: Masukkan Data Awal (Opsional)
1. Di SQL Editor Supabase, salin kode dari `supabase/seed.sql` dan klik **Run**.
2. Ini akan mengisi data contoh profil desa, berita, dan jajaran aparatur.

### Langkah 3: Konfigurasi Environment Variables
1. Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Dapatkan API Key di Supabase: **Project Settings** → **API**.
3. Isi ke file `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
   ```

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Akses Dashboard Admin:**
   - Kunjungi [http://localhost:3000/admin](http://localhost:3000/admin)
   - *Catatan:* Jika Supabase belum dikonfigurasi, sistem otomatis menggunakan mock data dan demo mode sehingga aplikasi tetap berjalan lancar.

4. **Build untuk Produksi:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment (Vercel / Cloudflare / Netlify)

1. Push repository ini ke GitHub.
2. Buka [Vercel](https://vercel.com/) dan import repository `web-desa`.
3. Masukkan Environment Variables (`NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Klik **Deploy** — website desa Anda langsung aktif secara global!
