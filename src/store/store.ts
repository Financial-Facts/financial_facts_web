import { configureStore } from '@reduxjs/toolkit';
import discountsSlice from './discounts/discounts.slice';
import pageSlice from './page/page.slice';
import mobileSlice from './mobile/mobile.slice';

export const store = configureStore({
  reducer: {
    discounts: discountsSlice.reducer,
    page: pageSlice.reducer,
    mobile: mobileSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch