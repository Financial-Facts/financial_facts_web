import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Page, PageData, PageState } from './page.typings';

const initialState: PageState = {
    'Main': {
        active: true,
        link: '/'
    },
    'About': {
        active: false,
        link: ''
    },
    'Discount': {
        active: false,
        link: '/discount'
    },
    'Facts': {
        active: false,
        link: '/facts'
    },
    'API Docs': {
        active: false,
        link: '/api'
    }
}

export const pageSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<Page>) => {
        const pages = Object.keys(state) as Page[];
        pages.forEach(page => {
            const pageData: PageData = state[page];
            pageData.active = page === action.payload;
        });
    }
  }
});

export const { setActivePage } = pageSlice.actions;
export default pageSlice;