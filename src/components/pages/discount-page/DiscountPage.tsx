import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DiscountDataDisplaySection from '../../organisms/discount-data-display-section/DiscountDataDisplaySection';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import Header from '../../organisms/header/Header';
import fetchDiscount from '../../../hooks/fetchDiscount';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';
import { DiscountState, loadSimpleDiscounts } from '../../../store/discounts/discounts.slice';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';


function DiscountPage() {

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