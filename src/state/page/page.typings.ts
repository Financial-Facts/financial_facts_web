export type PageState = Record<Page, PageData>;

export type Page = 'Main' | 'About' | 'Discount' | 'Facts' | 'API Docs';

export interface PageData {
    active: boolean,
    link: string
}