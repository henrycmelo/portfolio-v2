import { supabase } from '@/lib/supabase';

export interface CareerEntry {
  id: number;
  role: string;
  company: string;
  date: string;
  entry_type: 'work' | 'education';
}

export const careerAPI = {
    // Get all career entries
    async getAllCareerEntries(): Promise<CareerEntry[]> {
        try {
            const { data, error } = await supabase
                .from('career_timeline_v2')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching career entries:', error);
            throw error;
        }
    },

    // Get a single career entry by ID
    async getCareerEntryById(id: number): Promise<CareerEntry | null> {
        try {
            const { data, error } = await supabase
                .from('career_timeline_v2')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching career entry:', error);
            throw error;
        }
    },

    // Create a new career entry
    async createCareerEntry(entryData: Omit<CareerEntry, 'id'>): Promise<CareerEntry> {
        try {
            const { data, error } = await supabase
                .from('career_timeline_v2')
                .insert([entryData])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating career entry:', error);
            throw error;
        }
    },

    // Update an existing career entry
    async updateCareerEntry(id: number, entryData: Omit<CareerEntry, 'id'>): Promise<CareerEntry> {
        try {
            const { data, error } = await supabase
                .from('career_timeline_v2')
                .update(entryData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating career entry:', error);
            throw error;
        }
    },

    // Delete a career entry
    async deleteCareerEntry(id: number): Promise<void> {
        try {
            const { error } = await supabase
                .from('career_timeline_v2')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting career entry:', error);
            throw error;
        }
    }
};