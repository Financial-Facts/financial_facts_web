import Header from '../../organisms/header/Header';
import PageLayout from '../../templates/page-layout/page-layout';
import './DiscountSelectionPage.scss';
import DiscountListingSection from '../../organisms/discount-listing-section/DiscountListingSection';
import loadDiscounts from '../../../hooks/loadDiscounts';

function DiscountSelectionPage() {

    loadDiscounts();

    return (
      <PageLayout sections={[
        <Header key={'discounts-header'} text='Discounts' subtext='Company valuations and related data'/>,
        <DiscountListingSection key={'discount-listing-section'}/>
      ]}/>
    )
}
  
export default DiscountSelectionPage;