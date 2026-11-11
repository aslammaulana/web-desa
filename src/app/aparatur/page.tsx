import React from 'react';
import PublicShell from '@/components/PublicShell';
import { getAparaturList, getProfilDesa } from '@/lib/supabase/data-service';
import { Users, Award, ShieldCheck, Mail, Phone } from 'lucide-react';

export default async function AparaturPage() {
  const aparaturList = await getAparaturList();
  const profil = await getProfilDesa();

  // Kepala Desa
  const kades = aparaturList.find((a) => a.jabatan.toLowerCase().includes('kepala desa'));
  // Pamong lainnya
  const staff = aparaturList.filter((a) => !a.jabatan.toLowerCase().includes('kepala desa'));

  return (
    <PublicShell>
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            Pemerintahan Desa
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Struktur Organisasi & Perangkat Desa
          </h1>
          <p className="mt-2 text-emerald-100/80 max-w-2xl text-base">
            Susunan aparatur pemerintah {profil.nama_desa} yang berdedikasi melayani kepentingan warga masyarakat secara transparan, profesional, dan berintegritas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Kepala Desa Spotlight */}
        {kades && (
          <div className="mb-16">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-emerald-100 shadow-md">
                <img
                  src={kades.foto_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                  alt={kades.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <Award className="w-3.5 h-3.5" />
                  Pimpinan Pemerintahan Desa
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {kades.nama}
                </h2>
                <p className="text-emerald-700 font-semibold text-lg">{kades.jabatan}</p>
                {kades.nip && <p className="text-xs text-slate-400">NIP: {kades.nip}</p>}
                <p className="text-sm text-slate-600 leading-relaxed pt-2">
                  &ldquo;Mengabdi untuk kemaslahatan warga {profil.nama_desa}, mengedepankan inovasi pelayanan publik demi desa yang mandiri dan sejahtera.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Jajaran Perangkat & Staf Desa */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-900">Perangkat & Staf Desa</h3>
          <p className="text-slate-500 text-sm mt-1">Sekretariat dan Kepala Urusan Desa Sukamaju</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((pamong) => (
            <div
              key={pamong.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs hover:shadow-md transition flex flex-col items-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner mb-4">
                <img
                  src={pamong.foto_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'}
                  alt={pamong.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-slate-900 text-base leading-snug mb-1">
                {pamong.nama}
              </h4>
              <p className="text-xs font-semibold text-emerald-600 mb-2">{pamong.jabatan}</p>
              {pamong.nip && <p className="text-[11px] text-slate-400">NIP: {pamong.nip}</p>}
            </div>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
