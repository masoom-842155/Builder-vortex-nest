# 🛠️ Supabase Database & Email Debugging Guide

## 🔍 **Current Issues Detected:**

1. **Database table not created** - The `profiles` table is missing
2. **Email verification** may not be configured
3. **Authentication flow** might be incomplete

## 📋 **Step-by-Step Fix:**

### **Step 1: Create Database Table**

1. **Go to Supabase Dashboard**:

   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your **"AI Mental Health"** project

2. **Open SQL Editor**:

   - Click **"SQL Editor"** in the left sidebar
   - Click **"New query"**

3. **Run This Complete SQL Setup**:

   Copy and paste this **entire script** and click **"Run"**:

```sql
-- ===== RepeatHarmony Database Setup =====

-- Step 1: Create profiles table
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
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 4: Create automatic profile creation function
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

-- Step 5: Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Step 6: Verify setup
SELECT 'Database setup completed successfully! ✅' as status;

-- Check if table was created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'profiles';
```

### **Step 2: Configure Email Settings**

1. **In your Supabase dashboard**, go to **Authentication** → **Settings**

2. **Set these configurations**:

   **Site URL:**

   ```
   https://147767da27ff43fea8caaf51604c8ba6-50b34203eeb444b19ae04c2a1.projects.builder.codes
   ```

   **Redirect URLs (add these):**

   ```
   https://147767da27ff43fea8caaf51604c8ba6-50b34203eeb444b19ae04c2a1.projects.builder.codes/auth/confirm
   https://147767da27ff43fea8caaf51604c8ba6-50b34203eeb444b19ae04c2a1.projects.builder.codes/**
   ```

3. **Email Confirmation Settings**:

   - ✅ **Enable** "Confirm email"
   - ✅ **Enable** "Double confirm email changes"
   - ⏰ Set **"Confirmation email expires"** to 24 hours

4. **Click "Save"** at the bottom

### **Step 3: Test Authentication**

1. **Try signing up** with a **real email address**
2. **Check your email** (including spam/junk folders)
3. **Look for email from** your Supabase project

### **Step 4: Verify Database Connection**

1. **In Supabase dashboard**, go to **Table Editor**
2. **Look for "profiles" table** - should now exist
3. **Try the authentication** flow again

## 🔧 **Debugging Steps:**

### **Check 1: Verify Supabase Connection**

Open browser developer tools (F12) and look for:

- ✅ No errors about "Demo mode"
- ✅ No errors about invalid URLs
- ❌ Any red errors in console?

### **Check 2: Test Database**

In Supabase Table Editor:

- ✅ Does "profiles" table exist?
- ✅ Are there any test users?
- ✅ Do policies show up in the table?

### **Check 3: Test Email**

Try signing up and check:

- ✅ Does signup complete without errors?
- ✅ Do you see "Check your email" modal?
- ✅ Does email arrive (check spam folder)?
- ✅ Does clicking email link work?

## 🚨 **Common Issues & Fixes:**

### **Issue: "Table doesn't exist"**

**Fix:** Run the SQL script above in Supabase SQL Editor

### **Issue: "Email not sending"**

**Fix:**

1. Check Authentication → Settings → Site URL
2. Verify email confirmation is enabled
3. Check spam folder
4. Try with different email provider (Gmail, etc.)

### **Issue: "Permission denied"**

**Fix:** The RLS policies weren't created - run the SQL script

### **Issue: "Demo mode still active"**

**Fix:**

1. Restart your dev server: `npm run dev`
2. Check environment variables are set
3. Clear browser cache

## 📧 **Email Template Customization**

1. **Go to Authentication** → **Email Templates**
2. **Select "Confirm signup"**
3. **Customize the template**:

```html
<h2>Welcome to RepeatHarmony!</h2>
<p>Thank you for joining our mental wellness community.</p>
<p>Please click the link below to verify your email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email Address</a></p>
<p>Start your mental wellness journey today!</p>
```

## ✅ **Success Checklist:**

After completing the above steps, you should have:

- ✅ **profiles table** visible in Supabase Table Editor
- ✅ **Email verification** working with real emails
- ✅ **Users table** populated when someone signs up
- ✅ **No console errors** in browser
- ✅ **Automatic profile creation** when users sign up

## 🆘 **Still Having Issues?**

If problems persist:

1. **Share the exact error message** from browser console (F12)
2. **Check Supabase Logs** → Authentication for any errors
3. **Verify your email address** is valid and receiving emails
4. **Try with a different browser** or incognito mode

---

**Need immediate help?**

- Check browser console for specific error messages
- Look at Supabase Authentication logs
- Verify the SQL script ran successfully (should see success message)
