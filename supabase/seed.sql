-- =======================================================
-- SEED DATA CONTOH UNTUK WEB DESA
-- Opsional: Jalankan di Supabase SQL Editor setelah schema.sql
-- =======================================================

-- 1. Seed Profil Desa
INSERT INTO public.profil_desa (
    nama_desa, kecamatan, kabupaten, provinsi, kode_pos, motto,
    deskripsi, alamat_kantor, telepon, email, jam_operasional,
    total_penduduk, total_kk, jumlah_dusun, jumlah_rt, jumlah_rw
) VALUES (
    'Desa Sukamaju',
    'Kecamatan Makmur Jaya',
    'Kabupaten Sejahtera',
    'Jawa Barat',
    '40123',
    'Maju, Mandiri, dan Berbudaya',
    'Selamat datang di portal resmi Desa Sukamaju. Melalui layanan digital ini, kami berupaya menyajikan keterbukaan informasi publik dan mempercepat urusan administrasi warga.',
    'Jl. Pahlawan Desa No. 45, Desa Sukamaju',
    '(022) 8765-4321',
    'layanan@desasukamaju.id',
    'Senin - Jumat, 08.00 - 15.30 WIB',
    4280,
    1240,
    4,
    22,
    7
);

-- 2. Seed Berita & Pengumuman
INSERT INTO public.berita (judul, slug, ringkasan, konten, kategori, gambar_url, penulis, is_published)
VALUES 
(
    'Penyaluran Bantuan Pangan Cadangan Beras Tahap II',
    'penyaluran-bantuan-pangan-cadangan-beras-tahap-ii',
    'Pemerintah Desa Sukamaju menyalurkan bantuan beras kepada 350 Keluarga Penerima Manfaat di Balai Desa.',
    'Pemerintah Desa Sukamaju bekerja sama dengan Perum Bulog dan Kantor Pos telah sukses mendistribusikan Bantuan Pangan Beras Tahap II pada hari Selasa kemarin. Sebanyak 350 KPM menerima alokasi masing-masing 10 kg beras berkualitas prima. Kepala Desa berpesan agar bantuan ini meringankan beban kebutuhan pokok sehari-hari warga.',
    'Bantuan',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    'Sekretariat Desa',
    true
),
(
    'Jadwal Pelayanan Pembuatan KTP & KK Keliling Bulan Ini',
    'jadwal-pelayanan-pembuatan-ktp-kk-keliling',
    'Dinas Kependudukan akan hadir langsung di Kantor Desa Sukamaju untuk perekaman KTP-el dan perbaikan KK.',
    'Dalam rangka mendekatkan layanan kependudukan, mobil keliling Disdukcapil akan beroperasi di pelataran Kantor Desa Sukamaju pada tanggal 20-22 bulan ini, mulai pukul 09.00 hingga 14.00 WIB. Warga diharapkan membawa berkas lengkap berupa fotokopi dokumen lama dan surat pengantar RT/RW.',
    'Pengumuman',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    'Kaur Pelayanan',
    true
),
(
    'Gotong Royong Bersih Saluran Irigasi Sambut Musim Tanam',
    'gotong-royong-bersih-saluran-irigasi-sambut-musim-tanam',
    'Warga kelompok tani Dusun Sukawangi bahu-membahu membersihkan sedimentasi saluran irigasi primer.',
    'Menjelang musim tanam padi serentak, ratusan petani dan pemuda Dusun Sukawangi menggelar aksi bersih saluran air. Aksi ini berhasil melancarkan debit air ke sawah seluas kurang lebih 85 hektar, memperkuat ketahanan pangan warga desa.',
    'Kegiatan',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    'Admin Desa',
    true
);

-- 3. Seed Aparatur Desa
INSERT INTO public.aparatur (nama, jabatan, nip, foto_url, urutan, status_aktif)
VALUES
('H. Ahmad Suryana, S.Sos.', 'Kepala Desa', '19750512 200212 1 002', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 1, true),
('Budi Santoso, S.AP.', 'Sekretaris Desa', '19820315 200801 1 015', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', 2, true),
('Siti Rahmawati, S.E.', 'Kepala Urusan Keuangan', '19881120 201202 2 008', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 3, true),
('Dedi Permana', 'Kaur Tata Usaha & Umum', '19900405 201503 1 004', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', 4, true),
('Rina Marlina, S.IP.', 'Kepala Seksi Pelayanan', '19920810 201701 2 006', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', 5, true);

-- 4. Seed Potensi Desa
INSERT INTO public.potensi_desa (judul, kategori, deskripsi, pemilik_lokasi, kontak, gambar_url)
VALUES
(
    'Kerajinan Anyaman Bambu Lestari',
    'UMKM',
    'Produk anyaman bambu ramah lingkungan berkualitas ekspor khas pengrajin Dusun 2.',
    'Kelompok Usaha Bersama Lestari',
    '0812-3456-7890',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
),
(
    'Agrowisata Petik Jeruk Segar',
    'Wisata',
    'Kawasan kebun jeruk organik keluarga dengan pemandangan bukit asri dan udara sejuk pegunungan.',
    'BUMDes Makmur',
    '0856-7890-1234',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600'
),
(
    'Kopi Robusta Lereng Desa',
    'Pertanian',
    'Biji kopi petik merah olahan warga dengan aroma khas dan cita rasa rempah alami.',
    'Koperasi Tani Sejahtera',
    '0877-1122-3344',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'
);

-- 5. Seed Contoh Permohonan Surat (untuk pengujian admin)
INSERT INTO public.permohonan_surat (
    kode_tiket, nama_pemohon, nik, nomor_hp, alamat, jenis_surat, keperluan, status, catatan_petugas
) VALUES (
    'SRT-202611-001',
    'Agus Hendrawan',
    '3204123456780001',
    '081234567890',
    'RT 02 RW 01 Dusun Krajan',
    'Surat Pengantar SKCK',
    'Melamar pekerjaan di PT Sinar Abadi',
    'Diproses',
    'Berkas KTP dan KK sudah diverifikasi.'
),
(
    'SRT-202611-002',
    'Dewi Sartika',
    '3204123456780002',
    '089876543210',
    'RT 04 RW 02 Dusun Sukamulya',
    'Surat Keterangan Usaha (SKU)',
    'Persyaratan pengajuan KUR Bank BRI',
    'Selesai',
    'Surat sudah ditandatangani Kades dan dapat diambil di loket pelayanan.'
);
