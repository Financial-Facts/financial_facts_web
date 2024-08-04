import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Order, SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings'
import { supabaseService } from '../../services/supabase/supabase.service';
import { Bounds } from '../../components/atoms/price-range/PriceRange';
import { CONSTANTS } from '../../constants/constants';
import { getExtreme } from '../../components/organisms/discount-listing-section/DiscountListingSection.utils';
import { getSortFunction, filterDiscountState } from './discounts.utils';
import { Option } from '../../components/atoms/multi-select/MultiSelect';
import { cleanKey } from '../../utilities';

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
    selectedTableKeys: Option<keyof SimpleDiscount>[]
}

export interface DiscountSort {
    sortBy: keyof SimpleDiscount
    sortOrder: Order
}

export interface DiscountFilter {
    hideValuesAbove: HideValuationPrices
    keyword: string
    priceBounds: Bounds
    showExpired: boolean
}

const defaultSelectedTableKeys: Option<keyof SimpleDiscount>[]= [
    {
        id: 'name',
        name: cleanKey('name')
    }, {
        id: 'stickerPrice',
        name: cleanKey('stickerPrice')
    }, {
        id: 'discountedCashFlowPrice',
        name: cleanKey('discountedCashFlowPrice')
    }, {
        id: 'benchmarkRatioPrice',
        name: cleanKey('benchmarkRatioPrice')
    }, {
        id: 'marketPrice',
        name: cleanKey('marketPrice')
    }
];

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
            },
            showExpired: false
        },
        selectedTableKeys: [...defaultSelectedTableKeys],
        loading: false
    } as DiscountState,
    reducers: {
        sortDiscounts: (state, action: PayloadAction<DiscountSort>) => {
            const { sortBy, sortOrder } = action.payload;
            state.filteredSort = action.payload;
            state.filteredDiscounts.sort(getSortFunction(sortBy, sortOrder));
        },
        updateFilterPriceBounds: (state, action: PayloadAction<Bounds>) => {
            state.filteredFilter.priceBounds = action.payload;
            state.filteredDiscounts = filterDiscountState([...state.allDiscounts], state.filteredFilter);
            state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy, state.filteredSort.sortOrder));
        },
        updateFilterHideValuationPrices: (state, action: PayloadAction<{
            key: keyof HideValuationPrices,
            value: boolean
        }>) => {
            const { key, value } = action.payload;
            state.filteredFilter.hideValuesAbove[key] = value;
            state.filteredDiscounts = filterDiscountState([...state.allDiscounts], state.filteredFilter);
            state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy, state.filteredSort.sortOrder));
        },
        updateFilterKeyword: (state, action: PayloadAction<string>) => {
            state.filteredFilter.keyword = action.payload;
            state.filteredDiscounts = filterDiscountState([...state.allDiscounts], state.filteredFilter);
            state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy, state.filteredSort.sortOrder));
        },
        updateFilterShowExpired: (state, action: PayloadAction<boolean>) => {
            state.filteredFilter.showExpired = action.payload;
            state.filteredDiscounts = filterDiscountState([...state.allDiscounts], state.filteredFilter);
            state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy, state.filteredSort.sortOrder));
        },
        setSelectedTableKeys: (state, action: PayloadAction<Option<keyof SimpleDiscount>[]>) => {
            state.selectedTableKeys = action.payload;
        },
        resetFilteredDiscounts: (state) => {
            state.selectedTableKeys = [...defaultSelectedTableKeys];
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
                },
                showExpired: false
            };
            state.filteredSort = {
                sortBy: defaultSelectedTableKeys[0].id,
                sortOrder: 'ASC'
            };
            state.filteredDiscounts = filterDiscountState([...state.allDiscounts], state.filteredFilter);
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
                state.filteredDiscounts = filterDiscountState([...state.allDiscounts], state.filteredFilter);
                state.filteredDiscounts.sort(getSortFunction(state.filteredSort.sortBy, state.filteredSort.sortOrder));
            }
            state.loading = false;
          });
    }
});

export const { 
    sortDiscounts,
    updateFilterPriceBounds,
    updateFilterHideValuationPrices,
    updateFilterKeyword,
    resetFilteredDiscounts,
    setSelectedTableKeys,
    updateFilterShowExpired
} = discountsSlice.actions;

export default discountsSlice;