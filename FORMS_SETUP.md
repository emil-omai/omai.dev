# Form Setup Guide for Cloudflare Pages

This guide explains how to set up email functionality for the contact and job application forms using Cloudflare Pages Functions and Resend.

## Prerequisites

1. A Cloudflare account with Pages enabled
2. A Resend account (free tier available at https://resend.com)
3. Your site deployed on Cloudflare Pages

## Step 1: Get Resend API Key

1. Sign up at https://resend.com (free tier includes 3,000 emails/month)
2. Go to API Keys section
3. Create a new API key
4. Copy the API key (you'll need it in Step 2)

## Step 2: Set Up Cloudflare Turnstile (Bot Protection)

1. Go to Cloudflare Dashboard > Turnstile
2. Click "Add Site" to create a new site
3. Configure the site:
   - **Site name**: Your site name (e.g., "Omai Website")
   - **Domain**: Your domain (e.g., `omai.dev`, `*.omai.dev`)
   - **Widget mode**: Managed (recommended - invisible for most users)
4. Copy your **Site Key** and **Secret Key**
5. Update `config.toml`:
   - Replace `YOUR_TURNSTILE_SITE_KEY_HERE` in `params.turnstileSiteKey` with your Site Key
6. Add environment variable in Cloudflare Pages:
   - Go to Cloudflare Dashboard > Pages > Your Site > Settings > Environment Variables
   - Add `TURNSTILE_SECRET_KEY` with your Secret Key (for Production and Preview)

## Step 3: Set Environment Variables

1. Go to Cloudflare Dashboard > Pages > Your Site
2. Click on Settings > Environment Variables
3. Add the following variables for Production (and Preview if needed):
   - `RESEND_API_KEY`: Your Resend API key from Step 1
   - `EMAIL_TO`: hej@omai.dev (or the email where you want to receive submissions)
   - `TURNSTILE_SECRET_KEY`: Your Turnstile Secret Key from Step 2

## Step 4: Verify Domain in Resend

1. In Resend dashboard, go to Domains
2. Add your domain (omai.dev)
3. Add the DNS records Resend provides to your Cloudflare DNS
4. Wait for verification (usually a few minutes)
5. **Important**: You can use the Resend test domain initially, but for production you need to verify your domain

## Step 5: Deploy Your Site

The `functions/` directory is already set up with the API endpoints:
- `/api/contact` - handles contact form submissions
- `/api/job-application` - handles job application form submissions

When you deploy to Cloudflare Pages, these functions will automatically be available at those paths.

1. Push your code to your repository (if using Git integration)
2. Cloudflare Pages will automatically build and deploy
3. The functions will be available at `yourdomain.com/api/contact` and `yourdomain.com/api/job-application`

## Step 6: Test the Forms

1. Visit your contact page (`/contact/`) and submit the form
2. Check your email inbox (check spam folder too)
3. Test the job application form (`/jobba-pa-omai/`) with a CV file
4. Check browser console for any errors if forms don't work

## How It Works

- Forms include Cloudflare Turnstile widget for bot protection
- Forms submit via POST to `/api/contact` or `/api/job-application`
- Cloudflare Pages Functions validate the Turnstile token
- If validation passes, the function processes the request
- Resend API sends the emails
- Success/error messages are displayed to users

## Troubleshooting

- **Forms not submitting**: 
  - Check browser console for errors
  - Verify the API endpoints are accessible
  - Make sure environment variables are set correctly
  - Verify Turnstile Site Key is set in `config.toml`
  - Check that Turnstile widget is rendering (should see widget on form)

- **Emails not arriving**: 
  - Verify Resend API key is correct
  - Check Resend dashboard for delivery status
  - Verify domain is verified in Resend (or use test domain)
  - Check spam folder

- **Turnstile verification fails**:
  - Verify `TURNSTILE_SECRET_KEY` is set in Cloudflare Pages environment variables
  - Check that the Site Key in `config.toml` matches your Turnstile site
  - Ensure the domain in Turnstile settings matches your actual domain

- **CORS errors**: 
  - The functions already include CORS headers
  - Make sure you're testing on the actual domain, not localhost

- **File upload issues**: 
  - Check file size limits (max 10MB)
  - Verify file type is accepted (.pdf, .doc, .docx)

## Cost

- **Cloudflare Pages Functions**: Free tier includes 100,000 requests/day
- **Cloudflare Turnstile**: Free (unlimited verifications)
- **Resend**: Free tier includes 3,000 emails/month
- This should be sufficient for most small to medium websites

## Alternative Email Services

If you prefer not to use Resend, you can modify the functions to use:
- SendGrid
- Mailgun
- AWS SES
- Or any other email API service

Just update the fetch call in the functions to use your preferred service's API.

## Troubleshooting

- **Forms not submitting**: Check browser console for errors
- **Emails not arriving**: Verify Resend API key and domain verification
- **CORS errors**: Make sure the API routes are correctly configured
- **File upload issues**: Check file size limits (max 10MB)

## Cost

- Cloudflare Workers: Free tier includes 100,000 requests/day
- Resend: Free tier includes 3,000 emails/month
- This should be sufficient for most small to medium websites

