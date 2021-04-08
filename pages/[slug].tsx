import type { Category, ExtendedStory, Newsroom } from '@prezly/sdk/dist/types';
import { GetServerSideProps, NextPage } from 'next';
import { getPrezlyApi } from '@/utils/prezly';
import Story from '@/modules/Story';
import Layout from '@/components/Layout';

type Props = {
    story: ExtendedStory;
    categories: Category[];
    newsroom: Newsroom;
};

const StoryPage: NextPage<Props> = ({ story, categories, newsroom }) => (
    <Layout categories={categories} newsroom={newsroom}>
        <Story story={story} newsroom={newsroom} />
    </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const api = getPrezlyApi(context.req);
    const { slug } = context.params as { slug?: string };
    const story = slug ? await api.getStoryBySlug(slug) : null;

    if (!story) {
        return { notFound: true };
    }

    const categories = await api.getCategories();
    const newsroom = await api.getNewsroom();

    return {
        props: { story, categories, newsroom },
    };
};

export default StoryPage;