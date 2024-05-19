import './DiscountListingSection.scss';
import { useSelector } from 'react-redux'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings'
import { DiscountState } from '../../../store/discounts/discounts.slice'
import DiscountTable from '../../molecules/discount-table/DiscountTable'
import MultiFunctionSideNav from '../../molecules/multi-function-side-nav/MultiFunctionSideNav';
import { Option } from '../../atoms/multi-select/MultiSelect';
import { cleanKey } from '../../../utilities';
import { useEffect, useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { CONSTANTS } from '../../../constants/constants';
import { SideNavItem } from '../../molecules/multi-function-side-nav/MultiFunctionSideNav.typings';
import { Bounds } from '../../atoms/price-range/PriceRange';
import { MobileState } from '../../../store/mobile/mobile.slice';


function DiscountListingSection() {

    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);
    const loading = useSelector< { discounts: DiscountState }, boolean>((state) => state.discounts.loading);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);

    const minimumPrice = useMemo(() =>  
        discounts.length > 0 ?
        discounts.reduce<number>((min, discount) => {
            if (discount.marketPrice < min) {
                return discount.marketPrice;
            }
            return min;
        }, discounts[0].marketPrice) :
        0
    , [ discounts ]);

    const maximumPrice = useMemo(() =>  
        discounts.length > 0 ?
        discounts.reduce<number>((max, discount) => {
            if (discount.marketPrice > max) {
                return discount.marketPrice;
            }
            return max;
        }, discounts[0].marketPrice) :
        0
    , [ discounts ]);

    const [ sideNavItems, setSideNavItems ] = useState<SideNavItem[]>([]);
    const [ selectedTableKeys, setSelectedTableKeys ] = useState<MultiValue<Option>>([]);
    const [ hideInactive, setHideInactive ] = useState<boolean>(false);
    const [ keyword, setKeyword ] = useState<string>(CONSTANTS.EMPTY);
    const [ priceBounds, setPriceBounds ] = useState<Bounds>({
        lowerBound: minimumPrice,
        upperBound: maximumPrice
    });

    useEffect(() => {
        if (!loading && discounts.length > 0) {
            const defaultSelections = [
                tableFieldOptions[1],
                tableFieldOptions[5],
                ...tableFieldOptions.slice(-3)
            ];
            setSelectedTableKeys(defaultSelections)
            setSideNavItems([{
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
                minimum: minimumPrice,
                maximum: maximumPrice
            }, {
                type: 'MULTI_SELECT',
                label: 'Display Fields',
                options: tableFieldOptions,
                defaultSelected: defaultSelections,
                selectionSetter: setSelectedTableKeys
            }]);
        }
    }, [ loading ]);

    const tableFieldOptions = useMemo((): Option[] =>
        discounts.length > 0 ? 
            Object
                .keys(discounts[0])
                .map(key => ({
                  value: key,
                  label: cleanKey(key),
                  color: '#8C19D3'
                })) : []
            , [ discounts ]);

    const filteredDiscounts = useMemo((): SimpleDiscount[] => 
        discounts
            .filter(discount => {
                if (hideInactive && !discount.active) {
                    return false;
                }

                if (!!keyword) {
                    const lowerKeyword = keyword.toLowerCase();
                    return discount.cik.toLowerCase().includes(lowerKeyword) ||
                        discount.symbol.toLowerCase().includes(lowerKeyword) || 
                        discount.name.toLowerCase().includes(lowerKeyword);
                }

                if (priceBounds.lowerBound !== 0 && priceBounds.upperBound !== 0) {
                    return discount.marketPrice >= priceBounds.lowerBound &&
                        discount.marketPrice <= priceBounds.upperBound;
                }
                
                return true;
            }),
    [ discounts, hideInactive, keyword, priceBounds ]);
    
    return (
        <section className={`discount-listing-section`}>
            { loading ? (
                <LoadingSpinner size='LARGE' color='PURPLE'></LoadingSpinner>
            ) : 
                <>
                    <MultiFunctionSideNav items={sideNavItems} label='Discount Filters' orientation={ mobile.mobile ? 'horizontal' : 'vertical'}/>
                    <DiscountTable discounts={filteredDiscounts} fieldOptions={selectedTableKeys}/>
                </>
            }
        </section>
    )
}
  
export default DiscountListingSection;