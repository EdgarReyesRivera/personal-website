---
title: 'Personal Portfolio Website'
description: 'This website — a fully static portfolio built with Astro, with type-safe content collections, a token-based design system, and automated deployment on Cloudflare.'
status: 'In-Progress'
pubDate: 2025-11-03
tags: ['Astro', 'TypeScript', 'CSS', 'Web Development']
heroImage: '../../assets/preview.png'
githubUrl: 'https://github.com/EdgarReyesRivera/personal-website'
---

## Overview

This site is my professional homepage: a central place to present my projects, host my resume, and let recruiters and connections see my work in one visit. It is built with Astro 5 and deployed on Cloudflare, shipping as pure static HTML with no client-side framework — every page loads fast on any device and any connection.

## How It's Built

**Content collections.** Every project write-up (including this one) is a Markdown file whose frontmatter is validated against a Zod schema at build time. Adding a project means adding one file — routes, the projects index, homepage features, and the sitemap all pick it up automatically.

**A small design system.** Colors, spacing, shadows, and shared components (buttons, chips, status badges, page headers) live as CSS custom properties and classes in one global stylesheet, so every page stays visually consistent. The site follows the visitor's `prefers-color-scheme` for light and dark mode.

**Build-time cross-referencing.** The skills page matches each skill against project tags when the site builds: skills backed by real work expand into a "Where I've used it" panel linking to the proof. New projects feed these panels automatically through their tags.

**Client-side where it counts.** Because the output is fully static, the projects page's status filter and other interactivity run in small client scripts, written to survive Astro's view transitions so navigation stays seamless without full page reloads.

**Details that matter on a phone.** My business card's QR code points at the resume page, so it is designed mobile-first — including replacing the embedded PDF viewer with direct open/download actions on small screens, where embedded PDFs are unreliable. Fonts (Atkinson Hyperlegible, chosen for readability) are self-hosted and preloaded.

## Design Decisions

I deliberately kept the stack minimal: no JavaScript framework, no CMS, no server. A static site is faster, cheaper, and harder to break, and Git plus Markdown is all the content workflow a portfolio needs. Pushing to the main branch triggers Cloudflare to build and deploy automatically.

## Future Work

Sections for coursework write-ups, campus experiences, and a technical blog are already built and will go live as I finish writing their content.
