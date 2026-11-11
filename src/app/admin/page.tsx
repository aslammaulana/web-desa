import React from 'react';
import Link from 'next/link';
import { getPermohonanList, getBeritaList } from '@/lib/supabase/data-service';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Newspaper,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const permohonanList = await getPermohonanList();
  const beritaList = await getBeritaList();

  const totalPermohonan = permohonanList.length;
  const menungguCount = permohonanList.filter((p) => p.status === 'Menunggu').length;
  const diprosesCount = permohonanList.filter((p) => p.status === 'Diproses').length;
  const selesaiCount = permohonanList.filter((p) => p.status === 'Selesai').length;

  return (
    <div className="space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Pelayanan Desa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau arus permohonan surat warga, update publikasi warta, dan keterbukaan informasi publik.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/surat"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            Verifikasi Surat Masuk
          </Link>
          <Link
            href="/admin/berita"
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            Tulis Berita Baru
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Total Permohonan</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalPermohonan}</p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            Semua surat yang terdaftar
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Menunggu Verifikasi</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{menungguCount}</p>
          <p className="text-xs text-slate-400 mt-2">Perlu tindakan dari petugas</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Sedang Diproses</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-purple-600">{diprosesCount}</p>
          <p className="text-xs text-slate-400 mt-2">Menunggu tanda tangan Kades</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Selesai Diterbitkan</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{selesaiCount}</p>
          <p className="text-xs text-slate-400 mt-2">Siap diambil pemohon</p>
        </div>
      </div>

      {/* Tabel Permohonan Terbaru */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Permohonan Surat Terbaru</h2>
            <p className="text-xs text-slate-500 mt-0.5">Daftar warga yang mengajukan dokumen administrasi</p>
          </div>
          <Link
            href="/admin/surat"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Kode Tiket</th>
                <th className="px-6 py-3.5">Nama Pemohon</th>
                <th className="px-6 py-3.5">Jenis Surat</th>
                <th className="px-6 py-3.5">Tanggal</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permohonanList.slice(0, 5).map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono font-semibold text-emerald-700 text-xs">
                    {row.kode_tiket}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{row.nama_pemohon}</p>
                    <p className="text-xs text-slate-400 font-mono">NIK: {row.nik}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">
                    {row.jenis_surat}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(row.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.status === 'Diproses'
                          ? 'bg-amber-100 text-amber-800'
                          : row.status === 'Ditolak'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href="/admin/surat"
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-800"
                    >
                      Kelola
                    </Link>
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
