'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Landmark, FileText, Newspaper, Users, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Landmark },
    { href: '/berita', label: 'Berita & Pengumuman', icon: Newspaper },
    { href: '/layanan', label: 'Layanan Surat', icon: FileText },
    { href: '/aparatur', label: 'Perangkat Desa', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:bg-emerald-700 transition">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition">
                Desa Sukamaju
              </span>
              <span className="text-xs font-medium text-emerald-600 tracking-wide">
                Portal Pelayanan Digital Desa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/layanan"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
            >
              Ajukan Surat
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/layanan"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 text-sm"
            >
              Ajukan Permohonan Surat
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-2 rounded-lg font-medium text-slate-600 border border-slate-200 text-sm hover:bg-slate-50"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              Dashboard Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
