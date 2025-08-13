import FullPageLoader from "@/components/loading/FullPageLoader";
import { supabase } from "@/supabase/supabase-client";
import type { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";

type Profile = {
  id: string;
  name: string;
  email: string;
  points: number;
  created_at: string;
};

type AuthContextType = {
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  profile: null,
  session: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (currentSession: Session) => {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentSession.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } else {
      setProfile(profileData);
    }
  };

  const fetchSessionAndProfile = async () => {
    const { data } = await supabase.auth.getSession();
    const currentSession = data.session;

    setSession(currentSession);

    if (currentSession?.user) {
      fetchProfile(currentSession);
    }

    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setProfile(null);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setSession(session);

        if (session?.user) {
          fetchProfile(session);
        } else {
          setProfile(null);
        }
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
    <AuthContext.Provider value={{ profile, session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
