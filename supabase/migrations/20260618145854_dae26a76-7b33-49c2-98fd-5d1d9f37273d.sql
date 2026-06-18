
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can read their own roles"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

create policy "Admins can read all roles"
on public.user_roles for select to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage roles"
on public.user_roles for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Settings (key/value, public read)
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;

create policy "Public can read site settings"
on public.site_settings for select to anon, authenticated using (true);

create policy "Admins can insert settings"
on public.site_settings for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update settings"
on public.site_settings for update to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete settings"
on public.site_settings for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

insert into public.site_settings (key, value) values
  ('whatsapp', '"5493794073008"'::jsonb),
  ('whatsapp_display', '"+54 9 3794 07-3008"'::jsonb),
  ('hours', '"20:00 — 02:00"'::jsonb),
  ('instagram', '"burgershow"'::jsonb),
  ('address', '"Corrientes Capital, Argentina"'::jsonb);

-- Products
create table public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null default 0,
  stock integer not null default 0,
  in_stock boolean not null default true,
  image_url text,
  category text not null default 'burger',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;

create policy "Public can read products"
on public.products for select to anon, authenticated using (true);

create policy "Admins can insert products"
on public.products for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update products"
on public.products for update to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete products"
on public.products for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger products_set_updated_at
before update on public.products
for each row execute function public.tg_set_updated_at();

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.tg_set_updated_at();
