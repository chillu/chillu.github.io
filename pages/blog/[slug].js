import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { getPostData, getPathBySlug, getPostPaths } from '../../utils/post';

export default function Post(props) {
    return (
        <Layout>
            <main>
                <article className="prose">
                    <h1>{props.data.title}</h1>
                    <p>{format(parseISO(props.data.date), 'yyyy-MM-dd')}</p>
                    <ReactMarkdown children={props.content} />
                </article>
            </main>
        </Layout>
    );
};

export async function getStaticProps({ params: { slug } }) {
    const filePath = getPathBySlug(slug);
    const data = getPostData(filePath);
    return {
        props: data
    };
};

export async function getStaticPaths() {
  const paths = getPostPaths()
    .map(filePath => getPostData(filePath, false))
    .map(post => post.url);

  return {
    paths,
    fallback: false,
  };
}