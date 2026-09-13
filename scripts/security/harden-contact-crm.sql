begin;

alter table public.crm_leads enable row level security;
alter table public.crm_activities enable row level security;

-- The portfolio writes through its server-only service role. Browser roles must
-- never be able to read or mutate CRM contact data through the Data API.
revoke all privileges on table public.crm_leads
  from public, anon, authenticated;
revoke all privileges on table public.crm_activities
  from public, anon, authenticated;

-- Keep the two application-level rate-limit lookups bounded as the CRM grows.
create index if not exists crm_activities_email_occurred_at_idx
  on public.crm_activities (email, occurred_at desc);
create index if not exists crm_activities_metadata_rate_limit_idx
  on public.crm_activities using gin (metadata jsonb_path_ops);

commit;
