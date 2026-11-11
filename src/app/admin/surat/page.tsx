'use client';

import React, { useState, useEffect } from 'react';
import { getPermohonanList } from '@/lib/supabase/data-service';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { PermohonanSurat } from '@/types/database';
import {
  FileText,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  MapPin,
  Calendar,
  Save,
} from 'lucide-react';

export default function AdminSuratPage() {
  const [list, setList] = useState<PermohonanSurat[]>([]);
  const [filter, setFilter] = useState<string>('Semua');
  const [selectedItem, setSelectedItem] = useState<PermohonanSurat | null>(null);
  const [statusDraft, setStatusDraft] = useState<'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak'>('Menunggu');
  const [notesDraft, setNotesDraft] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getPermohonanList();
    setList(data);
  };

  const handleSelect = (item: PermohonanSurat) => {
    setSelectedItem(item);
    setStatusDraft(item.status);
    setNotesDraft(item.catatan_petugas || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedItem) return;
    setSaving(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('permohonan_surat')
          .update({
            status: statusDraft,
            catatan_petugas: notesDraft,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedItem.id);

        if (error) {
          alert('Gagal update di Supabase: ' + error.message);
        }
      } catch (e: any) {
        alert('Error: ' + e.message);
      }
    }

    // Update state lokal
    setList((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, status: statusDraft, catatan_petugas: notesDraft }
          : item
      )
    );
    setSelectedItem((prev) =>
      prev ? { ...prev, status: statusDraft, catatan_petugas: notesDraft } : null
    );
    setSaving(false);
    alert('Status permohonan berhasil diperbarui!');
  };

  const filteredList =
    filter === 'Semua' ? list : list.filter((item) => item.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Kelola Permohonan Surat Warga
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Verifikasi berkas, ubah tahapan proses, dan berikan catatan petunjuk bagi warga.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['Semua', 'Menunggu', 'Diproses', 'Selesai', 'Ditolak'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === tab
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
            {tab !== 'Semua' && (
              <span className="ml-1.5 opacity-70">
                ({list.filter((x) => x.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Daftar Surat */}
        <div className="lg:col-span-2 space-y-3">
          {filteredList.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Tidak ada permohonan dengan status &ldquo;{filter}&rdquo;.
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-5 rounded-2xl border transition cursor-pointer bg-white ${
                  selectedItem?.id === item.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-700">
                      {item.kode_tiket}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.nama_pemohon}</h3>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Diproses'
                        ? 'bg-amber-100 text-amber-800'
                        : item.status === 'Ditolak'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-700 mb-2">{item.jenis_surat}</p>
                <p className="text-xs text-slate-500 line-clamp-1 mb-3">{item.keperluan}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                  <span>NIK: {item.nik}</span>
                  <span>{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Kolom Detail & Tindakan */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 sticky top-24 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold text-emerald-600 block">
                  {selectedItem.kode_tiket}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{selectedItem.nama_pemohon}</h2>
                <p className="text-xs text-slate-500 mt-1">{selectedItem.jenis_surat}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">NIK</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {selectedItem.nik}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Nomor Kontak / WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedItem.nomor_hp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {selectedItem.nomor_hp}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Alamat</span>
                  <span className="text-slate-700">{selectedItem.alamat}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Keperluan</span>
                  <p className="p-2.5 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                    {selectedItem.keperluan}
                  </p>
                </div>
              </div>

              {/* Form Update Status */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ubah Status Permohonan
                </label>
                <select
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Catatan Untuk Pemohon:
                  </label>
                  <textarea
                    rows={3}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Contoh: Berkas sudah ditandatangani Kades, silakan ambil di loket."
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <button
                  onClick={handleUpdateStatus}
                  disabled={saving}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400 text-xs">
              Pilih salah satu surat di samping untuk melihat detail dan mengubah status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
