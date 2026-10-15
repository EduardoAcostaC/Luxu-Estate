-- Migration: 20261014_create_user_roles.sql
-- Create role enum and user_roles table with RLS and trigger for auth.users

-- 1. Create app_role enum type
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'broker', 'agent', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role public.app_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT user_roles_user_id_key UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON public.user_roles (user_id);
CREATE INDEX IF NOT EXISTS user_roles_role_idx ON public.user_roles (role);

-- 3. Security definer helper to check admin status without recursive RLS
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = user_uuid AND role = 'admin'
    );
$$;

-- 4. Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Policies
DROP POLICY IF EXISTS "Users can read own role or admins read all" ON public.user_roles;
CREATE POLICY "Users can read own role or admins read all"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id OR public.is_admin(auth.uid())
    );

DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_roles;
CREATE POLICY "Admins can update user roles"
    ON public.user_roles FOR UPDATE
    TO authenticated
    USING (
        public.is_admin(auth.uid())
    )
    WITH CHECK (
        public.is_admin(auth.uid())
    );

-- 6. Trigger to automatically create a user_role when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, email, full_name, avatar_url, role)
    VALUES (
        new.id,
        COALESCE(new.email, ''),
        COALESCE(
            new.raw_user_meta_data->>'full_name',
            new.raw_user_meta_data->>'name',
            new.raw_user_meta_data->>'preferred_username',
            split_part(COALESCE(new.email, 'User'), '@', 1)
        ),
        COALESCE(
            new.raw_user_meta_data->>'avatar_url',
            new.raw_user_meta_data->>'picture'
        ),
        'viewer'::public.app_role
    )
    ON CONFLICT (user_id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, user_roles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, user_roles.avatar_url),
        updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE OF raw_user_meta_data ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- 7. Seed existing users from auth.users into user_roles (Grant admin to eduardoaipn@gmail.com)
INSERT INTO public.user_roles (user_id, email, full_name, avatar_url, role)
SELECT 
    id,
    COALESCE(email, ''),
    COALESCE(
        raw_user_meta_data->>'full_name',
        raw_user_meta_data->>'name',
        raw_user_meta_data->>'preferred_username',
        split_part(COALESCE(email, 'User'), '@', 1)
    ),
    COALESCE(
        raw_user_meta_data->>'avatar_url',
        raw_user_meta_data->>'picture'
    ),
    CASE 
        WHEN email = 'eduardoaipn@gmail.com' THEN 'admin'::public.app_role
        ELSE 'viewer'::public.app_role
    END
FROM auth.users
ON CONFLICT (user_id) DO UPDATE SET
    role = CASE 
        WHEN user_roles.email = 'eduardoaipn@gmail.com' THEN 'admin'::public.app_role
        ELSE user_roles.role
    END,
    full_name = COALESCE(EXCLUDED.full_name, user_roles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, user_roles.avatar_url);
