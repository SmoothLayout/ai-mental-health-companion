-- MindCare AI: Initial schema for mood and journal persistence
-- Tables: mood_entries, journal_entries
-- Auth model: no_auth_controlled_write (anon public CRUD)

-- ============================================================
-- 1. mood_entries table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  mood text NOT NULL CHECK (mood IN ('great', 'good', 'neutral', 'bad', 'awful')),
  note text
);

-- Index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at
  ON public.mood_entries (created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mood_entries (anon public access)
CREATE POLICY "anon_select_mood_entries"
  ON public.mood_entries
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "anon_insert_mood_entries"
  ON public.mood_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_delete_mood_entries"
  ON public.mood_entries
  FOR DELETE
  TO anon
  USING (true);

-- ============================================================
-- 2. journal_entries table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  mood text
);

-- Index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at
  ON public.journal_entries (created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for journal_entries (anon public access)
CREATE POLICY "anon_select_journal_entries"
  ON public.journal_entries
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "anon_insert_journal_entries"
  ON public.journal_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_delete_journal_entries"
  ON public.journal_entries
  FOR DELETE
  TO anon
  USING (true);
