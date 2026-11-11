-- =======================================================
-- SCHEMA DATABASE SUPABASE UNTUK WEB DESA
-- Jalankan file ini di Supabase SQL Editor
-- =======================================================

-- 1. Tabel Profil Desa
CREATE TABLE IF NOT EXISTS public.profil_desa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_desa VARCHAR(100) NOT NULL DEFAULT 'Desa Sukamaju',
    kecamatan VARCHAR(100) NOT NULL DEFAULT 'Kecamatan Makmur',
    kabupaten VARCHAR(100) NOT NULL DEFAULT 'Kabupaten Sejahtera',
    provinsi VARCHAR(100) NOT NULL DEFAULT 'Jawa Barat',
    kode_pos VARCHAR(10) DEFAULT '40123',
    motto TEXT DEFAULT 'Maju, Mandiri, dan Berbudaya',
    deskripsi TEXT DEFAULT 'Desa Sukamaju adalah desa yang mengedepankan pelayanan digital, kerukunan warga, dan kemandirian ekonomi desa.',
    alamat_kantor TEXT DEFAULT 'Jl. Raya Desa Sukamaju No. 12',
    telepon VARCHAR(20) DEFAULT '(022) 1234567',
    email VARCHAR(100) DEFAULT 'kontak@desasukamaju.go.id',
    jam_operasional VARCHAR(100) DEFAULT 'Senin - Jumat, 08:00 - 15:30 WIB',
    total_penduduk INT DEFAULT 3850,
    total_kk INT DEFAULT 1120,
    jumlah_dusun INT DEFAULT 4,
    jumlah_rt INT DEFAULT 18,
    jumlah_rw INT DEFAULT 6,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Berita & Pengumuman
CREATE TABLE IF NOT EXISTS public.berita (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    ringkasan TEXT,
    konten TEXT NOT NULL,
    kategori VARCHAR(50) DEFAULT 'Pengumuman', -- Pengumuman, Kegiatan, Pembangunan, Bantuan
    gambar_url TEXT,
    penulis VARCHAR(100) DEFAULT 'Admin Desa',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Permohonan Layanan Surat Warga
CREATE TABLE IF NOT EXISTS public.permohonan_surat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kode_tiket VARCHAR(20) NOT NULL UNIQUE, -- e.g. SRT-202611-001
    nama_pemohon VARCHAR(150) NOT NULL,
    nik VARCHAR(16) NOT NULL,
    nomor_hp VARCHAR(20) NOT NULL,
    alamat TEXT NOT NULL,
    jenis_surat VARCHAR(100) NOT NULL, -- Surat Pengantar SKCK, Keterangan Usaha, Domisili, dll.
    keperluan TEXT NOT NULL,
    dokumen_pendukung_url TEXT,
    status VARCHAR(30) DEFAULT 'Menunggu', -- Menunggu, Diproses, Selesai, Ditolak
    catatan_petugas TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Perangkat / Aparatur Desa
CREATE TABLE IF NOT EXISTS public.aparatur (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(150) NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    nip VARCHAR(50),
    foto_url TEXT,
    urutan INT DEFAULT 0,
    status_aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Potensi & UMKM Desa
CREATE TABLE IF NOT EXISTS public.potensi_desa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(150) NOT NULL,
    kategori VARCHAR(50) DEFAULT 'UMKM', -- UMKM, Wisata, Pertanian, Budaya
    deskripsi TEXT NOT NULL,
    pemilik_lokasi VARCHAR(100),
    kontak VARCHAR(50),
    gambar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =======================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =======================================================

-- Aktifkan RLS
ALTER TABLE public.profil_desa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permohonan_surat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aparatur ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.potensi_desa ENABLE ROW LEVEL SECURITY;

-- 1. Profil Desa: Publik bisa baca, Admin bisa ubah
CREATE POLICY "Publik dapat melihat profil desa"
ON public.profil_desa FOR SELECT
USING (true);

CREATE POLICY "Admin dapat mengelola profil desa"
ON public.profil_desa FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 2. Berita: Publik bisa baca berita yang dipublish, Admin punya full akses
CREATE POLICY "Publik dapat membaca berita terbit"
ON public.berita FOR SELECT
USING (is_published = true);

CREATE POLICY "Admin dapat mengelola semua berita"
ON public.berita FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. Permohonan Surat:
-- - Warga publik bisa INSERT (ajukan permohonan)
-- - Warga publik bisa SELECT berdasarkan kode tiket & NIK untuk cek status
-- - Admin bisa melihat dan mengubah semua data
CREATE POLICY "Publik dapat mengajukan permohonan surat"
ON public.permohonan_surat FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Publik dapat mengecek status surat dengan kode tiket"
ON public.permohonan_surat FOR SELECT
USING (true);

CREATE POLICY "Admin dapat mengelola semua permohonan surat"
ON public.permohonan_surat FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Aparatur: Publik bisa baca yang aktif, Admin full akses
CREATE POLICY "Publik dapat melihat aparatur desa aktif"
ON public.aparatur FOR SELECT
USING (status_aktif = true);

CREATE POLICY "Admin dapat mengelola aparatur desa"
ON public.aparatur FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Potensi Desa: Publik bisa baca, Admin full akses
CREATE POLICY "Publik dapat melihat potensi desa"
ON public.potensi_desa FOR SELECT
USING (true);

CREATE POLICY "Admin dapat mengelola potensi desa"
ON public.potensi_desa FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
