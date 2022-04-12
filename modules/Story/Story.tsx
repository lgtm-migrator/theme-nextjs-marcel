import type { FunctionComponent } from 'react';
import classNames from 'classnames';
import { ExtendedStory, StoryFormatVersion } from '@prezly/sdk';
import { useCompanyInformation } from '@prezly/theme-kit-nextjs';

import SlateRenderer from '@/components/SlateRenderer';
import { StorySeo } from '@/components/seo';
import StoryStickyBar from '@/components/StoryStickyBar';
import { SubscriptionForm, Boilerplate, SocialLinks } from '@/modules/Sidebar';

import StoryHeader from './StoryHeader';

type Props = {
    story: ExtendedStory;
};

const Story: FunctionComponent<Props> = ({ story }) => {
    const companyInformation = useCompanyInformation();

    const { format_version, content } = story;

    const { about, address } = companyInformation || {};
    const hasBoilerplate = !!about || !!address;

    return (
        <>
            <StorySeo story={story} />
            <article>
                <StoryHeader story={story} />

                <div className="pt-16 py-6 lg:max-w-[920px] lg:mx-auto">
                    {format_version === StoryFormatVersion.HTML && (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {format_version === StoryFormatVersion.SLATEJS && (
                        <SlateRenderer nodes={JSON.parse(content)} />
                    )}
                </div>
            </article>

            {companyInformation && (
                <div className="lg:max-w-[920px] lg:mx-auto border-t border-gray-600 py-14 lg:pt-16 lg:flex lg:mb-24">
                    <SubscriptionForm
                        className={classNames(
                            hasBoilerplate
                                ? 'lg:w-80 lg:order-2 lg:ml-12 lg:flex-shrink-0 lg:mb-0'
                                : 'lg:flex-grow p-8',
                        )}
                        inlineForm={!hasBoilerplate}
                    />
                    {hasBoilerplate && (
                        <div className="flex-grow">
                            <Boilerplate companyInformation={companyInformation} />
                            <SocialLinks companyInformation={companyInformation} />
                        </div>
                    )}
                </div>
            )}

            <StoryStickyBar story={story} />
        </>
    );
};

export default Story;
