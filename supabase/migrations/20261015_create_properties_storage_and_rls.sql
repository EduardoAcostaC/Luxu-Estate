-- Migration: 20261015_create_properties_storage_and_rls.sql
-- Setup Supabase Storage bucket for properties and configure RLS policies

-- 1. Create storage bucket 'properties' if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'properties',
    'properties',
    true,
    5242880, -- 5MB limit per image
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- 2. Storage Policies for 'properties' bucket
DROP POLICY IF EXISTS "Public can view property images" ON storage.objects;
CREATE POLICY "Public can view property images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'properties');

DROP POLICY IF EXISTS "Authenticated users can upload property images" ON storage.objects;
CREATE POLICY "Authenticated users can upload property images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'properties'
        AND (
            EXISTS (
                SELECT 1 FROM public.user_roles
                WHERE user_id = auth.uid()
                AND role IN ('admin', 'broker', 'agent')
            )
            OR public.is_admin(auth.uid())
        )
    );

DROP POLICY IF EXISTS "Authenticated users can update property images" ON storage.objects;
CREATE POLICY "Authenticated users can update property images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'properties'
        AND (
            EXISTS (
                SELECT 1 FROM public.user_roles
                WHERE user_id = auth.uid()
                AND role IN ('admin', 'broker', 'agent')
            )
            OR public.is_admin(auth.uid())
        )
    );

DROP POLICY IF EXISTS "Authenticated users can delete property images" ON storage.objects;
CREATE POLICY "Authenticated users can delete property images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'properties'
        AND (
            EXISTS (
                SELECT 1 FROM public.user_roles
                WHERE user_id = auth.uid()
                AND role IN ('admin', 'broker', 'agent')
            )
            OR public.is_admin(auth.uid())
        )
    );

-- 3. RLS Policies on public.properties table for mutating operations
DROP POLICY IF EXISTS "Authorized users can insert properties" ON public.properties;
CREATE POLICY "Authorized users can insert properties"
    ON public.properties FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

DROP POLICY IF EXISTS "Authorized users can update properties" ON public.properties;
CREATE POLICY "Authorized users can update properties"
    ON public.properties FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

DROP POLICY IF EXISTS "Authorized users can delete properties" ON public.properties;
CREATE POLICY "Authorized users can delete properties"
    ON public.properties FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

-- 4. Enable RLS and setup policies for public.property_images
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Property images are publicly readable" ON public.property_images;
CREATE POLICY "Property images are publicly readable"
    ON public.property_images FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Authorized users can insert property images" ON public.property_images;
CREATE POLICY "Authorized users can insert property images"
    ON public.property_images FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

DROP POLICY IF EXISTS "Authorized users can update property images" ON public.property_images;
CREATE POLICY "Authorized users can update property images"
    ON public.property_images FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

DROP POLICY IF EXISTS "Authorized users can delete property images" ON public.property_images;
CREATE POLICY "Authorized users can delete property images"
    ON public.property_images FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

-- 5. Fixes after enabling RLS
-- Public SELECT on storage objects (required by upload with upsert: true)
DROP POLICY IF EXISTS "Public can view property images" ON storage.objects;
CREATE POLICY "Public can view property images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'properties');

-- Remove insecure legacy anon write policies
DROP POLICY IF EXISTS "Allow anon update" ON public.properties;
DROP POLICY IF EXISTS "Allow anon insert" ON public.property_images;
