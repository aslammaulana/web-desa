'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { ShieldCheck, Lock, Mail, ArrowLeft, ArrowRight, Info } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
          return;
        }

        router.push('/admin');
        return;
      } catch (err: any) {
        setErrorMessage(err.message || 'Gagal login ke Supabase.');
        setLoading(false);
        return;
      }
    }

    // Jika Supabase belum dihubungkan / mode demo:
    // Izinkan masuk langsung untuk kemudahan evaluasi
    setTimeout(() => {
      router.push('/admin');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Login Portal Admin</h1>
          <p className="text-xs text-slate-400">Pemerintah Desa Sukamaju</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300">
            {errorMessage}
          </div>
        )}

        {!isSupabaseConfigured && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Mode Eksplorasi / Demo:</strong> Supabase URL belum diisi. Anda dapat langsung klik tombol Masuk untuk melihat dashboard admin.
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Petugas Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required={isSupabaseConfigured}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@desasukamaju.id"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required={isSupabaseConfigured}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Ke Dashboard Admin'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-700 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Portal Warga
          </Link>
        </div>
      </div>
    </div>
  );
}
