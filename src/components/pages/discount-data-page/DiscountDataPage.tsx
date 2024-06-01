import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import DiscountDataDisplaySection from '../../organisms/discount-data-display-section/DiscountDataDisplaySection';
import Header from '../../organisms/header/Header';
import fetchDiscount from '../../../hooks/fetchDiscount';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';
import { DiscountState } from '../../../store/discounts/discounts.slice';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';
import { AdjacentNavigationState } from '../../atoms/adjacent-navigation-arrows/AdjacentNavigationArrows';
import loadDiscounts from '../../../hooks/loadDiscounts';


function DiscountDataPage() {

    loadDiscounts();
    const { cik } = useParams();
    const location = useLocation();
    const { discount, loading, error } = fetchDiscount(cik);
    const { allDiscounts, filteredDiscounts } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const dispatch = useDispatch<AppDispatch>();
    const [ adjacentDiscountState, setAdjacentDiscountState ] = useState<AdjacentNavigationState>({
        uri: '/discount',
        previousItem: undefined,
        nextItem: undefined
    });
    const [ useFilteredDiscounts, setUseFilteredDiscounts ] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setActivePage('Discount'));
        setUseFilteredDiscounts(!!location.state ? !!location.state.useFilteredDiscounts : false);
    }, []);

    const discountList = useMemo(() =>
        useFilteredDiscounts ? filteredDiscounts : allDiscounts
    , [ useFilteredDiscounts, allDiscounts, filteredDiscounts ]);

    useEffect(() => {
        if (!loading && discountList.length > 0) {
            const index = discountList.findIndex(val => val.cik === cik);
            if (index !== -1) {
                setAdjacentDiscountState(current => ({
                    ...current,
                    previousItem: index !== 0 ?
                        buildNavigationItem(discountList[index - 1]) :
                        undefined,
                    nextItem: index !== discountList.length - 1 ?
                        buildNavigationItem(discountList[index + 1]) :
                        undefined
                }));
            }
        }
    }, [ loading, discountList ]);

    const buildNavigationItem = (discount: SimpleDiscount) => ({
        id: discount.cik,
        label: discount.symbol
    });

    const header = useMemo(() => !!discount ? 
        <Header key={`${cik}-discounts-header`}
            text={discount.name}
            subtext={`${discount.symbol} - ${discount.cik}`}
            symbol={discount.symbol}
            size='MEDIUM'
            adjacentNavigationState={adjacentDiscountState}/> : 
        <Header key={'discounts-header'}
            text='Discounts'
            subtext='Company valuations and related data'/>
    , [ discount, adjacentDiscountState ]);

    return (
        <PageLayout sections={
            [
                header,
                <DiscountDataDisplaySection key={`${cik}-discount-data-section`}
                    discount={discount}
                    loading={loading}
                    error={error}/> 
            ]
        }/>
    )
}
  
export default DiscountDataPage;