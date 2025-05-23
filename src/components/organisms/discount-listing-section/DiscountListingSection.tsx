import './DiscountListingSection.scss';
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import { DiscountState, resetFilteredDiscounts, setSelectedTableKeys, sortDiscounts, updateFilterHideValuationPrices, updateFilterKeyword, updateFilterPriceBounds, updateFilterShowExpired } from '../../../store/discounts/discounts.slice'
import DiscountTable from '../../molecules/discount-table/DiscountTable'
import MultiFunctionSideNav from '../../molecules/multi-function-side-nav/MultiFunctionSideNav';
import { Option } from '../../atoms/multi-select/MultiSelect';
import { cleanKey } from '../../../utilities';
import { useEffect, useMemo } from 'react';
import { MobileState } from '../../../store/mobile/mobile.slice';
import { AppDispatch } from '../../../store/store';
import { getExtreme } from './DiscountListingSection.utils';
import { KeywordSearch, MultiSelect, PriceRange, Toggle, ToggleGroup } from '../../molecules/multi-function-side-nav/MultiFunctionSideNav.typings';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';

type TrueOrFalse = 'true' | 'false';

const keyOptions: (keyof SimpleDiscount)[] = [
    'cik',
    'name',
    'symbol',
    'lastUpdated',
    'active',
    'stickerPrice',
    'discountedCashFlowPrice',
    'benchmarkRatioPrice',
    'marketPrice',
    'annualDividend',
    'averageVolume',
    'ttmInsiderPurchases',
    'discountFromStickerPrice'
];

function DiscountListingSection() {

    const dispatch = useDispatch<AppDispatch>();
    const {
        allDiscounts,
        filteredDiscounts,
        loading,
        filteredFilter,
        filteredSort,
        selectedTableKeys
    } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const absoluteMinimumPrice = useMemo(() => getExtreme(allDiscounts, 'MIN'), [ allDiscounts ]);
    const absoluteMaximumPrice = useMemo(() => getExtreme(allDiscounts, 'MAX'), [ allDiscounts ]);

    useEffect(() => {
        if (selectedTableKeys.length > 0 && !selectedTableKeys.find(option => option.id === filteredSort.sortBy)) {
            dispatch(sortDiscounts({
                sortBy: selectedTableKeys[0].id,
                sortOrder: 'ASC'
            }));
        }
    }, []);

    const tableFieldOptions = useMemo((): Option<keyof SimpleDiscount>[] =>
        keyOptions.map(key => ({
            id: key,
            name: cleanKey(key)
        }))
    , [ allDiscounts ]);

    const toggleGroupConfig: ToggleGroup<TrueOrFalse> = useMemo(() => ({
        type: 'TOGGLE_GROUP',
        label: 'Hide discounts priced above...',
        toggles: [{
            type: 'TOGGLE',
            label: 'Sticker Price',
            selectedId: filteredFilter.hideValuesAbove.stickerPrice ? 'true' : 'false',
            options: [{
                id: 'true',
                label: 'true'
            }, {
                id: 'false',
                label: 'false'
            }],
            selectionSetter: (val) => dispatch(updateFilterHideValuationPrices({
                key: 'stickerPrice',
                value: val === 'true'
            }))
        }, {
            type: 'TOGGLE',
            label: 'DCF Price',
            selectedId: filteredFilter.hideValuesAbove.discountedCashFlowPrice ? 'true' : 'false',
            options: [{
                id: 'true',
                label: 'true'
            }, {
                id: 'false',
                label: 'false'
            }],
            selectionSetter: (val) => dispatch(updateFilterHideValuationPrices({
                key: 'discountedCashFlowPrice',
                value: val === 'true'
            }))
        }, {
            type: 'TOGGLE',
            label: 'BR Price',
            selectedId: filteredFilter.hideValuesAbove.benchmarkRatioPrice ? 'true' : 'false',
            options: [{
                id: 'true',
                label: 'true'
            }, {
                id: 'false',
                label: 'false'
            }],
            selectionSetter: (val) => dispatch(updateFilterHideValuationPrices({
                key: 'benchmarkRatioPrice',
                value: val === 'true'
            }))
        }]
    }), [ filteredFilter.hideValuesAbove ]);

    const deletedToggleConfig: Toggle<TrueOrFalse> = useMemo(() => ({
        type: 'TOGGLE',
        label: 'Show disqualified',
        selectedId: filteredFilter.showExpired ? 'true' : 'false',
        options: [
            {
                id: 'true',
                label: 'true'
            },
            {
                id: 'false',
                label: 'false'
            }
        ],
        selectionSetter: (value) => {
            dispatch(updateFilterShowExpired(value === 'false' ? false : true));
        },
        showToggleLabel: true
    }), [ filteredFilter.showExpired ]);

    const keywordSearchConfig: KeywordSearch = useMemo(() => ({
        type: 'SEARCH',
        label: 'Keyword Search',
        value: filteredFilter.keyword,
        keywordSetter: (val) => dispatch(updateFilterKeyword(val))
    }), [ filteredFilter.keyword ]);

    const priceBoundsSliderConfig: PriceRange = useMemo(() => ({
        type: 'PRICE_RANGE',
        label: 'Market Price Range',
        boundSetter: (bounds) => dispatch(updateFilterPriceBounds(bounds)),
        minimum: absoluteMinimumPrice,
        maximum: absoluteMaximumPrice,
        value: [
            filteredFilter.priceBounds.lowerBound,
            filteredFilter.priceBounds.upperBound
        ]
    }), [ filteredFilter.priceBounds, absoluteMinimumPrice, absoluteMaximumPrice ]);

    const multiSelectConfig: MultiSelect<keyof SimpleDiscount> = useMemo(() => ({
        type: 'MULTI_SELECT',
        label: 'Displayed Columns',
        options: tableFieldOptions,
        value: selectedTableKeys,
        selectionSetter: (selection) => {
            let selectedTableKeys: Option<keyof SimpleDiscount>[] = [];
            if (selection.length > 0) {
                const sortedSelections = selection.sort((a, b) => 
                    keyOptions.indexOf(a.id) - keyOptions.indexOf(b.id));
                if (!sortedSelections.some(option => option.id === filteredSort.sortBy)) {
                    dispatch(sortDiscounts({
                        sortBy: sortedSelections[0].id,
                        sortOrder: 'ASC'
                    }));
                }
                selectedTableKeys = sortedSelections;
            }
            dispatch(setSelectedTableKeys((selectedTableKeys)));
        }
    }), [ tableFieldOptions, selectedTableKeys, filteredSort ]);
              
    const resetFilter = (): void => {
        dispatch(resetFilteredDiscounts());
    }

    return (
        <section className={`discount-listing-section`}>
            { loading ? (
                <LoadingSpinner size='LARGE' color='PURPLE'/>
            ) : 
                <>
                   <MultiFunctionSideNav
                        items={[
                            keywordSearchConfig,
                            deletedToggleConfig,
                            toggleGroupConfig,
                            priceBoundsSliderConfig,
                            multiSelectConfig
                        ]}
                        label='Discount Filters'
                        orientation={ mobile.mobile ? 'horizontal' : 'vertical'}
                        bottomButtonOnClick={resetFilter}/>
                    <DiscountTable
                        discounts={filteredDiscounts}
                        fieldOptions={selectedTableKeys}/>
                </>
            }
        </section>
    )
}
  
export default DiscountListingSection;