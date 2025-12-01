import { supabase } from '@/lib/supabase';

export interface ContactMessage {
    id?: number;
    name: string;
    email: string;
    message: string;
    status: 'unread' | 'read' | 'archived';
    created_at?: string;
}

export const contactAPI = {
    /**
     * Submit a new contact message
     * Saves to database AND sends email notification
     */
    async submitMessage(messageData: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<void> {
        try {
            // 1. Save to database
            const { error } = await supabase
                .from('contact_messages')
                .insert({
                    ...messageData,
                    status: 'unread',
                    created_at: new Date().toISOString(),
                });

            if (error) throw error;

            // 2. Send email notification (fire and forget - don't block on email failure)
            try {
                await fetch('/api/contact/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messageData),
                });
            } catch (emailError) {
                // Log email error but don't fail the whole operation
                console.error('Email notification failed:', emailError);
                // Message is still saved in database, which is the important part
            }
        } catch (error) {
            console.error('Error submitting contact message:', error);
            throw error;
        }
    },

    /**
     * Get all contact messages (admin only)
     */
    async getAllMessages(): Promise<ContactMessage[]> {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching contact messages:', error);
            throw error;
        }
    },

    /**
     * Update message status
     */
    async updateMessageStatus(id: number, status: ContactMessage['status']): Promise<void> {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating message status:', error);
            throw error;
        }
    },

    /**
     * Delete a message
     */
    async deleteMessage(id: number): Promise<void> {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting message:', error);
            throw error;
        }
    },
};
