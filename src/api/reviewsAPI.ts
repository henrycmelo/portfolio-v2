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
  // Get all reviews
  async getAllReviews(): Promise<DatabaseReview[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Create a new review
  async createReview(reviewData: Review): Promise<DatabaseReview> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Update an existing review
  async updateReview(id: number, reviewData: Review): Promise<DatabaseReview> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .update(reviewData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  // Delete a review
  async deleteReview(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },

  // Get a single review by ID
  async getReview(id: number): Promise<DatabaseReview | null> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching review:', error);
      throw error;
    }
  },
};








