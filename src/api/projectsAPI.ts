import { supabase } from '@/lib/supabase';
// Updated Project interface for the card component
export interface Project {
  id: number;
  company_name: string;
  company_logo_url: string;
  title: string;
  highlight: string;
  mockup_url: string;
  problem: string;
  solution: string;
  benefit: string;
  role: string;

}
 



export const projectsAPI = {
  // Get all projects
  async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projectsv2')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },



  



};