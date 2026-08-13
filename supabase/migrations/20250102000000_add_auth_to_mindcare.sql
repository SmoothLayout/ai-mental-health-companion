-- MindCare AI: Add auth integration to mood and journal tables
-- Adds user_id columns, foreign keys, and authenticated RLS policies

-- ============================================================
-- 1. Add user_id to mood_entries
-- ============================================================
ALTER TABLE public.mood_entries
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id
  ON public.mood_entries (user_id);

-- ============================================================
-- 2. Add user_id to journal_entries
-- ============================================================
ALTER TABLE public.journal_entries
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id
  ON public.journal_entries (user_id);

-- ============================================================
-- 3. Drop old anon policies (from init migration)
-- ============================================================
DROP POLICY IF EXISTS "anon_select_mood_entries" ON public.mood_entries;
DROP POLICY IF EXISTS "anon_insert_mood_entries" ON public.mood_entries;
DROP POLICY IF EXISTS "anon_delete_mood_entries" ON public.mood_entries;
DROP POLICY IF EXISTS "anon_select_journal_entries" ON public.journal_entries;
DROP POLICY IF EXISTS "anon_insert_journal_entries" ON public.journal_entries;
DROP POLICY IF EXISTS "anon_delete_journal_entries" ON public.journal_entries;

-- ============================================================
-- 4. Create authenticated user policies for mood_entries
-- ============================================================
CREATE POLICY "authenticated_select_own_mood_entries"
  ON public.mood_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "authenticated_insert_own_mood_entries"
  ON public.mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "authenticated_delete_own_mood_entries"
  ON public.mood_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- 5. Create authenticated user policies for journal_entries
-- ============================================================
CREATE POLICY "authenticated_select_own_journal_entries"
  ON public.journal_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "authenticated_insert_own_journal_entries"
  ON public.journal_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "authenticated_delete_own_journal_entries"
  ON public.journal_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
