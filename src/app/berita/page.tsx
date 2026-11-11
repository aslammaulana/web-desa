import React from 'react';
import Link from 'next/link';
import PublicShell from '@/components/PublicShell';
import { getBeritaList } from '@/lib/supabase/data-service';
import { Calendar, ArrowRight, User, Newspaper } from 'lucide-react';

export default async function BeritaPage() {
  const beritaList = await getBeritaList();

  return (
    <PublicShell>
      <div className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-2">
            <Newspaper className="w-4 h-4" />
            Warta & Pengumuman
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kabar Desa & Keterbukaan Informasi
          </h1>
          <p className="mt-3 text-emerald-100/80 max-w-2xl text-base">
            Ikuti berbagai informasi program, penyaluran bantuan sosial, kegiatan gotong royong, dan pengumuman resmi Desa Sukamaju.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaList.map((berita) => (
            <article
              key={berita.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="h-52 bg-slate-100 overflow-hidden relative">
                  <img
                    src={berita.gambar_url || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'}
                    alt={berita.judul}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-xs">
                    {berita.kategori}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(berita.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{berita.penulis}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-snug mb-3 hover:text-emerald-600 transition">
                    <Link href={`/berita/${berita.slug}`}>{berita.judul}</Link>
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {berita.ringkasan || berita.konten}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/berita/${berita.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Baca Berita Lengkap
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
