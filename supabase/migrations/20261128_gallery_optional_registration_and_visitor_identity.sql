-- Gallery visitor identity and optional contact fields.
-- Applied to the jp-portfolio Supabase project as
-- gallery_optional_registration_and_visitor_identity.

alter table public.gallery_emails
  alter column email drop not null;
alter table public.gallery_emails
  add column if not exists visitor_id text;

alter table public.gallery_events
  add column if not exists visitor_id text;
alter table public.gallery_events
  add column if not exists visitor_name text;

alter table public.gallery_favorites
  drop constraint if exists gallery_favorites_pkey;
alter table public.gallery_favorites
  add column if not exists id uuid default gen_random_uuid();
alter table public.gallery_favorites
  add column if not exists visitor_id text;
alter table public.gallery_favorites
  alter column email drop not null;
alter table public.gallery_favorites
  add constraint gallery_favorites_pkey primary key (id);

create unique index if not exists gallery_favorites_visitor_unique
  on public.gallery_favorites (gallery_slug, visitor_id, list_name, file);
create unique index if not exists gallery_favorites_email_unique
  on public.gallery_favorites (gallery_slug, email, list_name, file)
  where email is not null;

create index if not exists gallery_emails_visitor_idx
  on public.gallery_emails (gallery_slug, visitor_id);
create index if not exists gallery_events_visitor_idx
  on public.gallery_events (gallery_slug, visitor_id);
