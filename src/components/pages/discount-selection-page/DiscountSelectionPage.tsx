import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../organisms/header/Header';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';
import { DiscountState, loadSimpleDiscounts } from '../../../store/discounts/discounts.slice';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';
import './DiscountSelectionPage.scss';
import DiscountListingSection from '../../organisms/discount-listing-section/DiscountListingSection';

function DiscountSelectionPage() {

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
        <DiscountListingSection key={'discount-listing-section'}/>
      ]}/>
    )
}
  
export default DiscountSelectionPage;