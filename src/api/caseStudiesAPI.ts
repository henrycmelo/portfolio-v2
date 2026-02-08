import { supabase } from '@/lib/supabase';

// Case Study Teaser interface for the portfolio
export interface CaseStudyTeaser {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  thumbnail_url: string;
  coming_soon: boolean;
  featured: boolean;
  display_order: number;
}

// Placeholder data for development (used when Supabase table doesn't exist yet)
const PLACEHOLDER_CASE_STUDIES: CaseStudyTeaser[] = [
  {
    id: 1,
    slug: 'cross-border-payments',
    title: 'Reimagining Cross-Border Payments',
    subtitle: 'Reducing transfer friction by 60% through user-centered design',
    tags: ['Fintech', 'UX Research', 'Mobile'],
    thumbnail_url: '/placeholders/case-1.jpg',
    coming_soon: true,
    featured: true,
    display_order: 1,
  },
  {
    id: 2,
    slug: 'financial-dashboard',
    title: 'Enterprise Financial Dashboard',
    subtitle: 'Simplifying complex data for better decision making',
    tags: ['B2B', 'Data Visualization', 'Web App'],
    thumbnail_url: '/placeholders/case-2.jpg',
    coming_soon: true,
    featured: true,
    display_order: 2,
  },
  {
    id: 3,
    slug: 'mobile-banking-onboarding',
    title: 'Mobile Banking Onboarding',
    subtitle: 'Increasing completion rates from 45% to 89%',
    tags: ['Mobile', 'Conversion', 'User Testing'],
    thumbnail_url: '/placeholders/case-3.jpg',
    coming_soon: true,
    featured: false,
    display_order: 3,
  },
  {
    id: 4,
    slug: 'payment-security-ux',
    title: 'Balancing Security & Usability',
    subtitle: 'Making 2FA feel invisible without compromising safety',
    tags: ['Security', 'UX Design', 'Fintech'],
    thumbnail_url: '/placeholders/case-4.jpg',
    coming_soon: true,
    featured: false,
    display_order: 4,
  },
];

export const caseStudiesAPI = {
  // Get all case study teasers
  async getAllTeasers(): Promise<CaseStudyTeaser[]> {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        // If table doesn't exist, return placeholder data
        console.warn('Case studies table not found, using placeholders:', error.message);
        return PLACEHOLDER_CASE_STUDIES;
      }
      return data || PLACEHOLDER_CASE_STUDIES;
    } catch (error) {
      console.error('Error fetching case studies:', error);
      return PLACEHOLDER_CASE_STUDIES;
    }
  },

  // Get featured case study teasers
  async getFeaturedTeasers(): Promise<CaseStudyTeaser[]> {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Case studies table not found, using placeholders:', error.message);
        return PLACEHOLDER_CASE_STUDIES.filter(cs => cs.featured);
      }
      return data || PLACEHOLDER_CASE_STUDIES.filter(cs => cs.featured);
    } catch (error) {
      console.error('Error fetching featured case studies:', error);
      return PLACEHOLDER_CASE_STUDIES.filter(cs => cs.featured);
    }
  },

  // Get a single case study by slug
  async getTeaser(slug: string): Promise<CaseStudyTeaser | null> {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.warn('Case study not found:', error.message);
        return PLACEHOLDER_CASE_STUDIES.find(cs => cs.slug === slug) || null;
      }
      return data;
    } catch (error) {
      console.error('Error fetching case study:', error);
      return PLACEHOLDER_CASE_STUDIES.find(cs => cs.slug === slug) || null;
    }
  },

  // Create a new case study teaser
  async createTeaser(teaserData: Omit<CaseStudyTeaser, 'id'>): Promise<CaseStudyTeaser> {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .insert([teaserData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating case study:', error);
      throw error;
    }
  },

  // Update an existing case study teaser
  async updateTeaser(id: number, teaserData: Omit<CaseStudyTeaser, 'id'>): Promise<CaseStudyTeaser> {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .update(teaserData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating case study:', error);
      throw error;
    }
  },

  // Delete a case study teaser
  async deleteTeaser(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting case study:', error);
      throw error;
    }
  },

  // Get placeholder data (for development/preview)
  getPlaceholders(): CaseStudyTeaser[] {
    return PLACEHOLDER_CASE_STUDIES;
  },
};
