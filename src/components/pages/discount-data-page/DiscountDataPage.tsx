import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import DiscountDataDisplaySection from '../../organisms/discount-data-display-section/DiscountDataDisplaySection';
import Header from '../../organisms/header/Header';
import fetchDiscount from '../../../hooks/fetchDiscount';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';
import { DiscountState } from '../../../store/discounts/discounts.slice';
import PageLayout from '../../templates/page-layout/page-layout';
import loadDiscounts from '../../../hooks/loadDiscounts';
import { AdjacentNavigationState } from '../../molecules/adjacent-navigation-arrows/AdjacentNavigationArrows';
import DiscountOverview from '../../molecules/discount-overview/DiscountOverview';
import DiscountProfile from '../../atoms/discount-profile/DiscountProfile';


function DiscountDataPage() {

    loadDiscounts();
    const { cik } = useParams();
    const location = useLocation();
    const { discount, loading, error } = fetchDiscount(cik);
    const { allDiscounts, filteredDiscounts } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    const useFilteredDiscounts = useMemo(() => !!location.state ? !!location.state.useFilteredDiscounts : false, []);

    const getAdjacentDiscountState = (): AdjacentNavigationState | undefined => {
        const discountList = useFilteredDiscounts ? filteredDiscounts : allDiscounts;
        const index = discountList.findIndex(val => val.cik === cik);
        const buildNavigationItem = (discount: SimpleDiscount) => ({
            id: discount.cik,
            label: discount.symbol
        });

        if (index !== -1) {
            return {
                uri: '/discount',
                previousItem: index !== 0 ?
                    buildNavigationItem(discountList[index - 1]) :
                    undefined,
                nextItem: index !== discountList.length - 1 ?
                    buildNavigationItem(discountList[index + 1]) :
                    undefined
            };
        }
    }
    
    const adjacentDiscountState = getAdjacentDiscountState();

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
                discount ? <DiscountOverview key={`${cik}-discount-overview`}
                    discount={discount}/> : undefined,
                discount ? <DiscountProfile key={`${cik}-discount-profile`}
                    discount={discount}/> : undefined,
                <DiscountDataDisplaySection key={`${cik}-discount-data-section`}
                    discount={discount}
                    loading={loading}
                    error={error}/> 
            ]
        }/>
    )
}
  
export default DiscountDataPage;