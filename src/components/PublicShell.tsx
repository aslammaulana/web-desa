import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
