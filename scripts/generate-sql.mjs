import { newProperties } from './seed-20-properties.mjs';
import { writeFileSync } from 'fs';

const galleryImages = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM',
    alt: 'Expansive Living Room with Natural Light',
    caption: 'Living Room',
    order: 1,
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI',
    alt: 'Gourmet Chef Kitchen with Custom Island',
    caption: 'Kitchen',
    order: 2,
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg',
    alt: 'Primary Bedroom Suite with Panoramic Views',
    caption: 'Master Bedroom',
    order: 3,
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs',
    alt: 'Private Patio and Architectural Terrace',
    caption: 'Patio & Outdoors',
    order: 4,
  },
];

const existingUpdates = [
  { title: 'The Glass Pavilion', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Azure Heights Penthouse', amenities: ['Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Tribeca Designer Studio', amenities: ['Gym', 'Air Conditioning', 'High-speed Wifi'] },
  { title: 'Modern Family Home', amenities: ['Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Urban Loft', amenities: ['Gym', 'Air Conditioning', 'High-speed Wifi'] },
  { title: 'Highland Retreat', amenities: ['Parking', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Sea View Penthouse', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Central Studio', amenities: ['Gym', 'Air Conditioning', 'High-speed Wifi'] },
  { title: 'Garden Villa', amenities: ['Swimming Pool', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Sunset Boulevard Villa', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Skyline Luxury Suite', amenities: ['Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Villa Solarium', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Nordic Horizon Loft', amenities: ['Parking', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Aspen Alpine Sanctuary', amenities: ['Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'The Crown Glass Penthouse', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Elysian Garden Estate', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Serenity Bay Villa', amenities: ['Swimming Pool', 'Parking', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Mirador Ocean Penthouse', amenities: ['Swimming Pool', 'Gym', 'Parking', 'Air Conditioning', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Cotswolds Stone Cottage', amenities: ['Parking', 'High-speed Wifi', 'Patio / Terrace'] },
  { title: 'Mont-Royal Atelier', amenities: ['Gym', 'Air Conditioning', 'High-speed Wifi'] },
];

let sql = '';

// Update existing
for (const u of existingUpdates) {
  const ams = "ARRAY[" + u.amenities.map(a => `'${a}'`).join(',') + "]::text[]";
  sql += `UPDATE public.properties SET amenities = ${ams} WHERE title = '${u.title.replace(/'/g, "''")}';\n`;
}

// Insert new 20 properties
let idx = 19;
for (const p of newProperties) {
  idx++;
  const ams = "ARRAY[" + p.amenities.map(a => `'${a}'`).join(',') + "]::text[]";
  const tagVal = p.tag ? `'${p.tag}'` : 'null';
  const periodVal = p.pricePeriod ? `'${p.pricePeriod}'` : 'null';
  const desc = p.description.replace(/'/g, "''");
  const title = p.title.replace(/'/g, "''");
  const location = p.location.replace(/'/g, "''");

  sql += `
INSERT INTO public.properties (
  title, slug, location, price, price_period, beds, baths, area_m2, image_url, image_alt,
  tag, listing_type, property_type, is_featured, description, garage, amenities,
  latitude, longitude, agent_name, agent_title, agent_phone, agent_email, agent_avatar_url, created_at
) VALUES (
  '${title}', '${p.slug}', '${location}', ${p.price}, ${periodVal}, ${p.beds}, ${p.baths}, ${p.area_m2}, '${p.imageUrl}', '${p.imageAlt}',
  ${tagVal}, '${p.listingType}', '${p.propertyType}', false, '${desc}', ${p.garage}, ${ams},
  ${p.latitude}, ${p.longitude}, 'Sarah Jenkins', 'Top Rated Agent', '+1 (555) 234-5678', 'sarah.jenkins@luxeestate.com',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  now() - interval '${idx} days'
) ON CONFLICT DO NOTHING;
`;
}

// Insert images for new properties
for (const p of newProperties) {
  sql += `
INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, image_url, image_alt, 'Main Exterior View', 0
FROM public.properties WHERE slug = '${p.slug}'
ON CONFLICT DO NOTHING;
`;

  for (const img of galleryImages) {
    sql += `
INSERT INTO public.property_images (property_id, image_url, alt_text, caption, display_order)
SELECT id, '${img.url}', '${img.alt}', '${img.caption}', ${img.order}
FROM public.properties WHERE slug = '${p.slug}'
ON CONFLICT DO NOTHING;
`;
  }
}

writeFileSync('scripts/generated-seed.sql', sql, 'utf8');
console.log('Generated scripts/generated-seed.sql successfully! Total SQL length:', sql.length);
