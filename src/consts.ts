// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Edgar Reyes-Rivera | Portfolio';
export const SITE_DESCRIPTION = 'The professional portfolio of Edgar Reyes-Rivera, a dual major computer engineering & computer science student.';
export const SITE_NAME = 'Edgar Reyes-Rivera'

// Shown as "Last updated" on /resume. Bump this whenever public/resume.pdf is
// replaced (cache-busting is automatic — the page hashes the PDF at build time
// — but this human-readable date is maintained by hand).
export const RESUME_UPDATED = 'June 4, 2026';

// Master switch for the Coursework section. While false, the skills page
// renders no links to /coursework/ pages (they'd 404 — the pages dir is the
// underscore-hidden src/pages/_coursework/). Flip to true when un-hiding the
// section; see CLAUDE.md "Coursework section (hidden)".
export const COURSEWORK_ENABLED: boolean = false;
