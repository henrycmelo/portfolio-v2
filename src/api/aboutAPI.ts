import {supabase} from '@/lib/supabase';

export interface AboutData {
    id?: number;
    subtitle_1: string;
    paragraph_1: string;
    subtitle_2: string;
    paragraph_2: string;
    subtitle_3: string;
    paragraph_3: string;
    image_url: string;
}

export const aboutAPI = {
    // Get about me data
    async getAboutData(): Promise<AboutData[]> {
        try{
            const { data, error } = await supabase
                .from('about_v2')
                .select('*');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching about data:', error);
            throw error;
        }
    },

    async updateAboutData(updatedData: Partial<AboutData>): Promise<void> {
        try {
            const { data, error } = await supabase
                .from('about_v2')
                .update(updatedData)
                .eq('id', 1); // Assuming there's only one row with id=1

            if (error) throw error;

        } catch (error) {
            console.error('Error updating about data:', error);
            throw error;
        }
    }
}
