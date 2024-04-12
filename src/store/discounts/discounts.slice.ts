import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BulkDiscountsWrapper } from '../../services/bulk-entities/bulk-entities.typings'
import { supabaseService } from '../../services/supabase/supabase.service';

export type DiscountState = BulkDiscountsWrapper & {
  loading: boolean
}

export const loadSimpleDiscounts = createAsyncThunk('discounts/load', 
  async () => supabaseService.getSimpleDiscounts());

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState: {
    discounts: [],
    loading: false
  } as DiscountState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadSimpleDiscounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadSimpleDiscounts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loadSimpleDiscounts.fulfilled, (state, action) => {
      state.loading = false;
      state.discounts = action.payload;
    });
  }
});

export default discountsSlice;