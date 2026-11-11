'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Profil Singkat */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Desa Sukamaju</h3>
                <p className="text-xs text-emerald-400">Portal Resmi Pemerintahan Desa</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mewujudkan tata kelola desa yang transparan, akuntabel, dan mengutamakan kemudahan pelayanan administrasi bagi seluruh warga.
            </p>
          </div>

          {/* Kolom 2: Kontak Kantor */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Kontak & Lokasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Pahlawan Desa No. 45, Desa Sukamaju, Kec. Makmur Jaya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(022) 8765-4321 / 0812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>layanan@desasukamaju.id</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Senin - Jumat: 08:00 - 15:30 WIB</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Cepat */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Akses Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/layanan" className="hover:text-emerald-400 transition">
                  Permohonan Surat Online
                </Link>
              </li>
              <li>
                <Link href="/layanan#cek-status" className="hover:text-emerald-400 transition">
                  Cek Status Pengajuan Surat
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-emerald-400 transition">
                  Kabar & Pengumuman Desa
                </Link>
              </li>
              <li>
                <Link href="/aparatur" className="hover:text-emerald-400 transition">
                  Struktur Pemerintahan Desa
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sistem & Admin */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Pengelolaan Desa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem backend ditenagai database PostgreSQL Supabase dengan Row Level Security untuk keamanan data kependudukan.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-semibold border border-slate-700 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              Masuk Portal Admin Desa
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Pemerintah Desa Sukamaju. Hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan cinta untuk kemandirian warga desa <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
