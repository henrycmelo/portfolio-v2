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

  // Create a new project
  async createProject(projectData: Omit<Project, 'id'>): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projectsv2')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update an existing project
  async updateProject(id: number, projectData: Omit<Project, 'id'>): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projectsv2')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('projectsv2')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get a single project by ID
  async getProject(id: number): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projectsv2')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },
};