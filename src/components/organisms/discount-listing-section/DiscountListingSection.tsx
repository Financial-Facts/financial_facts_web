import './DiscountListingSection.scss';
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import { DiscountState, resetFilteredDiscounts, sortDiscounts, updateFilterHideValuationPrices, updateFilterKeyword, updateFilterPriceBounds } from '../../../store/discounts/discounts.slice'
import DiscountTable from '../../molecules/discount-table/DiscountTable'
import MultiFunctionSideNav from '../../molecules/multi-function-side-nav/MultiFunctionSideNav';
import { Option } from '../../atoms/multi-select/MultiSelect';
import { cleanKey } from '../../../utilities';
import { useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { MobileState } from '../../../store/mobile/mobile.slice';
import { AppDispatch } from '../../../store/store';
import { getExtreme } from './DiscountListingSection.utils';
import { KeywordSearch, MultiSelect, PriceRange, ToggleGroup } from '../../molecules/multi-function-side-nav/MultiFunctionSideNav.typings';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';

type TrueOrFalse = 'true' | 'false';

const defaultSelectedKeys: MultiValue<Option<keyof SimpleDiscount>> = [
    {
        value: 'name',
        label: cleanKey('name')
    }, {
        value: 'stickerPrice',
        label: cleanKey('stickerPrice')
    }, {
        value: 'discountedCashFlowPrice',
        label: cleanKey('discountedCashFlowPrice')
    }, {
        value: 'benchmarkRatioPrice',
        label: cleanKey('benchmarkRatioPrice')
    }, {
        value: 'marketPrice',
        label: cleanKey('marketPrice')
    }
];

const keyOptions: (keyof SimpleDiscount)[] = [
    'cik',
    'name',
    'symbol',
    'lastUpdated',
    'active',
    'stickerPrice',
    'discountedCashFlowPrice',
    'benchmarkRatioPrice',
    'marketPrice'
];

function DiscountListingSection() {

    const dispatch = useDispatch<AppDispatch>();
    const { allDiscounts, filteredDiscounts, loading, filteredFilter, filteredSort } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const absoluteMinimumPrice = useMemo(() => getExtreme(allDiscounts, 'MIN'), [ allDiscounts ]);
    const absoluteMaximumPrice = useMemo(() => getExtreme(allDiscounts, 'MAX'), [ allDiscounts ]);
    const [ selectedTableKeys, setSelectedTableKeys ] = useState<MultiValue<Option<keyof SimpleDiscount>>>([...defaultSelectedKeys]);

    const tableFieldOptions = useMemo((): Option<keyof SimpleDiscount>[] =>
        keyOptions.map(key => ({
            value: key,
            label: cleanKey(key),
            color: '#8C19D3'
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
            filteredFilter.priceBounds.lowerBound || absoluteMinimumPrice,
            filteredFilter.priceBounds.upperBound || absoluteMaximumPrice
        ]
    }), [ filteredFilter.priceBounds, absoluteMinimumPrice, absoluteMaximumPrice ]);

    const multiSelectConfig: MultiSelect<keyof SimpleDiscount> = useMemo(() => ({
        type: 'MULTI_SELECT',
        label: 'Display Fields',
        options: tableFieldOptions,
        value: selectedTableKeys,
        selectionSetter: (selection) => {
            let selectedTableKeys: Option<keyof SimpleDiscount>[] = [];
            if (selection.length > 0) {
                const sortedSelections = Array.from(selection).sort((a, b) => 
                    keyOptions.indexOf(a.value) - keyOptions.indexOf(b.value));
                if (!sortedSelections.some(option => option.value === filteredSort.sortBy)) {
                    dispatch(sortDiscounts({
                        sortBy: sortedSelections[0].value,
                        sortOrder: 'ASC'
                    }));
                }
                selectedTableKeys = sortedSelections;
            }
            setSelectedTableKeys(selectedTableKeys);
        }
    }), [ tableFieldOptions, selectedTableKeys, filteredSort ]);
              
    const resetFilter = (): void => {
        dispatch(resetFilteredDiscounts());
        setSelectedTableKeys([...defaultSelectedKeys]);
    }

    return (
        <section className={`discount-listing-section`}>
            { loading ? (
                <LoadingSpinner size='LARGE' color='PURPLE'/>
            ) : 
                <>
                   <MultiFunctionSideNav
                        items={[
                            toggleGroupConfig, 
                            keywordSearchConfig,
                            priceBoundsSliderConfig,
                            multiSelectConfig
                        ]}
                        label='Discount Filters'
                        orientation={ mobile.mobile ? 'horizontal' : 'vertical'}
                        labelButtonOnClick={resetFilter}/>
                    <DiscountTable
                        discounts={filteredDiscounts}
                        fieldOptions={selectedTableKeys}/>
                </>
            }
        </section>
    )
}
  
export default DiscountListingSection;