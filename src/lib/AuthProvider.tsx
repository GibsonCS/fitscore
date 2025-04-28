
import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { AuthContext } from './auth';
import type { Session } from '@supabase/supabase-js';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only try to get the session if Supabase is configured
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    } else {
      // If Supabase is not configured, just set loading to false
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
