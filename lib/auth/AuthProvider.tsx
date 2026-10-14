'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, Session, Provider } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  avatarUrl: string | null;
  userName: string | null;
  userEmail: string | null;
  provider: string | null;
  signInWithOAuth: (
    provider: 'google' | 'github',
    redirectTo?: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    let mounted = true;

    // Check active session on initial load
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (mounted) {
        if (error) {
          console.error('Error fetching initial session:', error.message);
        }
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
        router.refresh();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Extract avatar URL from provider metadata
  const avatarUrl = useMemo(() => {
    if (!user) return null;
    const meta = user.user_metadata || {};
    return (
      (meta.avatar_url as string | undefined) ||
      (meta.picture as string | undefined) ||
      null
    );
  }, [user]);

  // Extract user display name
  const userName = useMemo(() => {
    if (!user) return null;
    const meta = user.user_metadata || {};
    return (
      (meta.full_name as string | undefined) ||
      (meta.name as string | undefined) ||
      (meta.preferred_username as string | undefined) ||
      (user.email ? user.email.split('@')[0] : 'User')
    );
  }, [user]);

  const userEmail = user?.email ?? null;

  // Detect OAuth provider
  const provider = useMemo(() => {
    if (!user) return null;
    return (user.app_metadata?.provider as string | undefined) || null;
  }, [user]);

  const signInWithOAuth = async (
    oauthProvider: 'google' | 'github',
    nextPath: string = '/'
  ): Promise<{ error: Error | null }> => {
    try {
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      if (nextPath && nextPath !== '/') {
        callbackUrl.searchParams.set('next', nextPath);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: oauthProvider as Provider,
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams:
            oauthProvider === 'google'
              ? {
                  access_type: 'offline',
                  prompt: 'consent',
                }
              : undefined,
        },
      });

      if (error) {
        return { error };
      }
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const value = {
    user,
    session,
    loading,
    avatarUrl,
    userName,
    userEmail,
    provider,
    signInWithOAuth,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
