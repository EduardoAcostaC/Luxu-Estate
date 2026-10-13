create type public.listing_type  as enum ('sale', 'rent');
create type public.property_type as enum ('House', 'Apartment', 'Villa', 'Penthouse');

create table public.properties (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  location      text not null,
  price         numeric(12,2) not null check (price >= 0),
  price_period  text,
  beds          smallint not null check (beds >= 0),
  baths         numeric(3,1) not null check (baths >= 0),
  area_m2       integer not null check (area_m2 > 0),
  image_url     text not null,
  image_alt     text not null,
  tag           text,
  listing_type  public.listing_type  not null,
  property_type public.property_type not null,
  is_featured   boolean not null default false,
  created_at    timestamptz not null default now()
);

create index properties_created_at_idx on public.properties (created_at desc, id);
create index properties_listing_type_idx on public.properties (listing_type);
create index properties_property_type_idx on public.properties (property_type);
create index properties_featured_idx on public.properties (created_at desc) where is_featured;

alter table public.properties enable row level security;

create policy "Properties are publicly readable"
  on public.properties for select
  to anon, authenticated
  using (true);
