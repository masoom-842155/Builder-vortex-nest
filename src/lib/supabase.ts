import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl === "your-project-url-here" ||
  supabaseAnonKey === "your-anon-key-here"
) {
  console.warn("⚠️  Supabase credentials not configured. Using demo mode.");
  console.log("To set up Supabase authentication:");
  console.log("1. Create a project at https://supabase.com");
  console.log("2. Copy your project URL and anon key");
  console.log("3. Update your .env.local file with:");
  console.log("   VITE_SUPABASE_URL=your-actual-project-url");
  console.log("   VITE_SUPABASE_ANON_KEY=your-actual-anon-key");
}

// Create a mock client for demo mode if credentials are missing
const createSupabaseClient = () => {
  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl === "your-project-url-here" ||
    supabaseAnonKey === "your-anon-key-here"
  ) {
    // Return a mock client for demo mode
    return {
      auth: {
        getSession: () =>
          Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: {
              message: "Demo mode: Please configure Supabase credentials",
            },
          }),
        signUp: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: {
              message: "Demo mode: Please configure Supabase credentials",
            },
          }),
        signOut: () => Promise.resolve({ error: null }),
        resetPasswordForEmail: () => Promise.resolve({ error: null }),
        onAuthStateChange: (callback: any) => {
          callback("SIGNED_OUT", null);
          return { data: { subscription: { unsubscribe: () => {} } } };
        },
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () =>
              Promise.resolve({
                data: null,
                error: {
                  message: "Demo mode: Please configure Supabase credentials",
                },
              }),
          }),
        }),
        insert: () =>
          Promise.resolve({
            error: {
              message: "Demo mode: Please configure Supabase credentials",
            },
          }),
      }),
    };
  }

  // Create real Supabase client
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
};

export const supabase = createSupabaseClient() as any;

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  initials: string;
  joinedAt: string;
}

// Database types (extend as needed)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          initials: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          initials: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          initials?: string;
          updated_at?: string;
        };
      };
    };
  };
}
