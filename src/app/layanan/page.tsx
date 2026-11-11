'use client';

import React, { useState } from 'react';
import PublicShell from '@/components/PublicShell';
import { submitPermohonanSurat, checkStatusSurat } from '@/lib/supabase/data-service';
import { PermohonanSurat } from '@/types/database';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  Send,
  HelpCircle,
} from 'lucide-react';

export default function LayananSuratPage() {
  const [activeTab, setActiveTab] = useState<'ajukan' | 'status'>('ajukan');

  // State Form Pengajuan
  const [formData, setFormData] = useState({
    nama_pemohon: '',
    nik: '',
    nomor_hp: '',
    alamat: '',
    jenis_surat: 'Surat Pengantar SKCK',
    keperluan: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    ticket?: string;
    message?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // State Cek Status
  const [searchTicket, setSearchTicket] = useState('');
  const [searchNik, setSearchNik] = useState('');
  const [checking, setChecking] = useState(false);
  const [statusResult, setStatusResult] = useState<PermohonanSurat | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const jenisSuratOptions = [
    'Surat Pengantar SKCK',
    'Surat Keterangan Usaha (SKU)',
    'Surat Keterangan Domisili',
    'Surat Keterangan Tidak Mampu (SKTM)',
    'Surat Keterangan Belum Menikah',
    'Surat Keterangan Penghasilan',
    'Surat Pengantar Pindah Domisili',
    'Surat Keterangan Kelahiran / Kematian',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_pemohon || !formData.nik || !formData.nomor_hp || !formData.alamat || !formData.keperluan) {
      alert('Harap lengkapi semua kolom isian formulir.');
      return;
    }

    if (formData.nik.length < 16) {
      alert('Nomor Induk Kependudukan (NIK) harus 16 digit.');
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    // Format kode tiket unik
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const kodeTiket = `SRT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomCode}`;

    try {
      const res = await submitPermohonanSurat({
        kode_tiket: kodeTiket,
        nama_pemohon: formData.nama_pemohon,
        nik: formData.nik,
        nomor_hp: formData.nomor_hp,
        alamat: formData.alamat,
        jenis_surat: formData.jenis_surat,
        keperluan: formData.keperluan,
      });

      if (res.success && res.data) {
        setSubmitResult({
          success: true,
          ticket: res.data.kode_tiket,
          message: res.message,
        });
        setFormData({
          nama_pemohon: '',
          nik: '',
          nomor_hp: '',
          alamat: '',
          jenis_surat: 'Surat Pengantar SKCK',
          keperluan: '',
        });
      } else {
        setSubmitResult({
          success: false,
          message: res.message || 'Gagal mengirimkan permohonan.',
        });
      }
    } catch (err: any) {
      setSubmitResult({
        success: false,
        message: err.message || 'Terjadi kesalahan jaringan.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicket.trim() || !searchNik.trim()) {
      setCheckError('Masukkan Kode Tiket dan NIK pemohon.');
      return;
    }

    setChecking(true);
    setCheckError(null);
    setStatusResult(null);

    try {
      const result = await checkStatusSurat(searchTicket, searchNik);
      if (result) {
        setStatusResult(result);
      } else {
        setCheckError('Permohonan tidak ditemukan. Periksa kembali Kode Tiket dan NIK Anda.');
      }
    } catch (err) {
      setCheckError('Terjadi kesalahan saat memeriksa data.');
    } finally {
      setChecking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Selesai / Siap Diambil
          </span>
        );
      case 'Diproses':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Sedang Diverifikasi Petugas
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Ditolak / Berkas Kurang
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Menunggu Antrean
          </span>
        );
    }
  };

  return (
    <PublicShell>
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Pelayanan Administrasi Warga
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Layanan Surat Keterangan Online
          </h1>
          <p className="mt-2 text-emerald-100/80 max-w-2xl text-sm sm:text-base">
            Urus berkas administrasi desa dari rumah tanpa repot antre di balai desa.
            Pantau status proses suratmu langsung dengan kode tiket.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex p-1 bg-slate-200/80 rounded-xl mb-10 shadow-inner max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('ajukan')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
              activeTab === 'ajukan'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Ajukan Surat Baru
          </button>
          <button
            id="cek-status"
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
              activeTab === 'status'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            Cek Status Tiket
          </button>
        </div>

        {/* TAB 1: FORM PENGAJUAN SURAT */}
        {activeTab === 'ajukan' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            {submitResult && submitResult.success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Permohonan Berhasil Dikirim!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Catat atau simpan <strong>Kode Tiket</strong> di bawah ini untuk mengecek status pemrosesan dokumen Anda.
                </p>

                <div className="inline-flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl my-4">
                  <span className="font-mono text-xl font-extrabold text-emerald-800 tracking-wider">
                    {submitResult.ticket}
                  </span>
                  <button
                    onClick={() => copyToClipboard(submitResult.ticket || '')}
                    className="p-2 rounded-lg bg-emerald-200 hover:bg-emerald-300 text-emerald-900 transition"
                    title="Salin Kode Tiket"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchTicket(submitResult.ticket || '');
                      setActiveTab('status');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
                  >
                    Periksa Status Sekarang
                  </button>
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
                  >
                    Buat Pengajuan Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    Formulir Permohonan Dokumen
                  </h2>
                  <p className="text-sm text-slate-500">
                    Isi data diri Anda dengan benar sesuai identitas KTP dan Kartu Keluarga (KK).
                  </p>
                </div>

                {submitResult && !submitResult.success && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700">
                    {submitResult.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Nama Lengkap Pemohon *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama_pemohon}
                      onChange={(e) => setFormData({ ...formData, nama_pemohon: e.target.value })}
                      placeholder="Sesuai KTP"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                    />
                  </div>

                  {/* NIK */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Nomor Induk Kependudukan (NIK) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="16 Digit Angka NIK"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nomor WhatsApp / HP */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp / HP Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.nomor_hp}
                      onChange={(e) => setFormData({ ...formData, nomor_hp: e.target.value })}
                      placeholder="0812xxxxxxxx"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                    />
                    <p className="text-xs text-slate-400 mt-1">Petugas akan menghubungi saat dokumen selesai.</p>
                  </div>

                  {/* Jenis Surat */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Jenis Surat Yang Dimohon *
                    </label>
                    <select
                      value={formData.jenis_surat}
                      onChange={(e) => setFormData({ ...formData, jenis_surat: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition bg-white"
                    >
                      {jenisSuratOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Alamat */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Alamat Lengkap / Dusun & RT/RW *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Contoh: Dusun Sukasari RT 03 / RW 02"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                  />
                </div>

                {/* Keperluan */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Keperluan Pengajuan *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.keperluan}
                    onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                    placeholder="Jelaskan untuk apa surat keterangan ini dibuat (misal: syarat pendaftaran kerja, pengajuan KUR bank, dll)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                  />
                </div>

                {/* Catatan Persyaratan */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pemberitahuan:</strong> Harap siapkan fotokopi KTP, KK, dan surat pengantar dari ketua RT saat mengambil surat fisik di Balai Desa Sukamaju.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sedang Mengirimkan...' : 'Kirim Permohonan Surat'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: FORM CEK STATUS TIKET */}
        {activeTab === 'status' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Lacak Status Permohonan
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Masukkan Kode Tiket yang Anda peroleh saat mengajukan surat dan NIK yang terdaftar.
              </p>
            </div>

            <form onSubmit={handleCheckStatus} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Kode Tiket *
                  </label>
                  <input
                    type="text"
                    required
                    value={searchTicket}
                    onChange={(e) => setSearchTicket(e.target.value.toUpperCase())}
                    placeholder="Contoh: SRT-202611-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    NIK Pemohon *
                  </label>
                  <input
                    type="text"
                    required
                    value={searchNik}
                    onChange={(e) => setSearchNik(e.target.value)}
                    placeholder="16 Digit NIK"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={checking}
                className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                {checking ? 'Mencari Data...' : 'Cari Data Permohonan'}
              </button>
            </form>

            {checkError && (
              <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{checkError}</span>
              </div>
            )}

            {/* HASIL TRACKING */}
            {statusResult && (
              <div className="mt-8 border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Nomor Registrasi Tiket:</span>
                    <p className="text-lg font-extrabold font-mono text-emerald-700">
                      {statusResult.kode_tiket}
                    </p>
                  </div>
                  <div>{getStatusBadge(statusResult.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Nama Pemohon</p>
                    <p className="font-semibold text-slate-800">{statusResult.nama_pemohon}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Jenis Surat</p>
                    <p className="font-semibold text-slate-800">{statusResult.jenis_surat}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Tanggal Pengajuan</p>
                    <p className="font-medium text-slate-700">
                      {new Date(statusResult.created_at).toLocaleDateString('id-ID', {
                        dateStyle: 'long',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Keperluan</p>
                    <p className="font-medium text-slate-700">{statusResult.keperluan}</p>
                  </div>
                </div>

                {/* Catatan dari Petugas Admin */}
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Catatan Pelayanan Petugas:
                  </p>
                  <p className="text-sm text-slate-600">
                    {statusResult.catatan_petugas ||
                      (statusResult.status === 'Selesai'
                        ? 'Surat telah selesai diverifikasi dan dapat diambil di loket pelayanan Balai Desa Sukamaju pada jam kerja.'
                        : 'Permohonan Anda sedang dalam antrean verifikasi berkas oleh petugas pelayanan desa.')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PublicShell>
  );
}
