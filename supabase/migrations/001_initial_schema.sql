-- ============================================================
-- supabase/migrations/001_initial_schema.sql
-- Run this in Supabase SQL Editor:
--   supabase.com → Project → SQL Editor → New Query → Paste → Run
-- ============================================================

-- ============================================================
-- TABLE: public.profiles
-- Extends Supabase's built-in auth.users.
-- Auto-linked by user UUID. Deleted when user is deleted.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL,
  register_no   TEXT        UNIQUE NOT NULL,
  college       TEXT        NOT NULL CHECK (college IN ('PTU', 'WEC', 'PKIET')),
  batch         TEXT        NOT NULL CHECK (batch IN ('2022', '2023', '2024', '2025')),
  dept          TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: public.saved_results
-- One row per user per (college + dept + batch + semester).
-- UNIQUE constraint prevents duplicate semester entries.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.saved_results (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  college         TEXT         NOT NULL,
  batch           TEXT         NOT NULL,
  regulation      TEXT         NOT NULL,
  dept            TEXT         NOT NULL,
  entry_type      TEXT         NOT NULL DEFAULT 'regular',
  semester        INTEGER      NOT NULL CHECK (semester BETWEEN 1 AND 8),
  sgpa            NUMERIC(4,2) NOT NULL,
  grade_data      JSONB        NOT NULL,
  calculated_at   TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE(user_id, college, dept, batch, semester)
);

-- ============================================================
-- FUNCTION: public.ping()
-- Used by GitHub Actions keep-alive cron to prevent Supabase
-- free tier from pausing the project after 7 days of inactivity.
-- Call via: POST /rest/v1/rpc/ping
-- ============================================================
CREATE OR REPLACE FUNCTION public.ping()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$ SELECT true; $$;

-- ============================================================
-- FUNCTION + TRIGGER: auto-update updated_at on profile edits
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- FUNCTION: handle_new_user()
-- Triggered after Supabase confirms a user's email (OTP verify).
-- Inserts metadata from auth.users.raw_user_meta_data into profiles.
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, register_no, college, batch)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'register_no',
    NEW.raw_user_meta_data->>'college',
    NEW.raw_user_meta_data->>'batch'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- Users can ONLY read and write their OWN data.
-- No user can see another user's profile or results.
-- ============================================================
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_results ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own row only
DROP POLICY IF EXISTS "Own profile only" ON public.profiles;
CREATE POLICY "Own profile only"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Saved results: users can CRUD their own rows only
DROP POLICY IF EXISTS "Own results only" ON public.saved_results;
CREATE POLICY "Own results only"
  ON public.saved_results
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- DONE. Verify with:
--   SELECT * FROM public.profiles LIMIT 5;
--   SELECT public.ping();
-- ============================================================
