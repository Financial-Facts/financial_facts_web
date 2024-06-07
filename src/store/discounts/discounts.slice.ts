import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Order, SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings'
import { supabaseService } from '../../services/supabase/supabase.service';
import { Bounds } from '../../components/atoms/price-range/PriceRange';
import { CONSTANTS } from '../../constants/constants';
import { getExtreme } from '../../components/organisms/discount-listing-section/DiscountListingSection.utils';

export interface HideValuationPrices {
  stickerPrice: boolean,
  discountedCashFlowPrice: boolean,
  benchmarkRatioPrice: boolean
}

export type DiscountState = {
  allDiscounts: SimpleDiscount[]
  filteredDiscounts: SimpleDiscount[]
  filteredSort: DiscountSort
  filteredFilter: DiscountFilter
  loading: boolean
}

export interface DiscountSort {
  sortBy: keyof SimpleDiscount
  sortOrder: Order
}

export interface DiscountFilter {
  hideValuesAbove: HideValuationPrices
  keyword: string
  priceBounds: Bounds
}

const compare = (a: string | number | boolean, b: string | number | boolean, sortOrder: Order) => 
  sortOrder === 'ASC' ? 
      a > b ? 1 : -1 :
      a < b ? 1 : -1;

const getSortFunction = (
  sortByKey: keyof SimpleDiscount,
  sortOrder: Order
): (a: SimpleDiscount, b: SimpleDiscount) => number => {
  switch(sortByKey) {
      case 'lastUpdated': {
          return (a, b) => compare(new Date(a.lastUpdated).valueOf(), new Date(b.lastUpdated).valueOf(), sortOrder);
      }
      default: {
          return (a, b) => compare(a[sortByKey], b[sortByKey], sortOrder);
      }
  }
}

const filterForValuation = (
  discounts: SimpleDiscount[],
  valuationKey: 'stickerPrice' | 'discountedCashFlowPrice' | 'benchmarkRatioPrice'
): SimpleDiscount[] =>
    discounts.filter(discount => discount.marketPrice < discount[valuationKey]);

const filterDiscountState = (discounts: SimpleDiscount[], filter: DiscountFilter) => {
  if (filter.hideValuesAbove.benchmarkRatioPrice) {
    discounts = filterForValuation(discounts, 'benchmarkRatioPrice');
  }

  if (filter.hideValuesAbove.discountedCashFlowPrice) {
    discounts = filterForValuation(discounts, 'discountedCashFlowPrice');
  }

  if (filter.hideValuesAbove.stickerPrice) {
    discounts = filterForValuation(discounts, 'stickerPrice');
  }

  if (!!filter.keyword) {
    discounts = discounts.filter(discount => {
      const lowerKeyword = filter.keyword.toLowerCase();
          return discount.cik.toLowerCase().includes(lowerKeyword) ||
              discount.symbol.toLowerCase().includes(lowerKeyword) || 
              discount.name.toLowerCase().includes(lowerKeyword);
    });
  }

  if (filter.priceBounds.lowerBound !== 0 && filter.priceBounds.upperBound !== 0) {
    discounts = discounts.filter(discount =>
      discount.marketPrice >= filter.priceBounds.lowerBound &&
      discount.marketPrice <= filter.priceBounds.upperBound);
  }

  return discounts;
}

export const loadSimpleDiscounts = createAsyncThunk('discounts/load', 
  async () => supabaseService.getSimpleDiscounts());

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState: {
    allDiscounts: [],
    filteredDiscounts: [],
    filteredSort: {
      sortBy: 'name',
      sortOrder: 'ASC'
    },
    filteredFilter: {
      hideValuesAbove: {
        stickerPrice: false,
        discountedCashFlowPrice: false,
        benchmarkRatioPrice: false
      },
      keyword: CONSTANTS.EMPTY,
      priceBounds: {
        lowerBound: 0,
        upperBound: 0
      }
    },
    loading: false
  } as DiscountState,
  reducers: {
    sortDiscounts: (state, action: PayloadAction<DiscountSort>) => {
      const { sortBy, sortOrder } = action.payload;
      state.filteredSort = action.payload;
      state.filteredDiscounts.sort(getSortFunction(sortBy, sortOrder));
    },
    filterDiscounts: (state, action: PayloadAction<DiscountFilter>) => {
      state.filteredFilter = action.payload;
      state.filteredDiscounts = filterDiscountState([...state.allDiscounts], action.payload);
      state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy, state.filteredSort.sortOrder));
    },
    resetFilteredDiscounts: (state) => {
      state.filteredDiscounts = [...state.allDiscounts];
      state.filteredFilter = {
        hideValuesAbove: {
          benchmarkRatioPrice: false,
          discountedCashFlowPrice: false,
          stickerPrice: false
        },
        keyword: CONSTANTS.EMPTY,
        priceBounds: {
          lowerBound: getExtreme(state.allDiscounts, 'MIN'),
          upperBound: getExtreme(state.allDiscounts, 'MAX')
        }
      }
      state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy,  state.filteredSort.sortOrder));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadSimpleDiscounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadSimpleDiscounts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loadSimpleDiscounts.fulfilled, (state, action) => {
      if (state.allDiscounts.length === 0) {
        state.allDiscounts = action.payload.sort(getSortFunction('lastUpdated', 'DESC'));
        state.filteredDiscounts = [...state.allDiscounts];
      }
      state.loading = false;
    });
  }
});

export const { sortDiscounts, filterDiscounts, resetFilteredDiscounts } = discountsSlice.actions;
export default discountsSlice;