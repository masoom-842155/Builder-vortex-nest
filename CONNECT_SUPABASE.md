# 🔗 Connect RepeatHarmony to "AI Mental Health" Supabase Project

## 📋 Step-by-Step Connection Guide

### **Step 1: Get Your Project Credentials**

1. **Open Supabase Dashboard**

   - Go to [supabase.com/dashboard](https://supabase.com/dashboard)
   - Sign in to your account

2. **Select Your Project**

   - Find and click on **"AI Mental Health"** project
   - Make sure you're in the correct project

3. **Get API Credentials**

   - In the sidebar, go to **Settings** → **API**
   - You'll see two important values:

   **Project URL** (copy this)

   ```
   https://[your-project-id].supabase.co
   ```

   **anon public key** (copy this - it's the long key starting with "eyJ")

   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### **Step 2: Update Environment File**

1. **Open `.env.local`** in your project root
2. **Uncomment and replace** these lines with your actual values:

```env
VITE_SUPABASE_URL=https://[your-project-id].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example:**

```env
VITE_SUPABASE_URL=https://xyzabcdef123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZjEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjg0NTQ2NzAwLCJleHAiOjIwMDAxMjI3MDB9...
```

### **Step 3: Set Up Database Table**

Your "AI Mental Health" project needs a profiles table for user data:

1. **Go to SQL Editor**

   - In Supabase dashboard, click **SQL Editor** in sidebar

2. **Run This SQL Command**
   - Copy and paste this code, then click "Run":

```sql
-- Create profiles table for RepeatHarmony users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, initials)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'User'),
    UPPER(LEFT(COALESCE(new.raw_user_meta_data->>'name', 'US'), 2))
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger to run function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### **Step 4: Restart Your App**

1. **Stop your development server** (Ctrl+C in terminal)
2. **Restart** with:

   ```bash
   npm run dev
   ```

3. **Check the console** - you should see:
   - ✅ No more "Demo mode" warnings
   - ✅ Successful Supabase connection

### **Step 5: Test Authentication**

1. **Try signing up** with a new account
2. **Check Supabase dashboard**:
   - Go to **Authentication** → **Users**
   - You should see your new user
   - Go to **Table Editor** → **profiles**
   - You should see the user profile

## 🎉 **You're Connected!**

Your RepeatHarmony app is now using real authentication with your "AI Mental Health" Supabase project:

- ✅ **Real user accounts** stored in your database
- ✅ **Secure authentication** with encrypted passwords
- ✅ **Session persistence** across browser refreshes
- ✅ **Password reset** functionality via email
- ✅ **User profiles** with real data storage

## 🔧 **Optional Enhancements**

### **Enable Email Verification**

1. Go to **Authentication** → **Settings**
2. Turn on "Confirm email"
3. Customize email templates

### **Add Social Logins**

1. Go to **Authentication** → **Providers**
2. Enable Google, GitHub, etc.
3. Configure OAuth apps

### **Custom Email Domain**

1. Go to **Authentication** → **Settings**
2. Configure custom SMTP

## 🆘 **Troubleshooting**

**Still seeing demo mode?**

- Check that environment variables are set correctly
- Restart your dev server
- Check browser console for errors

**"Invalid credentials" errors?**

- Double-check you copied the `anon` key (not `service_role`)
- Ensure URL starts with `https://` and ends with `.supabase.co`

**Database errors?**

- Make sure you ran the SQL commands to create the profiles table
- Check the Table Editor to verify the table exists

---

🎊 **Congratulations!** Your mental health app now has enterprise-grade authentication powered by your "AI Mental Health" Supabase project!
