-- Migration: 20261016_add_properties_is_active.sql
-- Soft-deactivate properties instead of deleting them.
--   * Inactive properties are hidden from the public site (home, search, detail).
--   * Staff (admin / broker / agent) can still read and update them in the dashboard.
--   * Hard DELETE on public.properties is no longer allowed through the API.

-- 1. Column + index
ALTER TABLE public.properties
    ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS properties_is_active_idx
    ON public.properties (created_at DESC)
    WHERE is_active;

-- 2. SELECT policies: public sees active only, staff sees everything
DROP POLICY IF EXISTS "Properties are publicly readable" ON public.properties;
DROP POLICY IF EXISTS "Active properties are publicly readable" ON public.properties;
CREATE POLICY "Active properties are publicly readable"
    ON public.properties FOR SELECT
    TO anon, authenticated
    USING (is_active);

DROP POLICY IF EXISTS "Staff can read all properties" ON public.properties;
CREATE POLICY "Staff can read all properties"
    ON public.properties FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'broker', 'agent')
        )
        OR public.is_admin(auth.uid())
    );

-- 3. Properties are never hard-deleted: remove the DELETE policy
DROP POLICY IF EXISTS "Authorized users can delete properties" ON public.properties;
