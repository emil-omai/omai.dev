# omai.dev

Static website for Omai built with Hugo. A multilingual (Swedish/English) site featuring a modern design, blog posts, and optimized performance.

## Features

- **Multilingual Support**: Swedish (default) and English with symmetric structure and language switcher
- **Blog/Posts System**: Content type for articles with template for content creators
- **Responsive Design**: Mobile-friendly with hamburger menu
- **Performance Optimized**:
  - CSS minification and cache-busting (fingerprinting)
  - Optimized asset loading
  - HTML minification available (currently disabled for easier debugging)
- **OMAI Brand Design**: Custom color palette, typography (Lora + Montserrat), and logo integration
- **Shortcodes**: Reusable components for highlight boxes, innovation boxes, calm sections, contact forms, and post images

## Prerequisites

- [Hugo](https://gohugo.io/) version 0.152.2 or later
- Go (required for Hugo, but Hugo binaries are available without Go installation)

### Installing Hugo

**macOS (using Homebrew):**
```bash
brew install hugo
```

**Other platforms:**
See [Hugo Installation Guide](https://gohugo.io/installation/)

Verify installation:
```bash
hugo version
```

## Project Structure

```
omai.dev/
├── assets/              # Source files processed by Hugo Pipes
│   └── css/
│       └── style.css    # CSS (minified and fingerprinted on build)
├── content/             # Content files (Markdown)
│   ├── sv/              # Swedish content (default language)
│   │   ├── _index.md    # Homepage
│   │   ├── about.md     # About page
│   │   ├── contact.md   # Contact page
│   │   └── posts/       # Blog posts
│   │       ├── _index.md
│   │       ├── _template.md # Template for content creators
│   │       └── *.md      # Post files
│   └── en/              # English content
│       ├── _index.md    # Homepage
│       ├── about.md     # About page
│       ├── contact.md   # Contact page
│       └── posts/       # Blog posts
│           ├── _index.md
│           ├── _template.md
│           └── *.md
├── i18n/                # Translation files
│   ├── en.yaml
│   └── sv.yaml
├── layouts/             # HTML templates
│   ├── _default/        # Default templates (used for all languages)
│   ├── partials/        # Reusable partials (footer, etc.)
│   ├── posts/           # Post-specific templates
│   └── shortcodes/      # Custom shortcodes
├── static/              # Static files (images, etc.)
│   ├── css/            # Fallback CSS (for development)
│   ├── images/         # Images and logos
│   └── posts/          # Post assets (organized by date)
├── config.toml         # Hugo configuration
└── public/             # Generated site (output directory)
```

## Development

### Start Development Server

```bash
hugo server
```

The site will be available at `http://localhost:1313/`

The server includes:
- Live reload (automatically refreshes on file changes)
- Hot reload for templates and content

### Development Features

- Swedish is the default language (available at `/sv/`)
- English content is available at `/en/`
- Both languages use symmetric structure in subdirectories
- Language switcher in navigation (flag icons)
- Hamburger menu for mobile navigation

## Building for Production

### Build the Site

```bash
hugo
```

This generates the optimized site in the `public/` directory with:
- Minified and fingerprinted CSS (cache-busting)
- All static assets
- HTML minification available via `--minify` flag or config setting

### Build Options

**Minify output (already enabled in config):**
```bash
hugo --minify
```

**Build with verbose output:**
```bash
hugo --verbose
```

**Build for specific environment:**
```bash
hugo --environment production
```

## Content Creation

### Creating New Posts

1. **Use the template**: Copy `content/sv/posts/_template.md` or `content/en/posts/_template.md`

2. **Naming convention**: 
   - Filename: `YYMMDD-Title-Here.md` (e.g., `251129-Omai-landed-big-project.md`)
   - Slug: Add `slug: "omai-landed-big-project"` in front matter
   - URL will be: `/sv/posts/omai-landed-big-project` or `/en/posts/omai-landed-big-project` (clean, no date)

3. **Assets**: Place images in `static/posts/YYMMDD/` (e.g., `static/posts/251129/`)

4. **Front matter example**:
   ```yaml
   ---
   title: "Your Post Title"
   date: 2025-11-29
   slug: "your-post-slug"
   ingress: "Short summary shown in listings"
   ---
   ```

5. **Available shortcodes**: See the [Shortcodes Reference](#shortcodes-reference) section below

### Creating Translations

For multilingual posts:
- Use the same filename in both `content/sv/posts/` and `content/en/posts/`
- Use the same `slug` in both versions
- This ensures language switcher works correctly

## Shortcodes Reference

Shortcodes are reusable components that can be used in Markdown content files. They provide a way to add styled sections, images, and interactive elements without writing HTML directly.

### Homepage Shortcodes

#### `hero`
Creates a hero section with title, subtitle, and CTA button. Used on the homepage.

**Usage:**
```markdown
{{< hero >}}
Your subtitle text here.
{{< /hero >}}
```

**Features:**
- Automatically includes site title
- Adds CTA button linking to contact page
- Language-aware (button text changes based on page language)

---

#### `features-section`
Wrapper for the "What We Do" section containing feature cards.

**Usage:**
```markdown
{{< features-section title="What We Do" >}}
{{< feature-card ... >}}
{{< /feature-card >}}
{{< /features-section >}}
```

**Parameters:**
- `title` (optional): Section heading. Defaults to "Vad vi gör" / "What We Do"

---

#### `values-section`
Wrapper for the "Our Values" section containing value cards.

**Usage:**
```markdown
{{< values-section title="Our Values" >}}
{{< feature-card ... >}}
{{< /feature-card >}}
{{< /values-section >}}
```

**Parameters:**
- `title` (optional): Section heading. Defaults to "Våra värderingar" / "Our Values"

---

#### `feature-card`
Individual feature or value card with optional icon.

**Usage:**
```markdown
{{< feature-card icon="💡" iconColor="coral" title="Innovation" >}}
Your feature description here.
{{< /feature-card >}}
```

**Parameters:**
- `icon` (optional): Emoji or icon to display. Defaults to "💡"
- `iconColor` (optional): Color class for icon. Options: `coral`, `yellow`, `blue`. Defaults to `coral`
- `title` (required): Card title/heading

**Content:**
- Inner content becomes the card description (supports Markdown)

---

### Content Shortcodes

#### `highlight`
Warm Coral colored highlight box for important information.

**Usage:**
```markdown
{{< highlight >}}
This is important information that needs to stand out.
{{< /highlight >}}
```

**Styling:** Warm Coral background (#DB6464)

---

#### `innovation`
Bright Yellow colored box for innovation and insights.

**Usage:**
```markdown
{{< innovation >}}
This signals innovation and forward-thinking ideas.
{{< /innovation >}}
```

**Styling:** Bright Yellow background (#EBC83B)

---

#### `calm`
Calm Blue colored section for balanced content.

**Usage:**
```markdown
{{< calm >}}
This creates a calm, balanced section.
{{< /calm >}}
```

**Styling:** Calm Blue background (#8BAFBC)

---

#### `post-image`
Image with optional description and subtext. Used in blog posts.

**Usage:**
```markdown
{{< post-image 
    src="posts/250115/image.jpg" 
    alt="Descriptive alt text"
    description="Main description of the image"
    subtext="Photo: Photographer Name"
>}}
```

**Parameters:**
- `src` (required): Path to image relative to `static/` directory
- `alt` (required): Alt text for accessibility
- `description` (optional): Main image description/caption
- `subtext` (optional): Additional subtext (e.g., photo credit)

**Example:**
```markdown
{{< post-image 
    src="posts/250115/ai-conference.jpg" 
    alt="AI conference hall"
    description="Conference hall filled with participants"
    subtext="Photo: AI Conference 2025"
>}}
```

---

#### `contact-form`
Contact form with name, email, and message fields.

**Usage:**
```markdown
{{< contact-form >}}
```

**Note:** This is a static form. Form submission handling needs to be implemented separately (e.g., via JavaScript or server-side processing).

---

### Shortcode Examples

**Complete homepage section:**
```markdown
{{< features-section title="What We Do" >}}
{{< feature-card icon="💡" iconColor="coral" title="Innovation" >}}
We combine technical precision with human warmth.
{{< /feature-card >}}

{{< feature-card icon="🚀" iconColor="yellow" title="Growth" >}}
Driven by curiosity and forward-thinking.
{{< /feature-card >}}
{{< /features-section >}}
```

**Post with image and highlight:**
```markdown
## Section Heading

Regular paragraph text.

{{< highlight >}}
Important callout information.
{{< /highlight >}}

{{< post-image 
    src="posts/250115/example.jpg" 
    alt="Example image"
    description="This is what the image shows"
    subtext="Photo: John Doe"
>}}

More content here.
```

## Configuration

### Key Settings in `config.toml`

- **Default language**: Swedish (`defaultContentLanguage = 'sv'`)
- **Language subdirectories**: Both languages in subdirectories (`defaultContentLanguageInSubdir = true`)
- **Content directories**: Explicitly defined (`contentDir = 'content/sv'` and `contentDir = 'content/en'`)
- **Permalinks**: Posts use clean URLs via `slug` parameter
- **Minification**: CSS, JS, JSON, SVG, XML enabled; HTML minification available but currently disabled
- **Languages**: Swedish (sv) and English (en) configured with symmetric structure

## Optimization

The site includes several optimization features:

1. **CSS Processing**: 
   - Minified automatically
   - Fingerprinted (hash in filename for cache-busting)
   - Integrity hash for security
2. **HTML Minification**: Available via `--minify` flag or `minifyOutput = true` in config (currently disabled for easier debugging)
3. **Gzip Compression**: See `DEPLOYMENT.md` for server configuration

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions including:
- Server configuration (Nginx, Apache)
- Gzip compression setup
- CDN configuration (Netlify, Cloudflare)

## Brand Guidelines

The site follows OMAI brand guidelines:
- **Colors**: Deep Indigo, Soft White, Warm Coral, Bright Yellow, Calm Blue
- **Typography**: Lora (headings), Montserrat (body)
- **Logo**: Available in multiple variants in `static/images/logos/`

## Troubleshooting

### CSS not loading
- Ensure `assets/css/style.css` exists (not just `static/css/style.css`)
- Check Hugo server output for errors

### Posts not showing
- Verify `content/sv/posts/_index.md` and `content/en/posts/_index.md` exist
- Check that `disableKinds` doesn't include `'section'` in config

### Language switcher not working
- Ensure both language versions of content exist
- Check that filenames match between languages
- Verify `slug` is identical in both versions

## License

Copyright © 2025 Omai AB
