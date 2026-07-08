import type { CollectionEntry } from 'astro:content';

/**
 * Shared project ordering: newest pubDate first, undated entries after all
 * dated ones (keeping their original relative order). Used by the homepage,
 * the projects index, and the prev/next links on project detail pages — keep
 * them consistent by always sorting through here.
 */
export function sortProjectsByDate(
	projects: CollectionEntry<'projects'>[],
): CollectionEntry<'projects'>[] {
	return [...projects].sort((a, b) => {
		const aDate = a.data.pubDate;
		const bDate = b.data.pubDate;

		if (aDate && bDate) {
			return bDate.valueOf() - aDate.valueOf();
		} else if (aDate && !bDate) {
			return -1;
		} else if (!aDate && bDate) {
			return 1;
		} else {
			return 0;
		}
	});
}
