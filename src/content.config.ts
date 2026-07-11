import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: 'src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const projects = defineCollection({
	// Load Markdown and MDX files in the `src/content/projects/` directory.
	loader: glob({ base: 'src/content/projects', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// A short description for project cards
			description: z.string(),
			// 'Completed', 'In-Progress', or 'Future'
			status: z.enum(['Completed', 'In-Progress', 'Future']),
			// Add a date for sorting, e.g., completion date
			pubDate: z.coerce.date().optional(),
			// Optional tags for filtering
			tags: z.array(z.string()).optional(),
			// Optional github url 
			githubUrl: z.string().url().optional(),
			heroImage: image().optional(),
			featured: z.boolean().optional(),
		}),
});

const experiences = defineCollection({
	// Load Markdown and MDX files in the `src/content/experiences/` directory.
	loader: glob({ base: 'src/content/experiences', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// e.g. 'Washington, D.C.'
			location: z.string(),
			// The capacity in which I represented Miami, e.g. 'SHPE Chapter President'
			role: z.string().optional(),
			// Groups the experiences index: internships/co-ops ('work'),
			// conference attendance ('conference'), or representing Miami
			// at external events ('representation').
			category: z.enum(['work', 'conference', 'representation']).default('representation'),
			// Only published experiences get pages and index cards;
			// scaffolds stay false until the write-up is done (same as courses).
			published: z.boolean().default(false),
			heroImage: image().optional(),
			// Extra trip photos rendered as a grid after the body
			gallery: z
				.array(
					z.object({
						src: image(),
						alt: z.string(),
						caption: z.string().optional(),
					}),
				)
				.optional(),
			// External links rendered in a "Related Links" section
			links: z
				.array(
					z.object({
						label: z.string(),
						url: z.string().url(),
					}),
				)
				.optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const courses = defineCollection({
	// Load Markdown and MDX files in the `src/content/courses/` directory.
	loader: glob({ base: 'src/content/courses', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		// Course name, e.g. 'Digital Systems Design'
		title: z.string(),
		description: z.string(),
		// e.g. 'ECE 287'
		courseCode: z.string().optional(),
		// Groups the skills-page "Relevant Coursework" list
		department: z.enum(['Computer Engineering', 'Computer Science']),
		// When the course was taken, e.g. 'Fall 2025'
		term: z.string().optional(),
		// Matched against skill tag aliases on the skills page, same as projects
		tags: z.array(z.string()).optional(),
		// Project ids (content file names) built in this course, e.g. 'tinyrv1-processor'
		projects: z.array(z.string()).optional(),
		// Ordering within the department's coursework list (lower = first)
		order: z.number().optional(),
		// Only published courses get pages and skill-dropdown links;
		// scaffolds stay false until the write-up is done.
		published: z.boolean().default(false),
	}),
});

export const collections = { blog, projects, experiences, courses };
