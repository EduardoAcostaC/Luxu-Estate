UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'The Glass Pavilion';
UPDATE public.properties SET amenities = ARRAY['Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Azure Heights Penthouse';
UPDATE public.properties SET amenities = ARRAY['Gym','Air Conditioning','High-speed Wifi']::text[] WHERE title = 'Tribeca Designer Studio';
UPDATE public.properties SET amenities = ARRAY['Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Modern Family Home';
UPDATE public.properties SET amenities = ARRAY['Gym','Air Conditioning','High-speed Wifi']::text[] WHERE title = 'Urban Loft';
UPDATE public.properties SET amenities = ARRAY['Parking','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Highland Retreat';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Sea View Penthouse';
UPDATE public.properties SET amenities = ARRAY['Gym','Air Conditioning','High-speed Wifi']::text[] WHERE title = 'Central Studio';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Garden Villa';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Sunset Boulevard Villa';
UPDATE public.properties SET amenities = ARRAY['Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Skyline Luxury Suite';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Villa Solarium';
UPDATE public.properties SET amenities = ARRAY['Parking','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Nordic Horizon Loft';
UPDATE public.properties SET amenities = ARRAY['Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Aspen Alpine Sanctuary';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'The Crown Glass Penthouse';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Elysian Garden Estate';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Parking','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Serenity Bay Villa';
UPDATE public.properties SET amenities = ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Mirador Ocean Penthouse';
UPDATE public.properties SET amenities = ARRAY['Parking','High-speed Wifi','Patio / Terrace']::text[] WHERE title = 'Cotswolds Stone Cottage';
UPDATE public.properties SET amenities = ARRAY['Gym','Air Conditioning','High-speed Wifi']::text[] WHERE title = 'Mont-Royal Atelier';

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'The Glass Haven', 'the-glass-haven', '1840 Bel Air Rd, Los Angeles, CA', 7850000, null, 5, 5.5, 520, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', 'Contemporary Glass Haven with infinity pool and canyon views',
  'Exclusive', 'sale', 'Villa', false, 'Perched on Bel Air hills, The Glass Haven showcases dramatic architectural cantilevered volumes with panoramic sunset views. Floor-to-ceiling motorized Fleetwood glass pocket doors create effortless indoor-outdoor flow into travertine patios and an expansive infinity-edge pool.', 3, ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  34.09832, -118.44853, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '20 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'SoHo Cast Iron Loft', 'soho-cast-iron-loft', '112 Prince St, New York, NY', 8500, '/mo', 2, 2, 165, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 'Authentic SoHo cast iron loft with 14-foot ceilings',
  null, 'rent', 'Apartment', false, 'Located in the heart of SoHo landmark district, this museum-quality cast iron loft boasts original Corinthian columns, 14-foot ceilings, and exposed brick walls illuminated by oversized arched windows.', 0, ARRAY['Gym','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  40.7252, -73.9998, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '21 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Pacific Heights Grand Victorian', 'pacific-heights-grand-victorian', '2550 Broadway, San Francisco, CA', 4650000, null, 4, 3.5, 340, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'Restored Pacific Heights Victorian with bay views',
  'New Arrival', 'sale', 'House', false, 'An exquisite blend of classical Victorian architecture and Scandinavian minimalist interior finishes. Features formal dining rooms, chevron French white oak floors, and panoramic views of the Golden Gate Bridge.', 2, ARRAY['Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  37.7933, -122.4385, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '22 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Key Biscayne Oceanfront Sanctuary', 'key-biscayne-oceanfront-sanctuary', '480 Ocean Dr, Key Biscayne, FL', 12500, '/mo', 4, 4.5, 390, 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 'Modern Key Biscayne villa with private beach access',
  'Exclusive', 'rent', 'Villa', false, 'A tranquil tropical sanctuary nestled directly on Key Biscayne pristine shoreline. Offers private dock access, lush palm courtyards, an outdoor summer kitchen, and sparkling turquoise waters as your daily backdrop.', 2, ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  25.6938, -80.1625, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '23 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Telluride Alpine Timber Chalet', 'telluride-alpine-timber-chalet', '320 Mountain Village Blvd, Telluride, CO', 3450000, null, 4, 3, 285, 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80', 'Heavy timber mountain chalet surrounded by aspen trees',
  null, 'sale', 'House', false, 'Crafted with hand-hewn Douglas fir timbers and native Colorado river stone, this ski-in chalet offers double-height cathedral ceilings, a massive radiant stone hearth, and direct gondola connectivity.', 2, ARRAY['Parking','High-speed Wifi','Patio / Terrace']::text[],
  37.9358, -107.8542, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '24 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Austin Hill Country Modern Estate', 'austin-hill-country-modern-estate', '2408 Westlake Dr, Austin, TX', 2850000, null, 4, 4, 370, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', 'Hill Country residence with limestone walls and pool',
  null, 'sale', 'Villa', false, 'Designed by renowned Austin architects, this Westlake residence integrates Texas Lueders limestone with blackened steel accents. Features a resort-style negative edge pool overlooking Lake Austin hills.', 3, ARRAY['Swimming Pool','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  30.3168, -97.7984, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '25 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Paradise Valley Mountain Oasis', 'paradise-valley-mountain-oasis', '6100 E Lincoln Dr, Scottsdale, AZ', 3900000, null, 5, 4.5, 460, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Desert modern estate with Camelback Mountain backdrop',
  'New Arrival', 'sale', 'House', false, 'Nestled at the base of Camelback Mountain, this desert contemporary masterwork blends rammed earth walls with sustainable solar architecture, private zen gardens, and an oasis swimming pool.', 3, ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  33.5327, -111.9525, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '26 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Beacon Hill Historic Townhouse', 'beacon-hill-historic-townhouse', '42 Chestnut St, Boston, MA', 2250000, null, 3, 2.5, 210, 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', 'Red brick Federal period townhouse on gas-lit street',
  null, 'sale', 'House', false, 'Quintessential Boston Federal townhouse along a gas-lit cobblestone avenue. Characterized by five working marble fireplaces, custom library millwork, and an intimate rooftop garden overlooking the Charles River.', 1, ARRAY['Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  42.3575, -71.0694, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '27 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'La Jolla Cove Glass Villa', 'la-jolla-cove-glass-villa', '1380 Coast Blvd, La Jolla, CA', 6200000, null, 4, 4.5, 430, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', 'Cliffside glass villa overlooking the Pacific Ocean',
  'Exclusive', 'sale', 'Villa', false, 'Commanding uninterrupted 180-degree Pacific ocean views, this architectural masterpiece features curved glass facades, cantilevered oceanview balconies, and a heated ocean-facing lap pool.', 2, ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  32.8488, -117.2733, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '28 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Koolau Ridge Contemporary Haven', 'koolau-ridge-contemporary-haven', '45-120 Waikalua Rd, Kaneohe, HI', 6500, '/mo', 3, 3, 240, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80', 'Tropical modern residence framed by emerald volcanic peaks',
  null, 'rent', 'House', false, 'Situated under dramatic emerald Koolau cliffs, this retreat balances open-air trade wind circulation with clean modern architecture. Includes sprawling lanai decks, fruit orchards, and plunge pool.', 2, ARRAY['Swimming Pool','Parking','High-speed Wifi','Patio / Terrace']::text[],
  21.418, -157.8015, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '29 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Gold Coast Lakefront Penthouse', 'gold-coast-lakefront-penthouse', '1400 N Lake Shore Dr, Chicago, IL', 7200, '/mo', 3, 3, 220, 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80', 'Luxury high-rise penthouse overlooking Lake Michigan',
  null, 'rent', 'Penthouse', false, 'Direct lakefront penthouse offering uninterrupted panoramas of Lake Michigan and Chicago skyline. Features custom Italian quartz kitchens, private elevator foyer, and a building fitness club.', 1, ARRAY['Gym','Parking','Air Conditioning','High-speed Wifi']::text[],
  41.908, -87.625, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '30 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Montecito Spanish Colonial Revival', 'montecito-spanish-colonial-revival', '1180 San Ysidro Rd, Santa Barbara, CA', 5400000, null, 5, 5, 480, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Historic Montecito estate with terra-cotta tile roof and olive groves',
  'Exclusive', 'sale', 'Villa', false, 'Surrounded by century-old olive groves, this timeless Montecito estate honors historic George Washington Smith aesthetics with white plaster arches, hand-painted tiles, and a private tennis pavilion.', 3, ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  34.4372, -119.6385, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '31 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Queen Anne Soundview Residence', 'queen-anne-soundview-residence', '425 7th Ave W, Seattle, WA', 1750000, null, 3, 2.5, 195, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Modern Seattle home with Puget Sound sunset views',
  null, 'sale', 'House', false, 'Capturing majestic views of Puget Sound and the Olympic Mountains, this Queen Anne home showcases clean lines, radiant heated cedar flooring, and an expansive entertaining rooftop terrace.', 2, ARRAY['Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  47.6235, -122.3655, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '32 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'DUMBO Clocktower Penthouse', 'dumbo-clocktower-penthouse', '1 Main St, Brooklyn, NY', 11000, '/mo', 3, 3.5, 260, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 'DUMBO penthouse with iconic views of Brooklyn Bridge',
  'Exclusive', 'rent', 'Penthouse', false, 'An iconic loft penthouse framed by grand 16-foot circular clock windows offering breathtaking 360-degree vistas of Manhattan bridge, Lower Manhattan skyline, and the East River.', 1, ARRAY['Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  40.7038, -73.9902, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '33 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Sedona Red Rock Modern Retreat', 'sedona-red-rock-modern-retreat', '185 Chapel Dr, Sedona, AZ', 1980000, null, 3, 3, 230, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80', 'Architectural sanctuary nestled against Sedona red rock buttes',
  null, 'sale', 'Villa', false, 'Framed by dramatic sandstone red rock buttes, this eco-luxury residence features thermal mass rammed earth walls, solar passive design, stargazing deck, and an integrated negative-edge spa.', 2, ARRAY['Swimming Pool','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  34.8697, -111.761, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '34 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'South of Broad Historic Single House', 'south-of-broad-historic-single-house', '28 Meeting St, Charleston, SC', 2100000, null, 4, 3, 270, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'Classic Charleston single house with double piazzas and private garden',
  null, 'sale', 'House', false, 'A magnificent pre-war Charleston single home featuring double-tiered piazzas, heart pine floors, handcrafted plaster moldings, and a serene brick courtyard shaded by ancient live oaks.', 1, ARRAY['Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  32.7765, -79.9311, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '35 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'St. Helena Vineyard Estate', 'st-helena-vineyard-estate', '1540 Spring Mountain Rd, Napa Valley, CA', 8900000, null, 5, 6, 580, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', 'Napa Valley vineyard estate surrounded by Cabernet vines',
  'Exclusive', 'sale', 'Villa', false, 'Nestled on 12 private hillside acres planted with premium Cabernet Sauvignon vines. Includes a temperature-controlled underground wine cave, infinity-edge pool, and private guest cottage.', 3, ARRAY['Swimming Pool','Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  38.505, -122.47, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '36 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Vail Village Ski-In Luxury Chalet', 'vail-village-ski-in-luxury-chalet', '280 Gore Creek Dr, Vail, CO', 9200, '/mo', 4, 4, 310, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', 'Ski chalet situated directly along Gore Creek in Vail',
  null, 'rent', 'Penthouse', false, 'Ultimate alpine living just steps from Vail Mountain Gondola One. Features heated cobblestone driveway, radiant stone flooring, private outdoor hydrotherapy tub, and roaring timber fireplaces.', 2, ARRAY['Swimming Pool','Gym','Parking','High-speed Wifi','Patio / Terrace']::text[],
  39.6403, -106.3742, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '37 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Russian Hill Panoramic Penthouse', 'russian-hill-panoramic-penthouse', '1000 Green St, San Francisco, CA', 4750000, null, 3, 3, 225, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 'San Francisco penthouse with views of Alcatraz and Coit Tower',
  'New Arrival', 'sale', 'Penthouse', false, 'Commanding top-floor Russian Hill residence with unobstructed panoramic views from Alcatraz to the Bay Bridge. Floor-to-ceiling glass wraps around the living areas and connects to private wind-screened terraces.', 2, ARRAY['Gym','Parking','Air Conditioning','High-speed Wifi','Patio / Terrace']::text[],
  37.799, -122.417, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '38 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  'Tribeca Industrial Minimalist Loft', 'tribeca-industrial-minimalist-loft', '55 White St, New York, NY', 4200, '/mo', 1, 1.5, 92, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 'Tribeca corner loft with custom blackened steel partitions',
  null, 'rent', 'Apartment', false, 'Corner loft bathed in bright southern and eastern light through seven oversized mahogany windows. Equipped with Boffi kitchen cabinetry, Gaggenau induction appliances, and custom terrazzo bathrooms.', 0, ARRAY['Gym','Air Conditioning','High-speed Wifi']::text[],
  40.718, -74.004, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '39 days'
) ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'the-glass-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'the-glass-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'the-glass-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'the-glass-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'the-glass-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'soho-cast-iron-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'soho-cast-iron-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'soho-cast-iron-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'soho-cast-iron-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'soho-cast-iron-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'pacific-heights-grand-victorian'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'pacific-heights-grand-victorian'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'pacific-heights-grand-victorian'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'pacific-heights-grand-victorian'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'pacific-heights-grand-victorian'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'key-biscayne-oceanfront-sanctuary'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'key-biscayne-oceanfront-sanctuary'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'key-biscayne-oceanfront-sanctuary'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'key-biscayne-oceanfront-sanctuary'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'key-biscayne-oceanfront-sanctuary'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'telluride-alpine-timber-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'telluride-alpine-timber-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'telluride-alpine-timber-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'telluride-alpine-timber-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'telluride-alpine-timber-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'austin-hill-country-modern-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'austin-hill-country-modern-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'austin-hill-country-modern-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'austin-hill-country-modern-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'austin-hill-country-modern-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'paradise-valley-mountain-oasis'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'paradise-valley-mountain-oasis'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'paradise-valley-mountain-oasis'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'paradise-valley-mountain-oasis'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'paradise-valley-mountain-oasis'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'beacon-hill-historic-townhouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'beacon-hill-historic-townhouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'beacon-hill-historic-townhouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'beacon-hill-historic-townhouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'beacon-hill-historic-townhouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'la-jolla-cove-glass-villa'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'la-jolla-cove-glass-villa'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'la-jolla-cove-glass-villa'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'la-jolla-cove-glass-villa'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'la-jolla-cove-glass-villa'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'koolau-ridge-contemporary-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'koolau-ridge-contemporary-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'koolau-ridge-contemporary-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'koolau-ridge-contemporary-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'koolau-ridge-contemporary-haven'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'gold-coast-lakefront-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'gold-coast-lakefront-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'gold-coast-lakefront-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'gold-coast-lakefront-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'gold-coast-lakefront-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'montecito-spanish-colonial-revival'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'montecito-spanish-colonial-revival'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'montecito-spanish-colonial-revival'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'montecito-spanish-colonial-revival'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'montecito-spanish-colonial-revival'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'queen-anne-soundview-residence'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'queen-anne-soundview-residence'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'queen-anne-soundview-residence'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'queen-anne-soundview-residence'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'queen-anne-soundview-residence'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'dumbo-clocktower-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'dumbo-clocktower-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'dumbo-clocktower-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'dumbo-clocktower-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'dumbo-clocktower-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'sedona-red-rock-modern-retreat'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'sedona-red-rock-modern-retreat'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'sedona-red-rock-modern-retreat'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'sedona-red-rock-modern-retreat'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'sedona-red-rock-modern-retreat'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'south-of-broad-historic-single-house'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'south-of-broad-historic-single-house'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'south-of-broad-historic-single-house'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'south-of-broad-historic-single-house'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'south-of-broad-historic-single-house'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'st-helena-vineyard-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'st-helena-vineyard-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'st-helena-vineyard-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'st-helena-vineyard-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'st-helena-vineyard-estate'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'vail-village-ski-in-luxury-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'vail-village-ski-in-luxury-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'vail-village-ski-in-luxury-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'vail-village-ski-in-luxury-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'vail-village-ski-in-luxury-chalet'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'russian-hill-panoramic-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'russian-hill-panoramic-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'russian-hill-panoramic-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'russian-hill-panoramic-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'russian-hill-panoramic-penthouse'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = 'tribeca-industrial-minimalist-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM', 'Expansive Living Room with Natural Light', 'Living Room', 1
FROM public.properties WHERE slug = 'tribeca-industrial-minimalist-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI', 'Gourmet Chef Kitchen with Custom Island', 'Kitchen', 2
FROM public.properties WHERE slug = 'tribeca-industrial-minimalist-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg', 'Primary Bedroom Suite with Panoramic Views', 'Master Bedroom', 3
FROM public.properties WHERE slug = 'tribeca-industrial-minimalist-loft'
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs', 'Private Patio and Architectural Terrace', 'Patio & Outdoors', 4
FROM public.properties WHERE slug = 'tribeca-industrial-minimalist-loft'
ON CONFLICT DO NOTHING;
