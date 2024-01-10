import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BulkDiscountsWrapper, SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings'
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';

export type DiscountState = BulkDiscountsWrapper & {
  loading: boolean
}

export const loadSimpleDiscounts = createAsyncThunk('discounts/load', 
  async () => 
    BulkEntitiesService.fetchBulkDiscounts()
      .then(response => {
        if (!response.discounts) {
          throw new Error(`Error occurred while collecting simple discounts`);
        }
        return response.discounts;
      }));

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState: {
    discounts: [] as SimpleDiscount[],
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