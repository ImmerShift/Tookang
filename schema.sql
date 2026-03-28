create extension if not exists "pgcrypto";

create type user_role_enum as enum ('user','tukang');
create type account_type_enum as enum ('solo','mandor');
create type availability_status_enum as enum ('available','busy','on_leave');
create type agency_member_status_enum as enum ('active','inactive');
create type hired_type_enum as enum ('solo','crew');
create type bid_from_type_enum as enum ('solo','crew');
create type bid_type_enum as enum ('inspection_only','direct_quote');
create type review_target_enum as enum ('solo','crew');
create type payee_type_enum as enum ('solo','crew');
create type transaction_status_enum as enum ('inspection_escrowed','full_escrow_funded','pending_confirmation','completed','disputed');
create type recommended_tier_enum as enum ('solo','crew','both');

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  phone text,
  name text,
  avatar_url text,
  location text,
  language_preference text check (language_preference in ('id','en')),
  role user_role_enum not null,
  account_type account_type_enum,
  created_at timestamptz not null default now()
);

create table if not exists public.tukang_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  bio text,
  categories text[] check (array_length(categories, 1) <= 3),
  service_area text,
  rates jsonb,
  solo_rating_avg numeric(3,2) not null default 0,
  solo_jobs_count integer not null default 0,
  solo_disputes_count integer not null default 0,
  verification_tier text,
  ktp_verified boolean not null default false,
  availability_status availability_status_enum not null default 'available',
  bank_account_json jsonb,
  wallet_balance_idr numeric(14,2) not null default 0,
  wallet_pending_idr numeric(14,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  mandor_id uuid not null references public.users(id) on delete cascade,
  agency_name text not null,
  bio text,
  logo_url text,
  trade_categories text[],
  service_area text,
  agency_rating_avg numeric(3,2) not null default 0,
  agency_jobs_count integer not null default 0,
  agency_disputes_count integer not null default 0,
  nib_siup_doc_url text,
  nib_verified boolean not null default false,
  ktp_verified boolean not null default false,
  crew_availability_status availability_status_enum not null default 'available',
  agency_wallet_balance_idr numeric(14,2) not null default 0,
  agency_wallet_pending_idr numeric(14,2) not null default 0,
  agency_bank_account_json jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.agency_members (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  tukang_id uuid not null references public.tukang_profiles(id) on delete cascade,
  trade_specialty text,
  joined_at timestamptz not null default now(),
  status agency_member_status_enum not null default 'active',
  internal_score_avg numeric(3,2) not null default 0,
  internal_score_count integer not null default 0,
  unique (agency_id, tukang_id)
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text,
  description text,
  category text,
  photos text[] not null default array[]::text[],
  budget_min numeric(14,2),
  budget_max numeric(14,2),
  urgency text,
  status text,
  location text,
  requires_inspection boolean not null default false,
  inspection_fee_idr numeric(14,2),
  hired_type hired_type_enum,
  hired_tukang_id uuid references public.tukang_profiles(id),
  hired_agency_id uuid references public.agencies(id),
  crew_member_ids uuid[],
  start_photo_url text,
  finish_photo_url text,
  ai_price_estimate_json jsonb,
  photo_analysis_json jsonb,
  voice_transcript text,
  certificate_url text,
  crew_welcome boolean not null default false,
  recommended_tier recommended_tier_enum,
  created_at timestamptz not null default now(),
  constraint jobs_budget_range_check check (
    budget_min is null
    or budget_max is null
    or budget_min <= budget_max
  ),
  constraint jobs_inspection_fee_check check (
    requires_inspection = false
    or inspection_fee_idr is not null
  ),
  constraint jobs_hired_entity_check check (
    (hired_type is null and hired_tukang_id is null and hired_agency_id is null) or
    (hired_type = 'solo' and hired_tukang_id is not null and hired_agency_id is null) or
    (hired_type = 'crew' and hired_agency_id is not null and hired_tukang_id is null)
  )
);

create table if not exists public.bids (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  bid_from_type bid_from_type_enum not null,
  tukang_id uuid references public.tukang_profiles(id),
  agency_id uuid references public.agencies(id),
  assigned_member_ids uuid[],
  amount numeric(14,2),
  message text,
  duration_estimate text,
  status text,
  expires_at timestamptz,
  bid_type bid_type_enum,
  final_quote_amount numeric(14,2),
  created_at timestamptz not null default now(),
  constraint bids_bidder_check check (
    (bid_from_type = 'solo' and tukang_id is not null and agency_id is null) or
    (bid_from_type = 'crew' and agency_id is not null and tukang_id is null)
  )
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  payee_type payee_type_enum not null,
  tukang_id uuid references public.tukang_profiles(id),
  agency_id uuid references public.agencies(id),
  total_amount numeric(14,2) not null,
  platform_fee_rate numeric(5,2) not null,
  platform_fee_amount numeric(14,2) not null,
  material_release_amount numeric(14,2),
  status transaction_status_enum not null,
  midtrans_order_id text,
  created_at timestamptz not null default now(),
  constraint transactions_amounts_check check (
    total_amount > 0
    and platform_fee_rate >= 0
    and platform_fee_rate <= 100
    and platform_fee_amount >= 0
    and (material_release_amount is null or material_release_amount >= 0)
    and (material_release_amount is null or material_release_amount <= total_amount)
  ),
  constraint transactions_payee_check check (
    (payee_type = 'solo' and tukang_id is not null and agency_id is null) or
    (payee_type = 'crew' and agency_id is not null and tukang_id is null)
  )
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  reviewer_id uuid references public.users(id) on delete set null,
  review_target_type review_target_enum not null,
  tukang_id uuid references public.tukang_profiles(id),
  agency_id uuid references public.agencies(id),
  on_time boolean,
  price_accuracy boolean,
  would_rehire boolean,
  comment text,
  ai_authenticity_score numeric(5,2),
  created_at timestamptz not null default now(),
  constraint reviews_target_check check (
    (review_target_type = 'solo' and tukang_id is not null and agency_id is null) or
    (review_target_type = 'crew' and agency_id is not null and tukang_id is null)
  )
);

create table if not exists public.crew_member_internal_scores (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  agency_id uuid not null references public.agencies(id) on delete cascade,
  tukang_id uuid not null references public.tukang_profiles(id) on delete cascade,
  mandor_score integer not null check (mandor_score between 1 and 5),
  mandor_note text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.tukang_profiles enable row level security;
alter table public.agencies enable row level security;
alter table public.agency_members enable row level security;
alter table public.jobs enable row level security;
alter table public.bids enable row level security;
alter table public.transactions enable row level security;
alter table public.reviews enable row level security;
alter table public.crew_member_internal_scores enable row level security;

create policy users_select_own
on public.users
for select
using (id = auth.uid());

create policy users_insert_self
on public.users
for insert
with check (id = auth.uid());

create policy users_update_self
on public.users
for update
using (id = auth.uid())
with check (id = auth.uid());

create policy tukang_profiles_select_own
on public.tukang_profiles
for select
using (true);

create policy tukang_profiles_insert_own
on public.tukang_profiles
for insert
with check (user_id = auth.uid());

create policy tukang_profiles_update_own
on public.tukang_profiles
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy agencies_select_own
on public.agencies
for select
using (true);

create policy agencies_insert_own
on public.agencies
for insert
with check (mandor_id = auth.uid());

create policy agencies_update_own
on public.agencies
for update
using (mandor_id = auth.uid())
with check (mandor_id = auth.uid());

create policy agency_members_select_own
on public.agency_members
for select
using (
  agency_id in (select id from public.agencies where mandor_id = auth.uid())
  or tukang_id in (select id from public.tukang_profiles where user_id = auth.uid())
);

create policy agency_members_insert_by_mandor
on public.agency_members
for insert
with check (
  agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create policy agency_members_update_by_mandor
on public.agency_members
for update
using (
  agency_id in (select id from public.agencies where mandor_id = auth.uid())
)
with check (
  agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create policy jobs_select_active_or_related
on public.jobs
for select
using (
  status = 'active'
  or user_id = auth.uid()
  or hired_tukang_id in (select id from public.tukang_profiles where user_id = auth.uid())
  or hired_agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create policy jobs_insert_own
on public.jobs
for insert
with check (user_id = auth.uid());

create policy jobs_update_own
on public.jobs
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy bids_select_related
on public.bids
for select
using (
  job_id in (select id from public.jobs where user_id = auth.uid())
  or tukang_id in (select id from public.tukang_profiles where user_id = auth.uid())
  or agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create policy bids_insert_by_owner
on public.bids
for insert
with check (
  (bid_from_type = 'solo' and tukang_id in (select id from public.tukang_profiles where user_id = auth.uid()))
  or (bid_from_type = 'crew' and agency_id in (select id from public.agencies where mandor_id = auth.uid()))
);

create policy bids_update_by_owner
on public.bids
for update
using (
  (bid_from_type = 'solo' and tukang_id in (select id from public.tukang_profiles where user_id = auth.uid()))
  or (bid_from_type = 'crew' and agency_id in (select id from public.agencies where mandor_id = auth.uid()))
)
with check (
  (bid_from_type = 'solo' and tukang_id in (select id from public.tukang_profiles where user_id = auth.uid()))
  or (bid_from_type = 'crew' and agency_id in (select id from public.agencies where mandor_id = auth.uid()))
);

create policy transactions_select_related
on public.transactions
for select
using (
  user_id = auth.uid()
  or tukang_id in (select id from public.tukang_profiles where user_id = auth.uid())
  or agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create policy transactions_insert_by_user
on public.transactions
for insert
with check (user_id = auth.uid());

create policy reviews_select_related
on public.reviews
for select
using (true);

create policy reviews_insert_by_reviewer
on public.reviews
for insert
with check (reviewer_id = auth.uid());

create policy crew_member_internal_scores_select_related
on public.crew_member_internal_scores
for select
using (
  agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create policy crew_member_internal_scores_insert_by_mandor
on public.crew_member_internal_scores
for insert
with check (
  agency_id in (select id from public.agencies where mandor_id = auth.uid())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  role_text text := lower(coalesce(new.raw_user_meta_data->>'role', 'user'));
  account_type_text text := lower(coalesce(new.raw_user_meta_data->>'account_type', ''));
  resolved_role user_role_enum;
  resolved_account_type account_type_enum;
begin
  if role_text in ('user','tukang') then
    resolved_role := role_text::user_role_enum;
  else
    resolved_role := 'user';
  end if;

  if resolved_role = 'tukang' and account_type_text in ('solo','mandor') then
    resolved_account_type := account_type_text::account_type_enum;
  else
    resolved_account_type := null;
  end if;

  insert into public.users (id, email, phone, name, role, account_type, language_preference)
  values (
    new.id,
    new.email,
    new.phone,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    resolved_role,
    resolved_account_type,
    coalesce(new.raw_user_meta_data->>'language_preference', 'id')
  )
  on conflict (id) do nothing;

  if resolved_account_type = 'solo' then
    insert into public.tukang_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  elsif resolved_account_type = 'mandor' then
    insert into public.agencies (mandor_id, agency_name)
    select
      new.id,
      coalesce(
        new.raw_user_meta_data->>'agency_name',
        new.raw_user_meta_data->>'name',
        new.email,
        'Mandor Crew'
      )
    where not exists (
      select 1 from public.agencies where mandor_id = new.id
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace view public.active_jobs as
select *
from public.jobs
where status = 'active';

create or replace view public.active_solo_jobs as
select *
from public.jobs
where status = 'active'
  and (
    crew_welcome = false
    or recommended_tier is null
    or recommended_tier in ('solo','both')
  );

create or replace view public.active_agency_jobs as
select *
from public.jobs
where status = 'active'
  and (
    crew_welcome = true
    or recommended_tier is null
    or recommended_tier in ('crew','both')
  );

create or replace function public.recalculate_solo_rating(p_tukang_id uuid)
returns void
language plpgsql
as $$
declare
  review_count integer;
  review_avg numeric(3,2);
begin
  select
    count(*),
    coalesce(avg(
      (
        (case when on_time then 1 else 0 end) +
        (case when price_accuracy then 1 else 0 end) +
        (case when would_rehire then 1 else 0 end)
      ) / 3.0 * 5.0
    ), 0)
  into review_count, review_avg
  from public.reviews
  where review_target_type = 'solo'
    and tukang_id = p_tukang_id;

  update public.tukang_profiles
  set solo_jobs_count = review_count,
      solo_rating_avg = review_avg
  where id = p_tukang_id;
end;
$$;

create or replace function public.recalculate_agency_rating(p_agency_id uuid)
returns void
language plpgsql
as $$
declare
  review_count integer;
  review_avg numeric(3,2);
begin
  select
    count(*),
    coalesce(avg(
      (
        (case when on_time then 1 else 0 end) +
        (case when price_accuracy then 1 else 0 end) +
        (case when would_rehire then 1 else 0 end)
      ) / 3.0 * 5.0
    ), 0)
  into review_count, review_avg
  from public.reviews
  where review_target_type = 'crew'
    and agency_id = p_agency_id;

  update public.agencies
  set agency_jobs_count = review_count,
      agency_rating_avg = review_avg
  where id = p_agency_id;
end;
$$;

create or replace function public.handle_review_insert()
returns trigger
language plpgsql
as $$
begin
  if new.review_target_type = 'solo' then
    perform public.recalculate_solo_rating(new.tukang_id);
  elsif new.review_target_type = 'crew' then
    perform public.recalculate_agency_rating(new.agency_id);
  end if;

  return new;
end;
$$;

drop trigger if exists on_review_created on public.reviews;

create trigger on_review_created
after insert on public.reviews
for each row execute function public.handle_review_insert();
