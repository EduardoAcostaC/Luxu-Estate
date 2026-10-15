'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import { revalidatePath } from 'next/cache';
import type { Database, AppRole, UserRoleRow } from '@/lib/supabase/database.types';

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
            // Cannot set cookies in read-only server component contexts
          }
        },
      },
    }
  );
}

/**
 * Retrieves the current authenticated user along with their role from user_roles.
 */
export async function getCurrentUserRole(): Promise<{
  role: AppRole | null;
  isAdmin: boolean;
  userRole: UserRoleRow | null;
  userId: string | null;
  email: string | null;
}> {
  try {
    await connection();
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        role: null,
        isAdmin: false,
        userRole: null,
        userId: null,
        email: null,
      };
    }

    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (roleError) {
      console.error('Error fetching user role:', roleError.message);
      return {
        role: null,
        isAdmin: false,
        userRole: null,
        userId: user.id,
        email: user.email ?? null,
      };
    }

    const role = userRole?.role ?? 'viewer';
    return {
      role,
      isAdmin: role === 'admin',
      userRole,
      userId: user.id,
      email: user.email ?? null,
    };
  } catch (err) {
    console.error('Unexpected error in getCurrentUserRole:', err);
    return {
      role: null,
      isAdmin: false,
      userRole: null,
      userId: null,
      email: null,
    };
  }
}

/**
 * Retrieves all registered users and their roles (Restricted to admins).
 */
export async function getAllUserRoles(): Promise<{
  users: UserRoleRow[];
  error?: string;
}> {
  const { isAdmin } = await getCurrentUserRole();
  if (!isAdmin) {
    return { users: [], error: 'Unauthorized: Admin role required' };
  }

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('user_roles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all user roles:', error.message);
    return { users: [], error: error.message };
  }

  return { users: data ?? [] };
}

/**
 * Server action to update a user's role.
 * Verifies that the caller has admin permissions.
 */
export async function updateUserRole(
  targetUserId: string,
  newRole: AppRole
): Promise<{ success: boolean; error?: string }> {
  try {
    const { isAdmin, userId } = await getCurrentUserRole();
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized: Only administrators can modify user roles.' };
    }

    if (!targetUserId) {
      return { success: false, error: 'Target user ID is required.' };
    }

    const validRoles: AppRole[] = ['admin', 'broker', 'agent', 'viewer'];
    if (!validRoles.includes(newRole)) {
      return { success: false, error: `Invalid role specified: ${newRole}` };
    }

    const supabase = await getSupabaseServerClient();
    const { error } = await supabase
      .from('user_roles')
      .update({
        role: newRole,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', targetUserId);

    if (error) {
      console.error('Failed to update role in Supabase:', error.message);
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard/users');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error updating user role:', err);
    return { success: false, error: (err as Error).message };
  }
}
