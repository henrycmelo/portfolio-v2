import { supabase } from '@/lib/supabase';

export interface CareerEntry {
  id: number;
  role: string;
  company: string;
  icon: string;
  date: string;
  entry_type: 'work' | 'education';
}

export const careerAPI = {
    async getAllCareerEntries(): Promise<CareerEntry[]> {
        try {
            const { data, error } = await supabase
                .from('career')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching career entries:', error);
            throw error;
        }
    },

    async getCareerEntryById(id: number): Promise<CareerEntry | null> {
        try {
            const { data, error } = await supabase
                .from('career')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching career entry:', error);
            throw error;
        }
    }
};