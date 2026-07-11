# Content TODO — everything only Edgar can write

This is the master list of writing work needed to un-hide the built-but-hidden
sections of the site. The scaffolding, layouts, and routes all exist — each item
below is *content*, in your own voice (Claude scaffolds; it does not write your
narrative for you).

Re-enable checklists for each section live in `CLAUDE.md`; this file is just the
writing work itself. Delete items (or the whole file) as they get done.

---

## 1. Experiences (6 posts — highest impact, can go live one at a time)

Unlocks: the `/experiences` section, links from the homepage highlight cards
and /about timeline, and experience tags feeding the skills-page panels.

Every post now has `published: false` (like courses) — a finished post flips to
`true` individually once the section is re-enabled; unfinished scaffolds can't
leak. Posts are grouped on the index by `category` (`work` / `representation` /
`conference`).

Same shape for every post: resolve the frontmatter TODOs (`description`, real
`pubDate` — it controls sort order — placeholder link URLs, verify `role`/
`tags`), write the three body sections, then flip `published`.

**Work** (`src/content/experiences/…`)
- [ ] `synchrony-internship.md` — Summer 2024, fully remote from Cincinnati
      (visited the Champaign, IL office); body: The Company & Role /
      What I Worked On / What I Took Away
- [ ] `rovisys-coop.md` — May 2026–present, **ongoing**: write in present tense,
      bump `updatedDate` as it progresses; confirm `location` (Aurora, OH?)

**Representing Miami**
- [ ] `dc-legislative-advocacy.md` — GRN alternate spring break (D.C. +
      Columbus); real GRN link URLs; body: Why We Went / Who We Met / Takeaways
- [ ] `cleveland-clinic-quantum.md` — confirm `role` (attended with GRN
      members); real quantum-major + partnership URLs

**Conferences**
- [ ] `shpe-national-convention.md` — Anaheim; verify dates (2024 convention
      was Oct 30–Nov 3?) and your role/officer title at the time
- [ ] `shpe-presidents-summit.md` — Chicago, 2025; verify month

### Photos (all posts)
- [ ] Drop photos into `src/assets/experience_images/` and reference them in
      each post's `heroImage`/`gallery` frontmatter

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
- [ ] Deep Learning
- [ ] Image Processing

---

## 3. Blog (2 homelab posts scaffolded)

Decision made (July 2026): the personal Linux/homelab material becomes blog
posts, not experience pages. Two scaffolds exist (`src/content/blog/…`):

- [ ] `self-hosting-truenas-nextcloud-tailscale.md` — Why I Left OneDrive /
      The Hardware / The Stack / Backups / What's Next
- [ ] `daily-driving-arch-linux.md` — Why Arch / My Setup / VMs on Proxmox /
      What I've Learned
- [ ] Resolve each post's frontmatter TODOs (`description`, real `pubDate`)
- [ ] Re-enable the blog once at least one post is written (checklist in
      CLAUDE.md, including restoring the RSS items) and remove the placeholder
      "testing" post

---

## 4. Project assets & gaps (improves what's already live)

- [ ] **TinyRV1 block diagram** — the write-up's own Future Work section promises
      one; it would become the project's hero image (card + OG link preview)
- [ ] **Hero images for the other image-less projects** (cards fall back to the
      gradient strip, link previews to the generic site image):
      habit-tracker (dashboard screenshot?), fpga-nn-accelerator,
      hetero_compute_project
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
