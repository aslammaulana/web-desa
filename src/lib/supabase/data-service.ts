import { supabase, isSupabaseConfigured } from './client';
import {
  mockProfilDesa,
  mockBerita,
  mockAparatur,
  mockPotensi,
  mockPermohonanSurat,
} from './mock-data';
import { ProfilDesa, Berita, Aparatur, PotensiDesa, PermohonanSurat } from '@/types/database';

export async function getProfilDesa(): Promise<ProfilDesa> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profil_desa')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) return data as ProfilDesa;
    } catch (e) {
      console.warn('Failed to fetch from Supabase, using mock data:', e);
    }
  }
  return mockProfilDesa;
}

export async function getBeritaList(): Promise<Berita[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Berita[];
    } catch (e) {
      console.warn('Failed to fetch berita from Supabase, using mock data:', e);
    }
  }
  return mockBerita;
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as Berita;
    } catch (e) {
      console.warn('Failed to fetch single berita from Supabase:', e);
    }
  }
  return mockBerita.find((b) => b.slug === slug) || null;
}

export async function getAparaturList(): Promise<Aparatur[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('aparatur')
        .select('*')
        .eq('status_aktif', true)
        .order('urutan', { ascending: true });
      if (!error && data && data.length > 0) return data as Aparatur[];
    } catch (e) {
      console.warn('Failed to fetch aparatur from Supabase:', e);
    }
  }
  return mockAparatur;
}

export async function getPotensiList(): Promise<PotensiDesa[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('potensi_desa')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as PotensiDesa[];
    } catch (e) {
      console.warn('Failed to fetch potensi from Supabase:', e);
    }
  }
  return mockPotensi;
}

export async function getPermohonanList(): Promise<PermohonanSurat[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('permohonan_surat')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as PermohonanSurat[];
    } catch (e) {
      console.warn('Failed to fetch permohonan from Supabase:', e);
    }
  }
  return mockPermohonanSurat;
}

export async function submitPermohonanSurat(
  formData: Omit<PermohonanSurat, 'id' | 'created_at' | 'updated_at' | 'status' | 'catatan_petugas'>
): Promise<{ success: boolean; data?: PermohonanSurat; message: string }> {
  const newRecord: PermohonanSurat = {
    ...formData,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `surat-${Date.now()}`,
    status: 'Menunggu',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('permohonan_surat')
        .insert([newRecord])
        .select()
        .single();
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, data: data as PermohonanSurat, message: 'Permohonan berhasil diajukan!' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Terjadi kesalahan sistem' };
    }
  }

  // Fallback in-memory
  return {
    success: true,
    data: newRecord,
    message: 'Permohonan berhasil disimpan (Mode Simulasi / Mock Data)',
  };
}

export async function checkStatusSurat(kodeTiket: string, nik: string): Promise<PermohonanSurat | null> {
  const cleanTiket = kodeTiket.trim().toUpperCase();
  const cleanNik = nik.trim();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('permohonan_surat')
        .select('*')
        .eq('kode_tiket', cleanTiket)
        .eq('nik', cleanNik)
        .single();
      if (!error && data) return data as PermohonanSurat;
    } catch (e) {
      console.warn('Check status failed on Supabase:', e);
    }
  }

  return (
    mockPermohonanSurat.find(
      (s) => s.kode_tiket.toUpperCase() === cleanTiket && s.nik === cleanNik
    ) || null
  );
}
