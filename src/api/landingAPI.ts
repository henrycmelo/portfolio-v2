import {supabase} from '@/lib/supabase';
import { get } from 'http';

export interface LandingPageData {
    id?: number;
    hero_title: string;
    hero_subtitle: string;
    hero_paragraph: string;
    hero_caption: string;
}

export const landingAPI = {
    // Get landing page data
    async getLandingPageData(): Promise<LandingPageData[]> {
        try{
            const { data, error } = await supabase
                .from('landing_page_v2')
                .select('*');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching landing page data:', error);
            throw error;
        }
    },

    async updateLandingPageData(updatedData: Partial<LandingPageData>): Promise<void> {
        try {
            const { data, error } = await supabase
                .from('landing_page_v2')
                .update(updatedData)
                .eq('id', 1); // Assuming there's only one row with id=1
                
            if (error) throw error;
            
        } catch (error) {
            console.error('Error updating landing page data:', error);
            throw error;
        }
}
}