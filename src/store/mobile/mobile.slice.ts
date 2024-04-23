import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const mobileSlice = createSlice({
  name: 'mobile',
  initialState: false,
  reducers: {
    setMobile: (_, action: PayloadAction<boolean>) => {
        return action.payload;
    }
  }
});

export const { setMobile } = mobileSlice.actions;
export default mobileSlice;