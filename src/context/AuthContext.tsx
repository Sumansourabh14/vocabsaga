import FullPageLoader from "@/components/loading/FullPageLoader";
import { supabase } from "@/supabase/supabase-client";
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: unknown;
  session: unknown;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<unknown>(null);
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    console.log(data);
    setSession(data.session);
    setUser(data.session?.user ?? null);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
