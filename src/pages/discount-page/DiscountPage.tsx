import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import Header from '../../organisms/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { DiscountState, loadSimpleDiscounts } from '../../state/discounts/discounts.slice';
import { AppDispatch } from '../../state/store';
import { setActivePage } from '../../state/page/page.slice';
import PageLayout from '../../template/page-layout/page-layout';
import DiscountDataDisplaySection from '../../organisms/discount-data-display-section/DiscountDataDisplaySection';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import fetchDiscount from '../../hooks/fetchDiscount';


function DiscountPage() {

    const { cik } = useParams();
    const { discount, loading, error } = fetchDiscount(cik);
    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);
    // const loading = useSelector< { discounts: DiscountState }, boolean>((state) => state.discounts.loading);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(setActivePage('Discount'));
        // See if simple discount list needs to be loaded
        if (!discounts || discounts.length === 0) {
          dispatch(loadSimpleDiscounts());
        }
    }, []);

    return (
      <PageLayout sections={[
        <Header key={'discounts-header'} text='Discounts' subtext='Company valuations and related data'/>,
        <DiscountDisplaySection simplify={true} key='discount-display-section'/>,
        !loading && !error && !!discount ?
            <DiscountDataDisplaySection key={'discount-data-section'} discount={discount}/> :
            undefined
      ]}/>
    )
}
  
export default DiscountPage