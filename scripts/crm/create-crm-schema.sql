create table if not exists public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text not null default '',
  last_name text not null default '',
  company text not null default '',
  website text not null default '',
  linkedin_url text not null default '',
  country text not null default '',
  source text not null default 'manual',
  locale text not null default 'fr',
  message text not null default '',
  segment text not null default '',
  status text not null default 'new'
    check (status in (
      'new',
      'qualified',
      'contacted',
      'replied',
      'meeting_booked',
      'won',
      'lost',
      'do_not_contact'
    )),
  lead_score integer not null default 0
    check (lead_score between 0 and 100),
  pain_detected text not null default '',
  offer_angle text not null default '',
  last_contacted_at timestamptz,
  next_followup_at timestamptz,
  reply_status text not null default 'not_contacted'
    check (reply_status in (
      'not_contacted',
      'waiting',
      'positive',
      'negative',
      'no_reply'
    )),
  utm_campaign text not null default '',
  do_not_contact boolean not null default false,
  notes text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.crm_leads(id) on delete cascade,
  email text not null,
  activity_type text not null,
  channel text not null,
  direction text not null,
  subject text not null default '',
  content text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists crm_leads_status_idx
  on public.crm_leads(status);

create index if not exists crm_leads_next_followup_idx
  on public.crm_leads(next_followup_at)
  where next_followup_at is not null;

create index if not exists crm_activities_lead_id_idx
  on public.crm_activities(lead_id, occurred_at desc);

create or replace function public.set_crm_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_crm_leads_updated_at on public.crm_leads;
create trigger set_crm_leads_updated_at
before update on public.crm_leads
for each row
execute function public.set_crm_updated_at();

alter table public.crm_leads enable row level security;
alter table public.crm_activities enable row level security;
