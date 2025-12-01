import {supabase} from '@/lib/supabase';

export interface SidebarData {
    id?: number;
    avatar_url: string;
    name: string;
    subtitle: string;
}

export const sidebarAPI = {
    // Get sidebar data
    async getSidebarData(): Promise<SidebarData[]> {
        try{
            const { data, error } = await supabase
                .from('sidebar_v2')
                .select('*');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching sidebar data:', error);
            throw error;
        }
    },

    async updateSidebarData(updatedData: Partial<SidebarData>): Promise<void> {
        try {
            const { data, error } = await supabase
                .from('sidebar_v2')
                .update(updatedData)
                .eq('id', 1); // Assuming there's only one row with id=1

            if (error) throw error;

        } catch (error) {
            console.error('Error updating sidebar data:', error);
            throw error;
        }
    }
}
