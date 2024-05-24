import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../organisms/header/Header';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';
import './DiscountSelectionPage.scss';
import DiscountListingSection from '../../organisms/discount-listing-section/DiscountListingSection';
import loadDiscounts from '../../../hooks/loadDiscounts';

function DiscountSelectionPage() {

    loadDiscounts();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(setActivePage('Discount'));
    }, []);

    return (
      <PageLayout sections={[
        <Header key={'discounts-header'} text='Discounts' subtext='Company valuations and related data'/>,
        <DiscountListingSection key={'discount-listing-section'}/>
      ]}/>
    )
}
  
export default DiscountSelectionPage;