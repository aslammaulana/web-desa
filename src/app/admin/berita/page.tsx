'use client';

import React, { useState, useEffect } from 'react';
import { getBeritaList } from '@/lib/supabase/data-service';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Berita } from '@/types/database';
import { Newspaper, Plus, Trash2, Calendar, Tag, Check, Image as ImageIcon } from 'lucide-react';

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Pengumuman');
  const [ringkasan, setRingkasan] = useState('');
  const [konten, setKonten] = useState('');
  const [gambarUrl, setGambarUrl] = useState('');
  const [penulis, setPenulis] = useState('Admin Desa');

  useEffect(() => {
    loadBerita();
  }, []);

  const loadBerita = async () => {
    const list = await getBeritaList();
    setBeritaList(list);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !konten) {
      alert('Judul dan konten wajib diisi.');
      return;
    }

    setSubmitting(true);
    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.floor(100 + Math.random() * 900);

    const newBerita: Berita = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `b-${Date.now()}`,
      judul,
      slug,
      ringkasan: ringkasan || konten.slice(0, 150) + '...',
      konten,
      kategori,
      gambarUrl: gambarUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
      penulis,
      is_published: true,
      created_at: new Date().toISOString(),
    } as any;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('berita').insert([
          {
            judul: newBerita.judul,
            slug: newBerita.slug,
            ringkasan: newBerita.ringkasan,
            konten: newBerita.konten,
            kategori: newBerita.kategori,
            gambar_url: (newBerita as any).gambarUrl,
            penulis: newBerita.penulis,
            is_published: true,
          },
        ]);
        if (error) {
          alert('Gagal simpan di Supabase: ' + error.message);
        }
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    }

    setBeritaList([newBerita, ...beritaList]);
    setShowForm(false);
    setJudul('');
    setRingkasan('');
    setKonten('');
    setGambarUrl('');
    setSubmitting(false);
    alert('Berita baru berhasil diterbitkan!');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('berita').delete().eq('id', id);
      } catch (err) {
        console.error('Delete error on Supabase:', err);
      }
    }

    setBeritaList(beritaList.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kelola Berita & Pengumuman Desa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publikasikan program kerja, penyaluran bansos, dan agenda desa secara berkala.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Tutup Formulir' : 'Tambah Berita Baru'}
        </button>
      </div>

      {/* Form Tambah Berita */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Buat Artikel / Pengumuman Baru</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Berita *</label>
              <input
                type="text"
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Penyaluran BLT Dana Desa Tahap 3"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori *</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan Warga</option>
                <option value="Bantuan">Bantuan Sosial</option>
                <option value="Pembangunan">Pembangunan Desa</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Gambar Sampul (Opsional)</label>
              <input
                type="url"
                value={gambarUrl}
                onChange={(e) => setGambarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Penulis</label>
              <input
                type="text"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan Singkat</label>
            <input
              type="text"
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder="1-2 kalimat pengantar artikel"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Konten Lengkap *</label>
            <textarea
              required
              rows={5}
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              placeholder="Tuliskan berita secara mendetail di sini..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition disabled:opacity-50"
            >
              {submitting ? 'Menerbitkan...' : 'Terbitkan Berita'}
            </button>
          </div>
        </form>
      )}

      {/* Tabel Berita Terbit */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Artikel / Judul</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Penulis</th>
                <th className="px-6 py-3.5">Tanggal</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {beritaList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 text-sm">{item.judul}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.ringkasan}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600">{item.penulis}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus Berita"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
