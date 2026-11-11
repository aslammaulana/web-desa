'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Landmark,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Jika sedang di halaman login, jangan render sidebar admin
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', label: 'Ringkasan & Overview', icon: LayoutDashboard },
    { href: '/admin/surat', label: 'Kelola Surat Warga', icon: FileText },
    { href: '/admin/berita', label: 'Kelola Berita & Info', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 hidden md:flex border-r border-slate-800">
        <div>
          {/* Admin Header */}
          <div className="h-20 px-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950/40">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">Admin Portal</h2>
              <p className="text-[11px] text-emerald-400">Pemerintah Desa Sukamaju</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="p-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Menu Utama
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-500" />
              Buka Web Publik
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition"
          >
            <LogOut className="w-4 h-4" />
            Keluar (Logout)
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm md:text-base">
              Panel Pengelolaan Desa Sukamaju
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
              Supabase Connected
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Petugas Pelayanan Aktif</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
