'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import { revalidatePath, updateTag } from 'next/cache';
import type { Database } from '@/lib/supabase/database.types';
import { getCurrentUserRole } from '@/lib/roles';

export interface PropertyImageInput {
  id?: string;
  imageUrl: string;
  altText: string;
  caption?: string;
  displayOrder: number;
}

export interface PropertyFormData {
  title: string;
  slug?: string;
  location: string;
  price: number;
  price_period?: string | null;
  listing_type: 'sale' | 'rent';
  property_type: 'House' | 'Apartment' | 'Villa' | 'Penthouse';
  beds: number;
  baths: number;
  area_m2: number;
  image_url: string;
  image_alt: string;
  tag?: string | null;
  is_featured?: boolean;
  /** When omitted the current value is kept (new properties default to active). */
  is_active?: boolean;
  description?: string | null;
  garage?: number | null;
  amenities?: string[] | null;
  latitude?: number | null;
  longitude?: number | null;
  agent_name?: string | null;
  agent_title?: string | null;
  agent_phone?: string | null;
  agent_email?: string | null;
  agent_avatar_url?: string | null;
  images: PropertyImageInput[];
}

/**
 * Creates an authenticated Supabase server client bound to the current request's cookies.
 */
async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Cannot set cookies in read-only contexts
          }
        },
      },
    }
  );
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Server action to save (create or update) a property listing.
 */
export async function savePropertyAction(
  data: PropertyFormData,
  propertyId?: string
): Promise<{ success: boolean; propertyId?: string; slug?: string; error?: string }> {
  try {
    await connection();
    const { role } = await getCurrentUserRole();
    if (!role || (role !== 'admin' && role !== 'broker' && role !== 'agent')) {
      return {
        success: false,
        error: 'Unauthorized: Only agents, brokers, or administrators can manage properties.',
      };
    }

    if (!data.title?.trim()) {
      return { success: false, error: 'Property title is required.' };
    }
    if (data.price === undefined || data.price < 0) {
      return { success: false, error: 'Valid price is required.' };
    }

    const supabase = await getSupabaseServerClient();

    let computedSlug = (data.slug?.trim() ? slugify(data.slug) : slugify(data.title)) || 'property';
    // Ensure slug doesn't conflict with another property
    const { data: existingSlug } = await supabase
      .from('properties')
      .select('id')
      .eq('slug', computedSlug)
      .maybeSingle();

    if (existingSlug && existingSlug.id !== propertyId) {
      computedSlug = `${computedSlug}-${Date.now().toString(36).slice(-4)}`;
    }

    const mainImageUrl =
      data.image_url?.trim() ||
      data.images[0]?.imageUrl ||
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

    const mainImageAlt = data.image_alt?.trim() || data.title;

    const propertyPayload = {
      title: data.title.trim(),
      slug: computedSlug,
      location: data.location?.trim() || 'Unspecified Location',
      price: Number(data.price) || 0,
      price_period: data.listing_type === 'rent' ? data.price_period?.trim() || '/mo' : null,
      listing_type: data.listing_type,
      property_type: data.property_type,
      beds: Number(data.beds) || 1,
      baths: Number(data.baths) || 1,
      area_m2: Number(data.area_m2) || 50,
      image_url: mainImageUrl,
      image_alt: mainImageAlt,
      tag: data.tag?.trim() || null,
      is_featured: Boolean(data.is_featured),
      ...(data.is_active !== undefined ? { is_active: Boolean(data.is_active) } : {}),
      description: data.description?.trim() || null,
      garage: Number(data.garage) || 0,
      amenities: data.amenities && data.amenities.length > 0 ? data.amenities : [],
      latitude: data.latitude !== undefined && data.latitude !== null ? Number(data.latitude) : null,
      longitude: data.longitude !== undefined && data.longitude !== null ? Number(data.longitude) : null,
      agent_name: data.agent_name?.trim() || 'Sarah Jenkins',
      agent_title: data.agent_title?.trim() || 'Senior Real Estate Agent',
      agent_phone: data.agent_phone?.trim() || '+1 (555) 234-5678',
      agent_email: data.agent_email?.trim() || 'sarah.jenkins@luxeestate.com',
      agent_avatar_url:
        data.agent_avatar_url?.trim() ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
    };

    let targetId = propertyId;

    if (propertyId) {
      // Update existing property
      const { error: updateError } = await supabase
        .from('properties')
        .update(propertyPayload)
        .eq('id', propertyId);

      if (updateError) {
        console.error('Error updating property in Supabase:', updateError.message);
        return { success: false, error: updateError.message };
      }
    } else {
      // Create new property
      const { data: newProp, error: insertError } = await supabase
        .from('properties')
        .insert(propertyPayload)
        .select('id')
        .single();

      if (insertError || !newProp) {
        console.error('Error inserting property in Supabase:', insertError?.message);
        return { success: false, error: insertError?.message || 'Failed to create property' };
      }
      targetId = newProp.id;
    }

    if (!targetId) {
      return { success: false, error: 'Property ID missing.' };
    }

    // Handle Gallery images in property_images table
    if (data.images && data.images.length > 0) {
      // Clean previous images for this property
      await supabase.from('property_images').delete().eq('property_id', targetId);

      // Insert new images list
      const imagesToInsert = data.images.map((img, index) => ({
        property_id: targetId!,
        image_url: img.imageUrl,
        alt_text: img.altText || data.title,
        caption: img.caption || (index === 0 ? 'Main View' : `View ${index + 1}`),
        display_order: index,
      }));

      const { error: imgErr } = await supabase.from('property_images').insert(imagesToInsert);
      if (imgErr) {
        console.warn('Non-fatal: Error saving gallery images:', imgErr.message);
      }
    }

    // Revalidate relevant cached views
    updateTag('properties');
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/properties');
    revalidatePath(`/dashboard/properties/${targetId}/edit`);
    revalidatePath('/');
    revalidatePath('/properties');
    revalidatePath(`/properties/${computedSlug}`);

    return { success: true, propertyId: targetId, slug: computedSlug };
  } catch (err) {
    console.error('Unexpected error in savePropertyAction:', err);
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Server action to activate or deactivate a property (soft delete).
 * Properties are never removed from the database: inactive ones are hidden from the
 * public site (home, search, detail) but remain visible in the admin panel.
 */
export async function setPropertyActiveAction(
  propertyId: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await connection();
    const { role } = await getCurrentUserRole();
    if (!role || (role !== 'admin' && role !== 'broker' && role !== 'agent')) {
      return {
        success: false,
        error: 'Unauthorized: Only agents, brokers, or administrators can change property status.',
      };
    }

    const supabase = await getSupabaseServerClient();

    const { data: updated, error } = await supabase
      .from('properties')
      .update({ is_active: isActive })
      .eq('id', propertyId)
      .select('id, slug')
      .maybeSingle();

    if (error) {
      console.error('Error updating property status:', error.message);
      return { success: false, error: error.message };
    }
    if (!updated) {
      return { success: false, error: 'Property not found or not allowed.' };
    }

    updateTag('properties');
    revalidatePath('/dashboard');
    revalidatePath('/');
    revalidatePath('/properties');
    if (updated.slug) revalidatePath(`/properties/${updated.slug}`);

    return { success: true };
  } catch (err) {
    console.error('Unexpected error in setPropertyActiveAction:', err);
    return { success: false, error: (err as Error).message };
  }
}
