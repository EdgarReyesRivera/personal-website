---
title: 'Test Post: Validating the New Blog'
description: 'This is a short description used for the blog index card and for SEO (meta description).'
pubDate: '2025-11-15'
heroImage: '../../assets/preview.png'
tags: ['Astro', 'Testing', 'Web Dev']
---

## 🧪 Blog Post Rendered Successfully!

If you are reading this, your new dynamic blog layout is working correctly.

Here is a checklist to confirm everything is implemented:

### 1. Issue #11 (Schema)

This post's frontmatter includes `tags: ['Astro', 'Testing', 'Web Dev']`. The fact that the page built without errors means your `src/content/config.ts` schema is correctly reading the new `tags` field.

### 2. Issue #12 (Blog Index Page)

Navigate back to your main `/blog` page. You should see:

* A **card** for this post, styled just like your project cards.
* The card should display the `heroImage` (`preview.png`).
* The card should show the title: "Test Post: Validating the New Blog".
* The card should show the date: "Nov 15, 2025".
* The card should show the description from the frontmatter.

### 3. Issue #13 (Blog Post Layout)

You are on this page (`/blog/testing`) right now. You should see:

* The `preview.png` hero image displayed at the top of this article.
* The main title and publish date are centered above this text.
* This text itself is styled by the `.prose` class, which centers it in a 720px-wide column.

---

### ⭐ Recommendation Test (Social Sharing)

This test confirms your "shareable link" feature is working.

1.  In your browser, right-click and select "View Page Source" (or "Inspect Element" and look in the `<head>`).
2.  Search for `<meta property="og:image"`.
3.  You should see a line that looks like this:
    `<meta property="og:image" content="http://your-site-url/assets/preview.png">`

If you see that, it confirms the `heroImage` is being passed to your `<BaseHead />` component correctly, just as we planned.

### This was created by Gemini 2.5 pro to make sure blog page works.