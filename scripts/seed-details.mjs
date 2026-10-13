import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oddkbhedcqyncmqvsjjr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_oCcbNWf6zy2dmoZkL0XcGg_vHs_BD-V';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const coordinatesMap = {
  'The Glass Pavilion': { lat: 34.0736200, lng: -118.4003560 },
  'Azure Heights Penthouse': { lat: 49.2827290, lng: -123.1207380 },
  'Modern Family Home': { lat: 47.6062100, lng: -122.3320710 },
  'Urban Loft': { lat: 45.5152320, lng: -122.6783850 },
  'Highland Retreat': { lat: 44.0581730, lng: -121.3153100 },
  'Sea View Penthouse': { lat: 25.7616800, lng: -80.1917900 },
  'Central Studio': { lat: 41.8781140, lng: -87.6297980 },
  'Garden Villa': { lat: 30.2671530, lng: -97.7430610 },
  'Sunset Boulevard Villa': { lat: 34.0928090, lng: -118.3286610 },
  'Skyline Luxury Suite': { lat: 40.7127760, lng: -74.0059730 },
  'Villa Solarium': { lat: 34.0259220, lng: -118.7797570 },
  'Nordic Horizon Loft': { lat: 59.3293240, lng: 18.0685810 },
  'Aspen Alpine Sanctuary': { lat: 39.1910980, lng: -106.8175390 },
  'The Crown Glass Penthouse': { lat: 51.5073510, lng: -0.1277580 },
  'Elysian Garden Estate': { lat: 33.4941700, lng: -111.9260520 },
  'Serenity Bay Villa': { lat: 21.3069440, lng: -157.8583330 },
  'Tribeca Designer Studio': { lat: 40.7191430, lng: -74.0089030 },
  'Mirador Ocean Penthouse': { lat: 32.8328110, lng: -117.2712720 },
  'Cotswolds Stone Cottage': { lat: 51.8333330, lng: -1.8333330 },
  'Mont-Royal Atelier': { lat: 45.5016890, lng: -73.5672560 },
};

const slugMap = {
  'The Glass Pavilion': 'the-glass-pavilion',
  'Azure Heights Penthouse': 'azure-heights-penthouse',
  'Modern Family Home': 'modern-family-home',
  'Urban Loft': 'urban-loft',
  'Highland Retreat': 'highland-retreat',
  'Sea View Penthouse': 'sea-view-penthouse',
  'Central Studio': 'central-studio',
  'Garden Villa': 'garden-villa',
  'Sunset Boulevard Villa': 'sunset-boulevard-villa',
  'Skyline Luxury Suite': 'skyline-luxury-suite',
  'Villa Solarium': 'villa-solarium',
  'Nordic Horizon Loft': 'nordic-horizon-loft',
  'Aspen Alpine Sanctuary': 'aspen-alpine-sanctuary',
  'The Crown Glass Penthouse': 'the-crown-glass-penthouse',
  'Elysian Garden Estate': 'elysian-garden-estate',
  'Serenity Bay Villa': 'serenity-bay-villa',
  'Tribeca Designer Studio': 'tribeca-designer-studio',
  'Mirador Ocean Penthouse': 'mirador-ocean-penthouse',
  'Cotswolds Stone Cottage': 'cotswolds-stone-cottage',
  'Mont-Royal Atelier': 'mont-royal-atelier',
};

const defaultAmenities = [
  'Smart Home System',
  'Swimming Pool',
  'Central Heating & Cooling',
  'Electric Vehicle Charging',
  'Private Gym',
  'Wine Cellar',
  'High-Speed Fiber Internet',
  '24/7 Concierge & Security'
];

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

async function seed() {
  console.log('Fetching properties...');
  const { data: properties, error: fetchErr } = await supabase.from('properties').select('*');
  if (fetchErr) {
    console.error('Error fetching properties:', fetchErr);
    process.exit(1);
  }
  console.log(`Found ${properties.length} properties.`);

  for (const p of properties) {
    const slug = slugMap[p.title] || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const coords = coordinatesMap[p.title] || { lat: 37.4418830, lng: -122.1430200 };
    const garage = (p.property_type === 'Villa' || p.property_type === 'House') ? 2 : 1;
    const description = `Experience modern luxury in this architecturally stunning ${p.property_type.toLowerCase()} located in ${p.location}. Designed with an emphasis on seamless indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light. The open-concept gourmet kitchen is equipped with top-of-the-line appliances and custom Italian cabinetry. Retreat to the primary suite, a sanctuary of relaxation with a spa-inspired bath and private balcony with picturesque views.`;

    console.log(`Updating ${p.title} (${slug})...`);
    const { error: updateErr } = await supabase
      .from('properties')
      .update({
        slug,
        latitude: coords.lat,
        longitude: coords.lng,
        garage,
        description,
        amenities: defaultAmenities,
        agent_name: 'Sarah Jenkins',
        agent_title: 'Top Rated Agent',
        agent_phone: '+1 (555) 234-5678',
        agent_email: 'sarah.jenkins@luxeestate.com',
        agent_avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
      })
      .eq('id', p.id);

    if (updateErr) {
      console.error(`Failed to update ${p.title}:`, updateErr);
    }

    // Insert image collection
    const imagesToInsert = [
      {
        property_id: p.id,
        image_url: p.image_url,
        alt_text: p.image_alt,
        caption: 'Main Exterior View',
        display_order: 0,
      },
      ...galleryImages.map((img) => ({
        property_id: p.id,
        image_url: img.url,
        alt_text: img.alt,
        caption: img.caption,
        display_order: img.order,
      })),
    ];

    const { error: imgErr } = await supabase
      .from('property_images')
      .upsert(imagesToInsert, { onConflict: 'property_id, display_order' });

    if (imgErr) {
      // If no unique constraint on (property_id, display_order), do standard insert
      const { error: insertErr } = await supabase.from('property_images').insert(imagesToInsert);
      if (insertErr) console.error(`Error inserting images for ${p.title}:`, insertErr);
    }
  }

  console.log('Seeding completed successfully!');
}

seed();
