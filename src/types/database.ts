export type ProfilDesa = {
  id: string;
  nama_desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kode_pos: string;
  motto: string;
  deskripsi: string;
  alamat_kantor: string;
  telepon: string;
  email: string;
  jam_operasional: string;
  total_penduduk: number;
  total_kk: number;
  jumlah_dusun: number;
  jumlah_rt: number;
  jumlah_rw: number;
  updated_at?: string;
};

export type Berita = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  gambar_url: string;
  penulis: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type PermohonanSurat = {
  id: string;
  kode_tiket: string;
  nama_pemohon: string;
  nik: string;
  nomor_hp: string;
  alamat: string;
  jenis_surat: string;
  keperluan: string;
  dokumen_pendukung_url?: string;
  status: 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';
  catatan_petugas?: string;
  created_at: string;
  updated_at?: string;
};

export type Aparatur = {
  id: string;
  nama: string;
  jabatan: string;
  nip?: string;
  foto_url?: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
};

export type PotensiDesa = {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  pemilik_lokasi?: string;
  kontak?: string;
  gambar_url?: string;
  created_at?: string;
};
