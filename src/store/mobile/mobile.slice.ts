import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MobileSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface MobileState {
  mobile: boolean
  size?: MobileSize
}

const initialState: MobileState = {
  mobile: false
}

export const mobileSlice = createSlice({
  name: 'mobile',
  initialState: initialState,
  reducers: {
    setMobile: (_, action: PayloadAction<MobileState>) => {
        return action.payload;
    }
  }
});

export const { setMobile } = mobileSlice.actions;
export default mobileSlice;