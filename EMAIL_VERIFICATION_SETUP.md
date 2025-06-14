# 📧 Email Verification Setup for RepeatHarmony

## 🎯 Overview

This guide will enable email verification for new user signups in your "AI Mental Health" Supabase project.

## 📋 Step 1: Enable Email Verification in Supabase

### **1.1 Go to Authentication Settings**

1. Open [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your **"AI Mental Health"** project
3. Go to **Authentication** → **Settings**

### **1.2 Enable Email Confirmation**

1. Scroll to **"User Confirmation"** section
2. **Toggle ON** "Confirm email"
3. **Save** the changes

### **1.3 Configure Email Templates (Optional)**

1. Go to **Authentication** → **Email Templates**
2. Customize the **"Confirm signup"** template:
   - Update subject line: "Welcome to RepeatHarmony! Please confirm your email"
   - Customize the email body with your branding
   - Add your app URL for better user experience

### **1.4 Set Site URL**

1. Go back to **Authentication** → **Settings**
2. Find **"Site URL"** field
3. Set it to: `https://147767da27ff43fea8caaf51604c8ba6-50b34203eeb444b19ae04c2a1.projects.builder.codes`
4. Add redirect URLs if needed

## 📋 Step 2: Test Email Verification

### **2.1 Create Test Account**

1. Go to your RepeatHarmony app
2. Try signing up with a **real email address**
3. Check your email for verification link

### **2.2 Verify the Flow**

1. **Sign up** → Should show "Check your email" message
2. **Check email** → Should receive confirmation email
3. **Click link** → Should redirect back to app
4. **Auto sign-in** → Should be logged in automatically

## 🔧 Email Verification Behavior

### **What Happens Now:**

- ✅ **User signs up** → Account created but unverified
- ✅ **Email sent** → Automatic verification email
- ✅ **User clicks link** → Email verified, auto sign-in
- ✅ **Unverified users** → Cannot access protected features

### **Email Content:**

```
Subject: Welcome to RepeatHarmony! Please confirm your email

Hi there,

Welcome to RepeatHarmony! Please click the link below to verify your email address:

[Confirm Email Address]

This helps us keep your account secure and ensures you receive important updates.

Best regards,
The RepeatHarmony Team
```

## 🎨 Customize Email Templates

### **Professional Template Example:**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;"
  >
    <h1 style="color: white; margin: 0;">RepeatHarmony</h1>
    <p style="color: white; margin: 10px 0;">
      Your Mental Wellness Journey Starts Here
    </p>
  </div>

  <div style="padding: 30px; background: white;">
    <h2 style="color: #333;">Welcome to RepeatHarmony!</h2>
    <p>
      Thank you for joining our mental wellness community. To get started,
      please verify your email address:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a
        href="{{ .ConfirmationURL }}"
        style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;"
      >
        Confirm Email Address
      </a>
    </div>

    <p>Once verified, you'll have access to:</p>
    <ul>
      <li>🎭 Mood tracking and analysis</li>
      <li>🎵 Personalized music therapy</li>
      <li>💬 Supportive community forum</li>
      <li>🧘 Guided therapy sessions</li>
    </ul>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      If you didn't create this account, you can safely ignore this email.
    </p>
  </div>
</div>
```

## 🔐 Security Benefits

### **Why Email Verification Matters:**

- ✅ **Prevents fake accounts** with invalid emails
- ✅ **Ensures communication** for password resets
- ✅ **Builds trust** with users
- ✅ **Reduces spam** and abuse
- ✅ **GDPR compliance** for EU users

## 📱 User Experience Flow

### **1. User Signs Up**

```
[Sign Up Form] → [Submit] → [Account Created]
```

### **2. Email Verification**

```
[Check Email Message] → [Email Received] → [Click Link]
```

### **3. Verification Complete**

```
[Auto Redirect] → [Auto Sign-In] → [Welcome to App]
```

## 🔧 Advanced Configuration

### **Custom Redirect URLs**

You can set different redirect URLs for different environments:

**Development:**

```
http://localhost:8080/auth/confirm
```

**Production:**

```
https://yourapp.com/auth/confirm
```

### **Email Rate Limiting**

Supabase automatically prevents email spam:

- Max 1 email per minute per user
- Max 3 emails per hour per user

## 🆘 Troubleshooting

### **Common Issues:**

**📧 "No email received"**

- Check spam/junk folder
- Verify email address is correct
- Check Supabase email logs

**🔗 "Confirmation link doesn't work"**

- Check Site URL in Supabase settings
- Ensure redirect URLs are configured
- Verify link hasn't expired (24 hours)

**⚠️ "Email already confirmed"**

- User already verified (check auth.users table)
- Link was already used
- Account was manually verified

### **Debug Steps:**

1. Check **Supabase Logs** → Authentication
2. Verify **Email Templates** are enabled
3. Test with **different email provider**
4. Check **browser console** for errors

## 🎉 Success!

Once configured, your RepeatHarmony app will have professional email verification:

- ✅ **Secure signup process**
- ✅ **Professional email branding**
- ✅ **Improved user trust**
- ✅ **Reduced fake accounts**
- ✅ **Better deliverability**

Your mental health app now meets industry standards for user verification! 🚀
