---
title: 'Personal Portfolio Website'
description: 'The very website you are on. A personal portfolio built with Astro to showcase my projects and resume.'
status: 'In-Progress'
pubDate: 2025-11-3
tags: ['Astro', 'MDX', 'TypeScript', 'CSS', 'Vite']
heroImage: '../../assets/preview.png'
githubUrl: 'https://github.com/EdgarReyesRivera/personal-website'
---

## Motivation

This project is my personal portfolio and professional homepage. The primary goal was to create a central, high-performance website to showcase my technical projects, host my resume, and possibly share my thoughts on engineering and computer science through a technical blog.

## Core Features

This website is built using **Astro** for its fast performance and "islands architecture." Key features include:

* **Astro Content Collections**: The site uses Astro's built-in content collections to manage blog posts and projects. This provides type-safety for all frontmatter, which is defined in `src/content.config.ts`.
* **Dynamic Page Generation**: Project and blog post pages are dynamically generated from `.md` and `.mdx` files, allowing me to add new content simply by adding a new Markdown file.
* **Client-Side Filtering**: The main projects page features client-side JavaScript that reads `data-status` attributes from each project card. This allows users to filter the list of projects by status ("Completed," "In-Progress," etc.) without a full page reload.
* **Custom & Accessible Fonts**: The site uses the Atkinson Hyperlegible font, preloading the `woff2` files for performance to ensure high readability.
* **Shared Layouts & Components**: Reusable Astro components like `<BaseLayout />`, `<Header />`, and `<Footer />` are used to maintain a consistent look and feel across the entire site.
* **SEO & RSS**: A sitemap is automatically generated, and an `rss.xml.js` file creates an RSS feed for the blog, making it easy to subscribe to new posts.

## Future Work

As a living project, this portfolio will be continuously updated. Future plans include:

* Writing a technical blog posts, and include the blogs page access from the header.
* Adding new projects as they are completed.
* Potentially implementing a light/dark mode toggle instead of relying solely on the `prefers-color-scheme` media query.
* Build a 'Skills', 'Courses Taken', and 'Achievements' page
* Integrate a meeting scheduler onto the website
* Update home page to create a 'Featured Work' or 'Latest Projects' section