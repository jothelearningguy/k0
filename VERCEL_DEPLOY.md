# Vercel Deployment Guide

This guide will help you deploy the k0 Lagos Residency website to Vercel with email functionality.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A Gmail account with App Password enabled
3. Your code pushed to GitHub

## Step 1: Push Code to GitHub

Make sure all your code is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Add Vercel serverless function for email"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your GitHub repository (`jothelearningguy/k0`)
4. Vercel will auto-detect the settings
5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

After deployment, you need to add your email credentials:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   - **Name:** `EMAIL_USER`
     **Value:** `your-gmail@gmail.com`
   
   - **Name:** `EMAIL_PASS`
     **Value:** `your-16-character-app-password`

### Getting Gmail App Password

1. Go to https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "k0 Residency Vercel" as the name
6. Click **Generate**
7. Copy the 16-character password

## Step 4: Redeploy

After adding environment variables, you need to redeploy:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

Or trigger a new deployment by pushing a commit:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

## Step 5: Test the Form

1. Visit your deployed site (e.g., `https://your-project.vercel.app`)
2. Fill out the waitlist form
3. Submit and check:
   - Your email (k0residencylagos@gmail.com) for the notification
   - The submitter's email for the confirmation

## Project Structure for Vercel

```
lagosresidency/
├── api/
│   └── waitlist.js      # Serverless function for email
├── index.html           # Main page
├── benefits.html        # Benefits page
├── who-should-apply.html # Who Should Apply page
├── styles.css           # Styles
├── script.js            # Frontend JavaScript
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies
```

## How It Works

- **Static files** (HTML, CSS, JS) are served directly by Vercel
- **API endpoint** (`/api/waitlist`) is handled by the serverless function in `api/waitlist.js`
- **Environment variables** are securely stored in Vercel and accessible to serverless functions
- **Emails** are sent using Nodemailer with Gmail SMTP

## Troubleshooting

### Form shows error "Email service not configured"
- Make sure environment variables are set in Vercel
- Redeploy after adding environment variables
- Check that variable names are exactly `EMAIL_USER` and `EMAIL_PASS`

### Emails not being sent
- Verify Gmail App Password is correct (16 characters, no spaces)
- Check Vercel function logs: **Deployments** → Click deployment → **Functions** tab
- Ensure 2-Step Verification is enabled on Gmail account

### CORS errors
- The serverless function includes CORS headers
- If issues persist, check Vercel function logs

### Function timeout
- Vercel free tier has 10-second timeout for serverless functions
- Email sending should complete within this time
- If timeout occurs, check function logs for errors

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

## Monitoring

- View function logs in **Deployments** → Select deployment → **Functions** tab
- Monitor usage in **Analytics** tab
- Set up alerts in **Settings** → **Notifications**

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables are set correctly
3. Test email credentials locally first
4. Contact Vercel support if needed

