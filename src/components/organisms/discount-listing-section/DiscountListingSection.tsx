import './DiscountListingSection.scss';
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import { DiscountState, filterDiscounts } from '../../../store/discounts/discounts.slice'
import DiscountTable from '../../molecules/discount-table/DiscountTable'
import MultiFunctionSideNav from '../../molecules/multi-function-side-nav/MultiFunctionSideNav';
import { Option } from '../../atoms/multi-select/MultiSelect';
import { cleanKey } from '../../../utilities';
import { useEffect, useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { CONSTANTS } from '../../../constants/constants';
import { Bounds } from '../../atoms/price-range/PriceRange';
import { MobileState } from '../../../store/mobile/mobile.slice';
import { AppDispatch } from '../../../store/store';
import { getExtreme } from './DiscountListingSection.utils';
import { SideNavItem } from '../../molecules/multi-function-side-nav/MultiFunctionSideNav.typings';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';

export interface DiscountOption extends Option {
    value: keyof SimpleDiscount,
    label: string
}

const defaultSelectedKeys: MultiValue<DiscountOption> = [
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

function DiscountListingSection() {

    const dispatch = useDispatch<AppDispatch>();
    const { allDiscounts, filteredDiscounts, loading } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const absoluteMinimumPrice = useMemo(() => getExtreme(allDiscounts, 'MIN'), [ allDiscounts ]);
    const absoluteMaximumPrice = useMemo(() => getExtreme(allDiscounts, 'MAX'), [ allDiscounts ]);
    const [ selectedTableKeys, setSelectedTableKeys ] = useState<MultiValue<Option>>(defaultSelectedKeys);
    const [ hideInactive, setHideInactive ] = useState<boolean>(false);
    const [ keyword, setKeyword ] = useState<string>(CONSTANTS.EMPTY);
    const [ priceBounds, setPriceBounds ] = useState<Bounds>({
        lowerBound: absoluteMinimumPrice,
        upperBound: absoluteMaximumPrice
    });

    const tableFieldOptions = useMemo((): Option[] =>
        filteredDiscounts.length > 0 ? 
            Object
                .keys(filteredDiscounts[0])
                .map(key => ({
                  value: key,
                  label: cleanKey(key),
                  color: '#8C19D3'
                })) : []
            , [ filteredDiscounts ]);

    const sideNavItems: SideNavItem[] = useMemo(() => [{
        type: 'TOGGLE',
        label: 'Hide Inactive',
        defaultSelected: 'false',
        options: [{
            id: 'true',
            input: 'true'
        }, {
            id: 'false',
            input: 'false'
        }],
        selectionSetter: (val) => setHideInactive(val === 'true')
    }, {
        type: 'SEARCH',
        label: 'Keyword Search',
        keywordSetter: setKeyword
    }, {
        type: 'PRICE_RANGE',
        label: 'Market Price Range',
        boundSetter: setPriceBounds,
        minimum: absoluteMinimumPrice,
        maximum: absoluteMaximumPrice
    }, {
        type: 'MULTI_SELECT',
        label: 'Display Fields',
        options: tableFieldOptions,
        defaultSelected: Array.from(defaultSelectedKeys),
        selectionSetter: setSelectedTableKeys
    }], [ loading ]);
               
    useEffect(() => {
        dispatch(filterDiscounts({
            hideInactive: hideInactive,
            keyword: keyword,
            priceBounds: priceBounds
        }));
    }, [ hideInactive, keyword, priceBounds ]);

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