import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './database.types';

/**
 * Supabase server client bound to the current request's cookies (authenticated user session).
 * Use it for dashboard reads/writes where RLS must see the logged-in staff user
 * (e.g. to read inactive properties). Never call it inside `'use cache'` scopes.
 */
export async function createSupabaseAuthClient() {
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
            // Cannot set cookies in read-only server component contexts
          }
        },
      },
    }
  );
}
