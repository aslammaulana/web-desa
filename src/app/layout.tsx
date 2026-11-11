import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Website Resmi Desa Sukamaju | Pelayanan Digital & Keterbukaan Informasi',
  description:
    'Portal resmi Pemerintah Desa Sukamaju: layanan administrasi surat online, publikasi berita desa, transparansi pembangunan, dan profil potensi desa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans antialiased text-slate-900 bg-slate-50">
        {children}
      </body>
    </html>
  );
}
