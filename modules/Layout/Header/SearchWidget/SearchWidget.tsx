import { useAlgoliaSettings, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import algoliasearch from 'algoliasearch/lite';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import Modal from '@/components/Modal';

import MainPanel from './components/MainPanel';
import SearchBar from './components/SearchBar';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    dialogClassName?: string;
}

function SearchWidget({ isOpen, onClose, className, dialogClassName }: Props) {
    const currentLocale = useCurrentLocale();
    const { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX } = useAlgoliaSettings();

    const searchClient = useMemo(
        () => algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY),
        [ALGOLIA_API_KEY, ALGOLIA_APP_ID],
    );

    return (
        <Modal
            id="search-widget"
            isOpen={isOpen}
            onClose={onClose}
            className={classNames(className)}
            dialogClassName={classNames(dialogClassName)}
        >
            <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX}>
                <Configure
                    hitsPerPage={3}
                    filters={`attributes.culture.code:${currentLocale.toUnderscoreCode()}`}
                />
                <SearchBar />
                <MainPanel />
            </InstantSearch>
        </Modal>
    );
}

export default SearchWidget;
