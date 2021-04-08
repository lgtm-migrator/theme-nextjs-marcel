import type { FunctionComponent } from 'react';
import type { Story } from '@prezly/sdk';
import { GetServerSideProps } from 'next';
import { getPrezlyApi } from '@/utils/prezly';
import Layout from '@/components/Layout';
import Stories from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import { Category, Newsroom } from '@prezly/sdk/dist/types';
import { PageSeo } from '@/components/seo';
import getAssetsUrl from '@/utils/prezly/getAssetsUrl';

type Props = {
    stories: Story[];
    category: Category;
    categories: Category[];
    newsroom: Newsroom;
    slug: string;
};

const IndexPage: FunctionComponent<Props> = ({
    category, stories, categories, slug, newsroom,
}) => (
    <>
        <PageSeo
            title={category.display_name}
            description={category.display_description as string}
            url={`${newsroom.url}/category/${slug}`}
            imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
        />
        <Layout categories={categories} newsroom={newsroom}>
            <div className="pt-10 lg:flex lg:flex-nowrap">
                <div>
                    <h3 className="uppercase text-gray-400 text-lg mb-6 tracking-wide">Browsing Category</h3>
                    <h1 className="text-gray-50 font-extrabold mb-12 text-4xl">{category.display_name}</h1>
                    <Stories stories={stories} />
                </div>
                <Sidebar newsroom={newsroom} />
            </div>
        </Layout>
    </>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const { slug } = context.params as { slug: string };
    const categories = await api.getCategories();
    const category = await api.getCategoryBySlug(slug);
    const newsroom = await api.getNewsroom();

    if (!category) {
        return {
            notFound: true,
        };
    }

    const stories = await api.getStoriesFromCategory(category);

    return {
        props: {
            stories,
            category,
            categories,
            newsroom,
            slug,
        },
    };
};

export default IndexPage;