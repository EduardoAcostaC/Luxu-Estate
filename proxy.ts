import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/lib/supabase/database.types';

/**
 * Next.js 16 Proxy Middleware convention.
 * Validates active session and user role permissions for administrative routes.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  // Redirect legacy /admin routes to /dashboard
  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (pathname.startsWith('/admin/')) {
    const newPath = pathname.replace(/^\/admin/, '/dashboard');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Allow the unauthorized view to render without redirect loops
  if (pathname.startsWith('/dashboard/unauthorized')) {
    return supabaseResponse;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // 1. Verify authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Verify user role in public.user_roles
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  const role = userRole?.role;

  // Administrators have full access to everything in /dashboard
  if (role === 'admin') {
    return supabaseResponse;
  }

  // Editing roles and managing users (/dashboard/users) is strictly restricted to admins
  if (pathname.startsWith('/dashboard/users')) {
    return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
  }

  // Brokers and agents can view properties dashboard
  if (role === 'broker' || role === 'agent') {
    return supabaseResponse;
  }

  // Viewers or users without elevated permissions are redirected to unauthorized
  return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin',
    '/admin/:path*',
  ],
};
