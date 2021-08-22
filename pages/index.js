import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout';
import { getPostPaths, getPostData } from '../utils/post';

export default function Home({ posts }) {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="relative sm:w-64 sm:h-64 md:h-200 md:w-200">
          <Image 
            alt="My avatar" 
            src="/avatar.jpeg" 
            width={200} 
            height={200} 
            layout="intrinsic"
            objectFit="cover"
            className="rounded-full" 
          />
        </div>

        <h1 className="text-6xl font-bold mt-6">
          Hi, I'm&nbsp;
          <span className="text-blue-600 text-highlight" href="https://nextjs.org">
            Ingo Schommer
          </span>.
        </h1>

        <p className="mt-3 text-2xl">
          I'm a web developer based in Wellington,
          wrangling technologies and teams.
        </p>

        <h2>Projects</h2>

        <h2>Writing</h2>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {posts.map(post => (
            <a
              href={post.url}
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
  const posts = getPostPaths().map((filePath) => getPostData(filePath));
  return {
    props: {
      posts
    }
  };
}