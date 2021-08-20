import fs from 'fs'
import path from 'path'

export const POSTS_PATH = path.join(process.cwd(), 'posts')

export function getPostPaths() {
  return fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((name) => /\.mdx?$/.test(name))
    .map(name => {
      return {
        slug: name.replace(/\.mdx?$/, ''),
        filePath: path.join(POSTS_PATH, name)
      };
    });
  }