import type { ExtraStoryFields, Story } from '@prezly/sdk';

export interface Env {
    NODE_ENV: 'production' | 'development' | 'test';
    PREZLY_ACCESS_TOKEN: string;
    PREZLY_NEWSROOM_UUID: string;
}

export type StoryWithImage = Story & Pick<ExtraStoryFields, 'thumbnail_image'>;

export type AlternateLanguageLink = {
    href: string;
    hrefLang: string;
};

export interface BasePageProps {
    translations: Record<string, any>;
    isTrackingEnabled?: boolean;
}
