-- Run this in your Supabase SQL Editor

create table public.sites (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  company_name text,
  profile_json jsonb,
  content_json jsonb
);

-- Enable Row Level Security (RLS)
alter table public.sites enable row level security;

-- Create a policy that allows anyone to insert (since we have public generation)
create policy "Enable insert for all users" on public.sites for insert with check (true);

-- Create a policy that allows reading (optional, if you want a public gallery later)
create policy "Enable read access for all users" on public.sites for select using (true);
