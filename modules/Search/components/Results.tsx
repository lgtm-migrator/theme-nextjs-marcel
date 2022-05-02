import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import type { Hit as HitType, InfiniteHitsProvided } from 'react-instantsearch-core';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import LoadMore from '@/modules/Stories/LoadMore';

import { useAlgoliaState } from './AlgoliaStateContext';
import Hit from './Hit';

type SearchHit = HitType<{ attributes: AlgoliaStory }>;

function Results({ hits, hasMore, refineNext }: InfiniteHitsProvided<SearchHit>) {
    const { formatMessage } = useIntl();
    const { searching: isSearching, searchState, searchResults } = useAlgoliaState();

    const { query: searchQuery } = searchState;
    const resultsCount = searchResults ? searchResults.nbHits : 0;

    return (
        <>
            <h3 className="text-gray-300 mt-6 mb-12">
                {searchQuery ? (
                    <FormattedMessage
                        {...translations.search.fullResultsSubTitle}
                        values={{
                            resultsCount,
                            searchQuery: <>&quot;{searchQuery}&quot;</>,
                        }}
                    />
                ) : null}
            </h3>
            <hr className="w-[100px] mb-10 border-0 border-t-2 border-gray-600" />
            {!hits.length &&
                (isSearching ? (
                    <LoadMore onLoadMore={() => {}} canLoadMore={isSearching} />
                ) : (
                    <p className="text-base text-gray-300 text-left py-4">
                        {formatMessage(translations.search.noResults)}
                    </p>
                ))}
            {hits.map((hit) => (
                <Hit key={hit.objectID} hit={hit} />
            ))}
            <LoadMore canLoadMore={hasMore} onLoadMore={refineNext} />
        </>
    );
}

export default connectInfiniteHits(Results);
