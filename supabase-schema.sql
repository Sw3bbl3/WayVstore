-- Tapmood Supabase schema for the static Apple-like dashboard.
-- Run this in the Supabase SQL editor, then enable Email auth in Authentication > Providers.

create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'Growth',
  seats integer not null default 25 check (seats > 0),
  used integer not null default 0 check (used >= 0),
  mood integer not null default 82 check (mood between 0 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null,
  email text not null unique,
  team text not null default 'General',
  mood integer not null default 83 check (mood between 0 and 100),
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;
alter table public.people enable row level security;

create policy "authenticated users can read companies" on public.companies for select to authenticated using (true);
create policy "authenticated users can insert companies" on public.companies for insert to authenticated with check (true);
create policy "authenticated users can update companies" on public.companies for update to authenticated using (true) with check (true);

create policy "authenticated users can read people" on public.people for select to authenticated using (true);
create policy "authenticated users can insert people" on public.people for insert to authenticated with check (true);
create policy "authenticated users can update people" on public.people for update to authenticated using (true) with check (true);

insert into public.companies (id, name, plan, seats, used, mood)
values
  ('00000000-0000-0000-0000-000000000101', 'Northstar Labs', 'Enterprise', 140, 96, 84),
  ('00000000-0000-0000-0000-000000000102', 'Horizon Health', 'Scale', 220, 204, 79),
  ('00000000-0000-0000-0000-000000000103', 'Luma Studio', 'Growth', 55, 41, 91)
on conflict (id) do update set name = excluded.name, plan = excluded.plan, seats = excluded.seats, used = excluded.used, mood = excluded.mood;

insert into public.people (company_id, name, email, team, mood)
values
  ('00000000-0000-0000-0000-000000000101', 'Maya Chen', 'maya@northstar.test', 'Product', 92),
  ('00000000-0000-0000-0000-000000000101', 'Owen Reed', 'owen@northstar.test', 'Engineering', 81),
  ('00000000-0000-0000-0000-000000000101', 'Ari Morgan', 'ari@northstar.test', 'Sales', 76),
  ('00000000-0000-0000-0000-000000000101', 'Leah Smith', 'leah@northstar.test', 'People', 89)
on conflict (email) do update set team = excluded.team, mood = excluded.mood;
