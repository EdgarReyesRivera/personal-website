# Content TODO — everything only Edgar can write

This is the master list of writing work needed to un-hide the built-but-hidden
sections of the site. The scaffolding, layouts, and routes all exist — each item
below is *content*, in your own voice (Claude scaffolds; it does not write your
narrative for you).

Re-enable checklists for each section live in `CLAUDE.md`; this file is just the
writing work itself. Delete items (or the whole file) as they get done.

---

## 1. Experiences (2 posts — highest impact)

Unlocks: the `/experiences` section, links from the homepage highlight cards,
and experience tags feeding the skills-page panels.

### `src/content/experiences/dc-legislative-advocacy.md` (D.C. trip)
- [ ] Frontmatter: one-sentence `description` (shown on the card, used for SEO)
- [ ] Frontmatter: real trip date for `pubDate` (placeholder Jan 1, 2026 currently controls sort order)
- [ ] Frontmatter: real URL for the Miami SHPE chapter link (placeholder points at miamioh.edu)
- [ ] Body: **Why we went** — what prompted the trip, what was at stake for higher-ed funding
- [ ] Body: **Who we met** — the legislators/staff and what you discussed
- [ ] Body: **Reflections** — representing Miami and SHPE in those rooms

### `src/content/experiences/cleveland-clinic-quantum.md` (Cleveland Clinic trip)
- [ ] Frontmatter: one-sentence `description`
- [ ] Frontmatter: real trip date for `pubDate` (placeholder Jan 2, 2026)
- [ ] Frontmatter: your actual `role`/capacity on the trip
- [ ] Frontmatter: real URLs — quantum-major announcement + Miami/Cleveland Clinic partnership news (placeholders)
- [ ] Body: **What the event was** — why Miami was presenting at Cleveland Clinic
- [ ] Body: **The conversations** — alumni/faculty, the new quantum major, the partnership
- [ ] Body: **Reflections** — what excites you about it

### Photos (both posts)
- [ ] Drop trip photos into `src/assets/experience_images/` and reference them in each post's `gallery` frontmatter

### New post worth writing: Synchrony internship (Summer 2024)
Not scaffolded yet — but the homepage "Industry Experience" highlight card and
the new /about timeline are both built to link to it once it exists. The site
currently says only one sentence about your strongest resume item.
- [ ] Decide: write it as an experience post? (Say the word and the scaffold gets created.)

---

## 2. Coursework (15 course write-ups — can go live one at a time)

Each course has `published: false`; a finished course can be flipped to `true`
individually once the section is re-enabled — no need to finish all 15 first.
Suggested order: start with courses that back up flagship projects.

For **every** course, the same four frontmatter TODOs plus three body sections:
`description` (one sentence), `courseCode` (e.g. ECE XXX), `term`, verify `tags`
— then write *What the Course Covered / What I Learned / Projects I Built*.

**Computer Engineering** (`src/content/courses/…`)
- [ ] Digital Systems Design — also uncomment `projects:` → `gaussian-blur-fpga`
- [ ] Computer Organization — also uncomment `projects:` → `tinyrv1-processor`
- [ ] Embedded Systems Design
- [ ] Electric Circuit Analysis I
- [ ] Elements of Robotics
- [ ] Signals and Systems
- [ ] Network Performance Analysis

**Computer Science**
- [ ] Data Abstractions & Structures
- [ ] Algorithms I
- [ ] Object-Oriented Programming
- [ ] Systems I & II
- [ ] Database Systems
- [ ] Comparative Programming Languages
- [ ] Deep Learning — also uncomment `projects:` → `cuda-vision-pipeline`
- [ ] Image Processing

---

## 3. Blog (decision needed)

- [ ] The only post is a placeholder ("testing"). Either write a first real post
      and re-enable the blog (checklist in CLAUDE.md, including restoring the
      RSS items), or decide to drop the blog section entirely.

---

## 4. Project assets & gaps (improves what's already live)

- [ ] **TinyRV1 block diagram** — the write-up's own Future Work section promises
      one; it would become the project's hero image (card + OG link preview)
- [ ] **Hero images for the other image-less projects** (5 of 7 have none; cards
      fall back to the gradient strip, link previews to the generic site image):
      habit-tracker (dashboard screenshot?), cuda-vision-pipeline,
      fpga-nn-accelerator, hetero_compute_project
- [ ] **Personal-website project write-up** — worth a re-read after each site
      round so it reflects the current feature set
- [ ] **Resume PDF** — when you replace `public/resume.pdf`, also bump
      `RESUME_UPDATED` in `src/consts.ts` (the visible "Last updated" date;
      cache-busting itself is automatic now)

---

## 5. Quick verifications only you can do

- [ ] Open `/contact` on your real phone — the cal.com embed only ever showed a
      loading spinner in headless testing (believed fine, never confirmed)
- [ ] Confirm the about-page timeline dates once it ships (Miami start 2023,
      Synchrony Summer 2024, SHPE President 2025–26, graduation May 2027)
