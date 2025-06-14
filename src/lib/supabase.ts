import { createClient } from "@supabase/supabase-js";

// These environment variables should be set in your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "your-project-url";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

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
