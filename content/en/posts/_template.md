---
title: "Your Heading Here"
date: 2025-01-01
slug: "your-heading-here"
ingress: "Short ingress that summarizes the article. This is shown in the list and at the beginning of the article."
---

**Filename:** Use the format `YYMMDD-Title-Here.md` (e.g., `251129-Omai-landed-big-project.md`)

**Slug:** Add `slug: "your-heading-here"` in the front matter to control the URL. The URL will be `/posts/your-heading-here` (lowercase, no date).

**Translations:** For language switching to work between translations, the filename must be identical in both `content/posts/` and `content/en/posts/`. Use the same slug in both versions.

**Assets:** Place images and other assets in `static/posts/YYMMDD/` (e.g., `static/posts/251129/`) to match the filename's date.

## A Subheading

Here you write your content. You can use **bold** and *italic* text.

### A Smaller Subheading

Multiple paragraphs are possible. Each paragraph is separated by an empty line.

A new paragraph starts here.

## Images with Description

Use the `post-image` shortcode to add images with description:

{{< post-image 
    src="posts/YYMMDD/your-image.jpg" 
    alt="Descriptive alt-text for accessibility"
    description="Main description of the image"
    subtext="Optional subtext, e.g. Photo: Photographer's name"
>}}

## Links

You can create [links to other pages](/en/about) or [external links](https://example.com).

## Additional Tips

- Use lists to structure information
- Each section can have multiple paragraphs
- Images can be placed anywhere in the text
- Use shortcodes for special features:
  - highlight: for highlight boxes in Warm Coral
  - innovation: for innovation boxes in Bright Yellow
  - calm: for calm-section boxes in Calm Blue
  - See examples in existing posts for syntax

