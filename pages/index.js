import Head from 'next/head'
import Layout from '../components/Layout';
import { getPostPaths } from '../utils/getPostInfo';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export default function Home({ posts }) {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Hi, I'm&nbsp;
          <span className="text-blue-600" href="https://nextjs.org">
            Ingo
          </span>.
        </h1>

        <p className="mt-3 text-2xl">
          I'm a web developer based in Wellington,
          wrangling technologies and teams.
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {posts.map(post => (
            <a
              href="#"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
              key={post.slug}
            >
              <h3 className="text-2xl font-bold">{post.data.title} &rarr;</h3>
              <p className="mt-4 text-xl">
                {post.data.summary}
              </p>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export function getStaticProps() {
  const posts = getPostPaths().map(({slug, filePath}) => {
    const source = fs.readFileSync(filePath);
    const { data, content } = matter(source);
    return {
      slug,
      data: {
        ...data,
        // https://github.com/vercel/next.js/discussions/11498
        date: data.date ? JSON.stringify(data.date) : null,
        summary: data.summary ?? content.slice(0, 200)
      },
      content
    };
  });
  return {
    props: {
      posts
    }
  };
}