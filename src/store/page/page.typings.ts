export type PageState = Record<Page, PageData>;

export type Page = 'Main' | 'About' | 'Discount';

export interface PageData {
    active: boolean,
    link: string
}