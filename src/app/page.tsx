import React from 'react';
import Link from 'next/link';
import PublicShell from '@/components/PublicShell';
import {
  getProfilDesa,
  getBeritaList,
  getPotensiList,
} from '@/lib/supabase/data-service';
import {
  FileText,
  Search,
  Users,
  Home,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone,
  Landmark,
} from 'lucide-react';

export default async function HomePage() {
  const profil = await getProfilDesa();
  const beritaList = await getBeritaList();
  const potensiList = await getPotensiList();

  const layananList = [
    {
      title: 'Surat Pengantar SKCK',
      desc: 'Pengantar permohonan Surat Keterangan Catatan Kepolisian ke Polsek setempat.',
      icon: ShieldCheck,
      syarat: 'Fotokopi KTP, KK, dan Surat Pengantar RT/RW',
    },
    {
      title: 'Surat Keterangan Usaha (SKU)',
      desc: 'Keterangan kepemilikan dan legalitas tempat usaha untuk perbankan/pinjaman modal.',
      icon: FileText,
      syarat: 'KTP, KK, dan Foto Dokumentasi Usaha',
    },
    {
      title: 'Surat Keterangan Domisili',
      desc: 'Keterangan tempat tinggal sementara atau domisili usaha di wilayah desa.',
      icon: Home,
      syarat: 'KTP Asli, KK Asal, dan Pengantar RT',
    },
    {
      title: 'Surat Keterangan Tidak Mampu (SKTM)',
      desc: 'Persyaratan bantuan sosial kependudukan, keringanan biaya RS, atau beasiswa.',
      icon: Users,
      syarat: 'KTP, KK, dan Rekomendasi RT/RW setempat',
    },
  ];

  return (
    <PublicShell>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-20 pb-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Sistem Informasi & Administrasi Desa Digital
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Maju, Mandiri, dan Melayani dengan Transparan
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/90 leading-relaxed mb-10">
              Selamat datang di portal resmi Pemerintah {profil.nama_desa}, {profil.kecamatan}.
              Urus permohonan surat administrasi warga secara online dan pantau kabar desa terkini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                Ajukan Surat Online
              </Link>
              <Link
                href="/layanan#cek-status"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-emerald-500/30 transition backdrop-blur-sm"
              >
                <Search className="w-5 h-5 text-emerald-400" />
                Cek Status Tiket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK DESA */}
      <section className="relative -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1">
                {profil.total_penduduk.toLocaleString('id-ID')}
              </p>
              <p className="text-sm font-medium text-slate-500">Total Penduduk (Jiwa)</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1">
                {profil.total_kk.toLocaleString('id-ID')}
              </p>
              <p className="text-sm font-medium text-slate-500">Kepala Keluarga (KK)</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1">
                {profil.jumlah_dusun}
              </p>
              <p className="text-sm font-medium text-slate-500">Wilayah Dusun</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1">
                {profil.jumlah_rt} / {profil.jumlah_rw}
              </p>
              <p className="text-sm font-medium text-slate-500">RT / RW Aktif</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN SURAT UTAMA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
              Pelayanan Administrasi Terpadu
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Layanan Surat Online Warga
            </h2>
          </div>
          <Link
            href="/layanan"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 group"
          >
            Lihat semua panduan layanan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layananList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-4">
                    <span className="font-semibold text-slate-600">Syarat:</span> {item.syarat}
                  </p>
                  <Link
                    href={`/layanan?jenis=${encodeURIComponent(item.title)}`}
                    className="block text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
                  >
                    Ajukan Sekarang
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BERITA & PENGUMUMAN TERKINI */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
                Kabar Desa Terkini
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Berita, Agenda & Pengumuman
              </h2>
            </div>
            <Link
              href="/berita"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 group"
            >
              Arsip berita lengkap
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaList.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition flex flex-col"
              >
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={item.gambar_url || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'}
                    alt={item.judul}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-xs">
                    {item.kategori}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 hover:text-emerald-600 transition">
                      <Link href={`/berita/${item.slug}`}>{item.judul}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {item.ringkasan || item.konten}
                    </p>
                  </div>
                  <Link
                    href={`/berita/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-3 border-t border-slate-100"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POTENSI & UMKM DESA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
            Kekayaan & Kreativitas Warga
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            Potensi Unggulan & UMKM Desa
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Menumbuhkan perekonomian masyarakat desa dengan mengangkat produk UMKM lokal, destinasi wisata, dan kerajinan warga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {potensiList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition"
            >
              <div className="h-44 bg-slate-100 overflow-hidden">
                <img
                  src={item.gambar_url}
                  alt={item.judul}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  {item.kategori}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.judul}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{item.deskripsi}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.pemilik_lokasi}</span>
                  {item.kontak && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {item.kontak}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION APARATUR */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Landmark className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Pemerintahan Desa yang Terbuka & Siap Melayani
          </h2>
          <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Kenali susunan pamong dan struktur organisasi pemerintahan Desa Sukamaju yang mengabdi untuk kemajuan masyarakat.
          </p>
          <Link
            href="/aparatur"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-900 font-semibold text-sm hover:bg-emerald-50 transition shadow-md"
          >
            <Users className="w-4 h-4 text-emerald-700" />
            Lihat Struktur Perangkat Desa
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
