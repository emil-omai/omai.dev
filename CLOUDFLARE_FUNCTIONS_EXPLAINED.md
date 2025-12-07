# How Cloudflare Pages Automatically Detects and Deploys Functions

## Overview

Cloudflare Pages has a built-in feature called **Pages Functions** that automatically detects JavaScript/TypeScript files in a `functions` directory and deploys them as serverless functions. No configuration needed!

## Directory Structure Convention

Cloudflare Pages looks for a `functions/` directory in your project root (or in your build output directory). The file structure directly maps to URL routes:

```
your-project/
├── functions/
│   └── api/
│       ├── contact.js          → /api/contact
│       └── job-application.js → /api/job-application
└── public/                     (your static Hugo build output)
```

## How File Path Maps to URL

The file path structure directly determines the URL route:

| File Path | URL Route |
|-----------|-----------|
| `functions/api/contact.js` | `/api/contact` |
| `functions/api/job-application.js` | `/api/job-application` |
| `functions/hello.js` | `/hello` |
| `functions/blog/[slug].js` | `/blog/:slug` (dynamic route) |

**Key points:**
- The `functions/` prefix is removed
- File extensions (`.js`, `.ts`) are removed
- Directory structure becomes URL path structure

## Automatic Detection Process

When you deploy to Cloudflare Pages, here's what happens:

### 1. **Build Phase**
```
Hugo builds your site → outputs to /public
Cloudflare Pages scans for /functions directory
```

### 2. **Function Discovery**
Cloudflare Pages automatically:
- Scans the `functions/` directory (and subdirectories)
- Finds all `.js` and `.ts` files
- Maps them to URL routes based on file paths
- Validates the exported functions

### 3. **Deployment**
- Static files from `public/` are deployed as usual
- Functions are deployed as serverless endpoints
- Both are available on the same domain

## Function Export Convention

Cloudflare Pages Functions use specific export names that map to HTTP methods:

```javascript
// Handle GET requests
export async function onRequest(context) { }

// Handle POST requests
export async function onRequestPost(context) { }

// Handle OPTIONS requests (for CORS)
export async function onRequestOptions() { }

// Handle any HTTP method
export async function onRequest(context) {
  if (context.request.method === 'POST') { }
}
```

## Your Current Setup

In your project:

```
functions/
└── api/
    ├── contact.js          → Handles POST to /api/contact
    └── job-application.js   → Handles POST to /api/job-application
```

Both files export:
- `onRequestOptions()` - for CORS preflight requests
- `onRequestPost(context)` - for handling form submissions

## Deployment Flow

### Option 1: Git Integration (Automatic)
1. You push code to GitHub/GitLab
2. Cloudflare Pages detects the push
3. Runs your build command (`hugo --minify`)
4. **Automatically scans for `functions/` directory**
5. Deploys both static files AND functions
6. Functions are live at `/api/contact` and `/api/job-application`

### Option 2: Manual Deploy (Wrangler CLI)
```bash
wrangler pages deploy public --project-name=omai-www
```

Wrangler will:
- Deploy static files from `public/`
- **Automatically detect and deploy functions from `functions/`**
- Make everything available on your domain

## Important Notes

### 1. Functions Directory Location
- Functions can be in the **source directory** (`functions/` in your repo)
- OR in the **build output directory** (`public/functions/` after Hugo build)
- Cloudflare Pages checks both locations

**For Hugo sites:** Since Hugo outputs to `public/`, you have two options:

**Option A:** Keep functions in source (recommended)
```
your-repo/
├── functions/          ← Cloudflare scans this
└── public/            ← Hugo build output
```
Cloudflare Pages will find functions in the repo root, even though Hugo doesn't process them.

**Option B:** Copy functions to build output
You'd need to copy `functions/` to `public/functions/` during build, but this is unnecessary.

### 2. No Configuration Needed
Unlike Cloudflare Workers (which need `wrangler.toml`), Pages Functions require **zero configuration**. Just:
- Create the `functions/` directory
- Add your `.js` files
- Deploy

### 3. Environment Variables
Set in Cloudflare Dashboard:
- Pages → Your Site → Settings → Environment Variables
- Available to functions via `context.env`

## How It Works Behind the Scenes

1. **During Build:**
   ```
   Cloudflare Pages build process:
   ├── Runs your build command (hugo)
   ├── Scans project for functions/ directory
   ├── Validates function exports
   └── Prepares both static assets and functions
   ```

2. **During Deployment:**
   ```
   Cloudflare Pages deployment:
   ├── Uploads static files to CDN
   ├── Deploys functions to Workers runtime
   └── Routes requests:
       ├── Static files → CDN
       └── /api/* → Functions
   ```

3. **At Runtime:**
   ```
   Request to omai.dev/api/contact:
   ├── Cloudflare checks: Is this a static file? No
   ├── Cloudflare checks: Is there a function? Yes!
   └── Routes to functions/api/contact.js
   ```

## Verification

You can verify functions are detected by:

1. **Cloudflare Dashboard:**
   - Go to Pages → Your Site → Functions
   - You should see your functions listed

2. **Check Build Logs:**
   - Look for "Functions detected" or similar messages
   - Should show: `functions/api/contact.js`, `functions/api/job-application.js`

3. **Test the Endpoints:**
   ```bash
   curl -X POST https://omai.dev/api/contact
   # Should return a response (even if error, means function exists)
   ```

## Troubleshooting

**Functions not working?**
- Check that `functions/` directory is in your repository root
- Verify file exports are correct (`onRequestPost`, etc.)
- Check build logs for function detection
- Ensure environment variables are set

**Functions not detected?**
- Make sure files are `.js` or `.ts` (not `.mjs`)
- Check that exports are named correctly
- Verify the directory structure matches URL structure

## Summary

Cloudflare Pages Functions work through **convention over configuration**:
- ✅ Put files in `functions/` directory
- ✅ File path = URL route
- ✅ Export HTTP method handlers
- ✅ Deploy (automatic detection)
- ❌ No config files needed
- ❌ No manual routing setup
- ❌ No separate deployment step

That's it! The magic happens automatically when you deploy to Cloudflare Pages.




