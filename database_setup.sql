-- RepeatHarmony Database Setup for "AI Mental Health" Supabase Project
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Create profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Step 2: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create security policies
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Step 4: Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, initials)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    UPPER(LEFT(COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), 2))
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Step 5: Create trigger to run function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Success message
SELECT 'RepeatHarmony database setup completed successfully! 🎉' as status;
