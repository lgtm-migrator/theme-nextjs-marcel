import type { ExtraStoryFields, Story } from '@prezly/sdk';

export interface Env {
    NODE_ENV: 'production' | 'development' | 'test';
    PREZLY_ACCESS_TOKEN: string;
    PREZLY_NEWSROOM_UUID: string;
}

export interface PaginationProps {
    itemsTotal: number;
    currentPage: number;
    pageSize: number;
}

export type StoryWithContent = Story & Pick<ExtraStoryFields, 'content'>;

export type AlternateLanguageLink = {
    href: string;
    hrefLang: string;
};

export interface BasePageProps {
    translations: Record<string, any>;
    isTrackingEnabled?: boolean;
}

export enum Font {
    INTER = 'inter',
    MERRIWEATHER = 'merriweather',
    OPEN_SANS = 'open_sans',
    PT_SERIF = 'pt_serif',
    ROBOTO = 'roboto',
    SOURCE_CODE_PRO = 'source_code_pro',
}

export interface ThemeSettingsApiResponse {
    accent_color: string;
    font: Font;
    header_background_color: string;
    header_link_color: string;
    show_date: boolean;
    show_subtitle: boolean;
}

export interface ThemeSettings {
    accentColor: string;
    font: Font;
    headerBackgroundColor: string;
    headerLinkColor: string;
    showDate: boolean;
    showSubtitle: boolean;
}
