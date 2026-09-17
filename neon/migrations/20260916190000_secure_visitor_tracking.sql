begin;

create table if not exists public.visitor_logs (
  id bigint generated always as identity primary key,
  city varchar(120) not null,
  country varchar(120) not null,
  country_code varchar(2) not null default '',
  visitor_hash char(64) not null,
  dedupe_bucket timestamptz not null,
  created_at timestamptz not null default now(),
  constraint visitor_logs_city_not_blank check (btrim(city) <> ''),
  constraint visitor_logs_country_not_blank check (btrim(country) <> ''),
  constraint visitor_logs_country_code_format check (
    country_code = '' or country_code ~ '^[A-Z]{2}$'
  ),
  constraint visitor_logs_hash_format check (visitor_hash ~ '^[a-f0-9]{64}$'),
  constraint visitor_logs_dedupe_unique unique (visitor_hash, dedupe_bucket)
);

create index if not exists visitor_logs_created_at_desc_idx
  on public.visitor_logs (created_at desc);

revoke all on table public.visitor_logs from public;
revoke all on sequence public.visitor_logs_id_seq from public;

create or replace function public.prune_visitor_logs()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $$
begin
  delete from public.visitor_logs
  where created_at < now() - interval '30 days';

  delete from public.visitor_logs
  where id in (
    select id
    from public.visitor_logs
    order by created_at desc, id desc
    offset 5000
  );

  return null;
end;
$$;

revoke all on function public.prune_visitor_logs() from public;

drop trigger if exists visitor_logs_retention_after_insert on public.visitor_logs;
create trigger visitor_logs_retention_after_insert
after insert on public.visitor_logs
for each statement execute function public.prune_visitor_logs();

comment on table public.visitor_logs is
  'Approximate visitor locations. Raw IP addresses are never stored; HMAC fingerprints deduplicate 30-minute sessions.';

commit;
