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
        link: ''
    },
    'API Docs': {
        active: false,
        link: ''
    }
}

export const pageSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<Page>) => {
        Object.keys(state).forEach(key => {
            const page: Page = key as Page;
            const pageData: PageData = state[page];
            pageData.active = page === action.payload;
        });
    }
  }
});

export const { setActivePage } = pageSlice.actions;
export default pageSlice;