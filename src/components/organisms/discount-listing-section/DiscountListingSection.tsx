import './DiscountListingSection.scss';
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import { DiscountState, resetFilteredDiscounts, sortDiscounts, updateFilterHideValuationPrices, updateFilterKeyword, updateFilterPriceBounds } from '../../../store/discounts/discounts.slice'
import DiscountTable from '../../molecules/discount-table/DiscountTable'
import MultiFunctionSideNav from '../../molecules/multi-function-side-nav/MultiFunctionSideNav';
import { Option } from '../../atoms/multi-select/MultiSelect';
import { cleanKey } from '../../../utilities';
import { useEffect, useMemo, useState } from 'react';
import { MobileState } from '../../../store/mobile/mobile.slice';
import { AppDispatch } from '../../../store/store';
import { getExtreme } from './DiscountListingSection.utils';
import { KeywordSearch, MultiSelect, PriceRange, ToggleGroup } from '../../molecules/multi-function-side-nav/MultiFunctionSideNav.typings';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';

type TrueOrFalse = 'true' | 'false';

const defaultSelectedKeys: Option<keyof SimpleDiscount>[] = [
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
    'averageVolume'
];

function DiscountListingSection() {

    const dispatch = useDispatch<AppDispatch>();
    const { allDiscounts, filteredDiscounts, loading, filteredFilter, filteredSort } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const absoluteMinimumPrice = useMemo(() => getExtreme(allDiscounts, 'MIN'), [ allDiscounts ]);
    const absoluteMaximumPrice = useMemo(() => getExtreme(allDiscounts, 'MAX'), [ allDiscounts ]);
    const [ selectedTableKeys, setSelectedTableKeys ] = useState<Option<keyof SimpleDiscount>[]>([...defaultSelectedKeys]);

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
            setSelectedTableKeys(selectedTableKeys);
        }
    }), [ tableFieldOptions, selectedTableKeys, filteredSort ]);
              
    const resetFilter = (): void => {
        dispatch(resetFilteredDiscounts());
        setSelectedTableKeys([...defaultSelectedKeys]);
        dispatch(sortDiscounts({
            sortBy: defaultSelectedKeys[0].id,
            sortOrder: 'ASC'
        }));
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