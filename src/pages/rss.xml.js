// import { getCollection } from 'astro:content'; // re-enable with the blog
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// The blog is hidden (src/pages/_blog) until real posts exist, so emit an
	// empty feed — otherwise items would link to pages that 404.
	// To restore: swap `[]` for the mapped `posts` below when un-hiding the blog.
	// const posts = await getCollection('blog');
	// items: posts.map((post) => ({ ...post.data, link: `/blog/${post.id}/` }))
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: [],
	});
}
