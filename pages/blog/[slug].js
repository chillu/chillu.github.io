import Layout from '../../components/Layout'
import { getPostData, getPathBySlug, getPostPaths } from '../../utils/post';

export default function Post(props) {
    return (
        <Layout>
            <main>
                {props.content}
            </main>
        </Layout>
    );
};

export async function getStaticProps({ params: { slug } }) {
    const filePath = getPathBySlug(slug);
    console.log(filePath);
    return {
        props: getPostData(filePath)
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