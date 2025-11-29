# Deployment and Optimization Guide

## HTML Minification

HTML minification can be enabled in `config.toml` via the `[minify]` section by setting `minifyOutput = true`. This removes whitespace, empty lines, and optimizes the HTML output automatically during build.

**Note:** Currently disabled (`minifyOutput = false`) for easier debugging. Enable for production by setting `minifyOutput = true` in `config.toml` or use the `--minify` flag when building.

## CSS Cache-Busting

CSS files are processed through Hugo Pipes with fingerprinting enabled. This automatically adds a hash to the filename (e.g., `style.abc123.css`) which changes when the file content changes, ensuring browsers always load the latest version.

The CSS is located in `assets/css/style.css` and is automatically:
- Minified
- Fingerprinted (cache-busting)
- Served with integrity hash for security

## Gzip Compression

Gzip compression is typically handled at the web server level. Here are configuration examples for common servers:

### Nginx

Add to your Nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
gzip_disable "MSIE [1-6]\.";
```

### Apache

Enable mod_deflate and add to `.htaccess` or Apache config:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### Netlify

Add `_headers` file in `static/` directory:

```
/*
  Content-Encoding: gzip
```

Or use Netlify's automatic compression (enabled by default).

### Cloudflare

Gzip compression is enabled by default on Cloudflare's free plan and above.

## Build Command

For production builds with all optimizations:

```bash
hugo --minify
```

Or enable minification in `config.toml`:

```toml
[minify]
  minifyOutput = true
```

Then build normally:

```bash
hugo
```

**Note:** Currently `minifyOutput = false` in config for easier debugging. Enable for production deployments.

## Multilingual URL Structure

With `defaultContentLanguageInSubdir = true`, the site generates:
- Swedish content at `/sv/` (default language)
- English content at `/en/`
- Root `/` redirects to `/sv/` (if `disableDefaultLanguageRedirect = false`)

Ensure your web server is configured to handle both language paths correctly.

