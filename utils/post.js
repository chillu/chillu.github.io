import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const POSTS_SLUG_PATH = 'blog';

export function getPostPaths() {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((name) => /\.mdx?$/.test(name))
    .map(name => path.join(POSTS_PATH, name));
}

export function getPathBySlug(slug) {
  return path.join(POSTS_PATH, slug + '.md');
}

export function getPostData(filePath, parse = true) {
  // Assumes single level directories
  const slug = path.basename(filePath).replace(/\.mdx?$/, '');
  const source = fs.readFileSync(filePath);
  const { data, content } = parse ? matter(source) : { data: {}, content: '' };
  return {
    slug,
    url: `/${POSTS_SLUG_PATH}/${slug}`,
    data: {
      ...data,
      // https://github.com/vercel/next.js/discussions/11498
      date: data.date ? data.date.toISOString() : null,
      summary: data.summary ?? content.slice(0, 200) + '...'
    },
    content
  };
}