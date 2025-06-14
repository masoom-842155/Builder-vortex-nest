import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, type User } from "@/lib/supabase";
import { AuthError, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ needsVerification: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (mounted) {
        if (error) {
          console.error("Error getting session:", error);
        } else {
          setSession(session);
          if (session?.user) {
            await fetchUserProfile(session.user.id);
          }
        }
        setLoading(false);
      }
    }

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          initials: data.initials,
          joinedAt: data.created_at,
        });
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };

  // Create user profile in database
  const createUserProfile = async (
    userId: string,
    name: string,
    email: string,
  ) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const { error } = await supabase.from("profiles").insert({
      id: userId,
      email,
      name,
      initials,
    });

    if (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Check if it's a demo mode error
      if (error.message.includes("Demo mode")) {
        // Create a mock user for demo purposes
        const mockUser: User = {
          id: `demo_${Date.now()}`,
          name: email.split("@")[0],
          email,
          initials: email.slice(0, 2).toUpperCase(),
          joinedAt: new Date().toISOString(),
        };
        setUser(mockUser);
        return;
      }
      throw new Error(getAuthErrorMessage(error));
    }

    if (data.user) {
      await fetchUserProfile(data.user.id);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      // Check if it's a demo mode error
      if (error.message.includes("Demo mode")) {
        // Create a mock user for demo purposes
        const mockUser: User = {
          id: `demo_${Date.now()}`,
          name,
          email,
          initials: name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2),
          joinedAt: new Date().toISOString(),
        };
        setUser(mockUser);
        return;
      }
      throw new Error(getAuthErrorMessage(error));
    }

    if (data.user) {
      // Create profile in database
      await createUserProfile(data.user.id, name, email);
      await fetchUserProfile(data.user.id);
    }
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(getAuthErrorMessage(error));
    }
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  };

  // Helper function to get user-friendly error messages
  const getAuthErrorMessage = (error: any): string => {
    const message = error?.message || error;

    if (message.includes("Demo mode")) {
      return "Demo Mode: Supabase not configured. Using local authentication.";
    }

    switch (message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please try again.";
      case "User already registered":
        return "An account with this email already exists.";
      case "Password should be at least 6 characters":
        return "Password must be at least 6 characters long.";
      case "Signup requires a valid password":
        return "Please provide a valid password.";
      case "Unable to validate email address: invalid format":
        return "Please provide a valid email address.";
      default:
        return message || "An unexpected error occurred.";
    }
  };

  const value = {
    user,
    session,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
