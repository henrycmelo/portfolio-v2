import { supabase } from '@/lib/supabase';

export type Review = {
  reviewer_name: string;
  content: string;
  reviewer_role: string;
  company: string;
  linkedin_url: string;
};

export type DatabaseReview = Review & {
  id: number;
  created_at: string;
  updated_at?: string;
};

export const reviewsAPI = {
 async getAllReviews(): Promise<DatabaseReview[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

        if (error)  throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
 },
}








