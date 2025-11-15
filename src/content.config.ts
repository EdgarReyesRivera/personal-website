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
		}),
});

export const collections = { blog, projects };
