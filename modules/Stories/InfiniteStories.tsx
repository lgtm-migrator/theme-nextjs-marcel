import type { FunctionComponent } from 'react';
import { Category } from '@prezly/sdk/dist/types';
import { PaginationProps, StoryWithContent } from 'types';
import { useInfiniteStoriesLoading } from '@/hooks/useInfiniteStoriesLoading';
import LoadMore from './LoadMore';
import StoriesList from './StoriesList';

type Props = {
    initialStories: StoryWithContent[];
    pagination: PaginationProps;
    category?: Category;
};

const InfiniteStories: FunctionComponent<Props> = ({ initialStories, pagination, category }) => {
    const { canLoadMore, displayedStories, loadMoreStories } = useInfiniteStoriesLoading(
        initialStories,
        pagination,
        category,
    );

    return (
        <div className="mb-16">
            <StoriesList stories={displayedStories} />

            <LoadMore canLoadMore={canLoadMore} onLoadMore={loadMoreStories} />
        </div>
    );
};

export default InfiniteStories;
