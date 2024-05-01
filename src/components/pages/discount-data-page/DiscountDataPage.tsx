import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DiscountDataDisplaySection from '../../organisms/discount-data-display-section/DiscountDataDisplaySection';
import Header from '../../organisms/header/Header';
import fetchDiscount from '../../../hooks/fetchDiscount';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';
import { DiscountState, loadSimpleDiscounts } from '../../../store/discounts/discounts.slice';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import ZeroState from '../../atoms/zero-state/ZeroState';


function DiscountDataPage() {

    const { cik } = useParams();
    const { discount, loading, error } = fetchDiscount(cik);
    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(setActivePage('Discount'));
        // See if simple discount list needs to be loaded
        if (!discounts || discounts.length === 0) {
            dispatch(loadSimpleDiscounts());
        }
    }, []);

    return (
        <PageLayout sections={
            loading ? [
                <LoadingSpinner size={'LARGE'}
                    color={'PURPLE'}
                    key={`${cik}-loader`}/>
            ] :
            error ? [
                <ZeroState message={'Error'}
                    supportText={'An error occurred while collecting discount details'}
                    key={`${cik}-error`}/>
            ] :
            !!discount ? [
                <Header key={`${cik}-discounts-header`}
                    text={discount.name}
                    subtext={`${discount.symbol} - ${discount.cik}`}
                    symbol={discount.symbol}
                    size='MEDIUM'/>,
                <DiscountDataDisplaySection key={`${cik}-discount-data-section`} discount={discount}/> 
            ] : []
        }/>
    )
}
  
export default DiscountDataPage;