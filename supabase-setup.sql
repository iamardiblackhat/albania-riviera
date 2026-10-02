-- Run this in your Supabase SQL editor
-- https://supabase.com/dashboard -> your project -> SQL Editor

-- Comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  page_slug text not null,
  author_name text not null,
  body text not null,
  created_at timestamptz default now()
);

-- Allow anyone to read comments
create policy "Public read comments"
  on comments for select
  using (true);

-- Disable direct insert (inserts go through /api/comments which checks password)
-- RLS on by default blocks inserts without a policy

alter table comments enable row level security;

-- Enable realtime for comments table
alter publication supabase_realtime add table comments;

-- Storage bucket setup:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Create a new bucket called: wedding-photos
-- 3. Set it to PUBLIC
-- 4. Under Policies, add a policy allowing public SELECT (read)
-- 5. Uploads go through /api/upload-token which uses the service role key
