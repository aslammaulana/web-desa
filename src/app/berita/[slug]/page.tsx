import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/PublicShell';
import { getBeritaBySlug, getBeritaList } from '@/lib/supabase/data-service';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  const allBerita = await getBeritaList();
  return allBerita.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) {
    notFound();
  }

  const allBerita = await getBeritaList();
  const relatedBerita = allBerita.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <PublicShell>
      <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Berita
        </Link>

        {/* Badge & Title */}
        <div className="space-y-4 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Tag className="w-3 h-3" />
            {berita.kategori}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {berita.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pt-2 border-y border-slate-100 py-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>
                {new Date(berita.created_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Ditulis oleh: {berita.penulis}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {berita.gambar_url && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-md max-h-[480px]">
            <img
              src={berita.gambar_url}
              alt={berita.judul}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
          {berita.konten.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Share & Info Box */}
        <div className="mt-12 p-6 bg-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 font-medium">
            Bagikan warta resmi ini kepada kerabat dan warga lainnya.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pemerintah Desa Sukamaju
            </span>
          </div>
        </div>

        {/* Berita Terkait */}
        {relatedBerita.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Berita Lainnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBerita.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group block bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition"
                >
                  <p className="text-xs text-emerald-600 font-semibold mb-1">{item.kategori}</p>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-emerald-700 transition">
                    {item.judul}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PublicShell>
  );
}
