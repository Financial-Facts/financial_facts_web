import './DiscountListingSection.scss';
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import { DiscountState, HideValuationPrices, filterDiscounts } from '../../../store/discounts/discounts.slice'
import DiscountTable from '../../molecules/discount-table/DiscountTable'
import MultiFunctionSideNav from '../../molecules/multi-function-side-nav/MultiFunctionSideNav';
import { Option } from '../../atoms/multi-select/MultiSelect';
import { cleanKey } from '../../../utilities';
import { useEffect, useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { Bounds } from '../../atoms/price-range/PriceRange';
import { MobileState } from '../../../store/mobile/mobile.slice';
import { AppDispatch } from '../../../store/store';
import { getExtreme } from './DiscountListingSection.utils';
import { SideNavItem } from '../../molecules/multi-function-side-nav/MultiFunctionSideNav.typings';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';


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
    const { allDiscounts, filteredDiscounts, loading, filteredFilter } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const absoluteMinimumPrice = useMemo(() => getExtreme(allDiscounts, 'MIN'), [ allDiscounts ]);
    const absoluteMaximumPrice = useMemo(() => getExtreme(allDiscounts, 'MAX'), [ allDiscounts ]);
    const [ selectedTableKeys, setSelectedTableKeys ] = useState<MultiValue<Option<keyof SimpleDiscount>>>(defaultSelectedKeys);
    const [ hideValuesAbove, setHideValuesAbove ] = useState<HideValuationPrices>(filteredFilter.hideValuesAbove);
    const [ keyword, setKeyword ] = useState<string>(filteredFilter.keyword);
    const [ priceBounds, setPriceBounds ] = useState<Bounds>(filteredFilter.priceBounds);

    const tableFieldOptions = useMemo((): Option<keyof SimpleDiscount>[] =>
        keyOptions.map(key => ({
            value: key,
            label: cleanKey(key),
            color: '#8C19D3'
        }))
    , [ allDiscounts ]);

    const sideNavItems: SideNavItem<keyof SimpleDiscount>[] = useMemo(() => [{
       type: 'TOGGLE_GROUP',
       label: 'Hide discounts priced above...',
       toggles: [{
            type: 'TOGGLE',
            label: 'Sticker Price',
            defaultSelected: String(hideValuesAbove.stickerPrice),
            options: [{
                id: 'true',
                input: 'true'
            }, {
                id: 'false',
                input: 'false'
            }],
            selectionSetter: (val) => setHideValuesAbove(current => ({
                ...current,
                stickerPrice: 'true' === val
            }))
        }, {
            type: 'TOGGLE',
            label: 'DCF Price',
            defaultSelected: String(hideValuesAbove.discountedCashFlowPrice),
            options: [{
                id: 'true',
                input: 'true'
            }, {
                id: 'false',
                input: 'false'
            }],
            selectionSetter: (val) => setHideValuesAbove(current => ({
                ...current,
                discountedCashFlowPrice: 'true' === val
            }))
        }, {
            type: 'TOGGLE',
            label: 'BR Price',
            defaultSelected: String(hideValuesAbove.benchmarkRatioPrice),
            options: [{
                id: 'true',
                input: 'true'
            }, {
                id: 'false',
                input: 'false'
            }],
            selectionSetter: (val) => setHideValuesAbove(current => ({
                ...current,
                benchmarkRatioPrice: 'true' === val
            }))
        }]
    }, {
        type: 'SEARCH',
        label: 'Keyword Search',
        defaultValue: keyword,
        keywordSetter: setKeyword
    }, {
        type: 'PRICE_RANGE',
        label: 'Market Price Range',
        boundSetter: setPriceBounds,
        minimum: absoluteMinimumPrice,
        maximum: absoluteMaximumPrice,
        defaultValues: [
            priceBounds.lowerBound || absoluteMinimumPrice,
            priceBounds.upperBound || absoluteMaximumPrice
        ]
    }, {
        type: 'MULTI_SELECT',
        label: 'Display Fields',
        options: tableFieldOptions,
        defaultSelected: Array.from(defaultSelectedKeys),
        selectionSetter: (selection) => {
            const sortedSelections = Array.from(selection).sort((a, b) => 
                keyOptions.indexOf(a.value) - keyOptions.indexOf(b.value))
            setSelectedTableKeys(sortedSelections);
        }
    }], [ loading ]);
               
    useEffect(() => {
        dispatch(filterDiscounts({
            hideValuesAbove: hideValuesAbove,
            keyword: keyword,
            priceBounds: priceBounds
        }));
    }, [ hideValuesAbove, keyword, priceBounds ]);

    return (
        <section className={`discount-listing-section`}>
            { loading ? (
                <LoadingSpinner size='LARGE' color='PURPLE'/>
            ) : 
                <>
                    <MultiFunctionSideNav
                        items={sideNavItems}
                        label='Discount Filters'
                        orientation={ mobile.mobile ? 'horizontal' : 'vertical'}/>
                    <DiscountTable
                        discounts={filteredDiscounts}
                        fieldOptions={selectedTableKeys}/>
                </>
            }
        </section>
    )
}
  
export default DiscountListingSection;