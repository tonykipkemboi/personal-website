create table if not exists public.lesson_feedback (
  id uuid primary key default gen_random_uuid(),
  course_slug text not null,
  lesson_slug text not null,
  vote text not null check (vote in ('up', 'down')),
  comment text,
  page_path text,
  anonymous_id uuid not null,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_slug, lesson_slug, anonymous_id)
);

create index if not exists lesson_feedback_lookup_idx
  on public.lesson_feedback (course_slug, lesson_slug, vote);

alter table public.lesson_feedback enable row level security;

-- The Next.js API route uses a server-only Supabase secret key
-- (SUPABASE_SECRET_KEY, or legacy SUPABASE_SERVICE_ROLE_KEY), which bypasses
-- RLS. Do not add public select policies unless you are comfortable exposing
-- raw per-lesson vote rows. The site only displays aggregate up counts.
