import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';
import { toast } from 'sonner';

export interface MoodEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'awful';
  note?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood?: string;
}

export function useWellness() {
  const { user } = useAuth();
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch moods from Supabase
  const fetchMoods = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMoods(
        (data || []).map((entry) => ({
          id: entry.id,
          date: entry.created_at,
          mood: entry.mood,
          note: entry.note || undefined,
        }))
      );
    } catch (error: any) {
      toast.error('Failed to load mood entries');
    }
  }, [user]);

  // Fetch journals from Supabase
  const fetchJournals = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setJournals(
        (data || []).map((entry) => ({
          id: entry.id,
          date: entry.created_at,
          title: entry.title,
          content: entry.content,
          mood: entry.mood || undefined,
        }))
      );
    } catch (error: any) {
      toast.error('Failed to load journal entries');
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchMoods(), fetchJournals()]).finally(() => setLoading(false));
    } else {
      setMoods([]);
      setJournals([]);
      setLoading(false);
    }
  }, [user, fetchMoods, fetchJournals]);

  const addMood = async (mood: MoodEntry['mood'], note?: string) => {
    if (!user) {
      toast.error('Please sign in to log your mood');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({
          mood,
          note: note || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry: MoodEntry = {
        id: data.id,
        date: data.created_at,
        mood: data.mood,
        note: data.note || undefined,
      };

      setMoods((prev) => [newEntry, ...prev]);
    } catch (error: any) {
      toast.error('Failed to save mood entry');
      throw error;
    }
  };

  const addJournal = async (title: string, content: string, mood?: string) => {
    if (!user) {
      toast.error('Please sign in to create journal entries');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          title,
          content,
          mood: mood || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry: JournalEntry = {
        id: data.id,
        date: data.created_at,
        title: data.title,
        content: data.content,
        mood: data.mood || undefined,
      };

      setJournals((prev) => [newEntry, ...prev]);
    } catch (error: any) {
      toast.error('Failed to save journal entry');
      throw error;
    }
  };

  const deleteJournal = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setJournals((prev) => prev.filter((j) => j.id !== id));
    } catch (error: any) {
      toast.error('Failed to delete journal entry');
      throw error;
    }
  };

  return {
    moods,
    addMood,
    journals,
    addJournal,
    deleteJournal,
    loading,
  };
}
