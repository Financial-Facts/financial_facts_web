import Header from '../../sections/header/Header'
import About from '../../sections/about/About'
import { useEffect } from 'react'
import DiscountDisplaySection from '../../sections/discounts-display-section/DiscountDisplaySection';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import FactsLinkSection from '../../sections/facts-link-section/FactsLinkSection';
import { useDispatch, useSelector } from 'react-redux';
import { DiscountState, loadSimpleDiscounts } from '../../state/discounts/discounts.slice';
import { AppDispatch } from '../../state/store';
import { setActivePage } from '../../state/page/page.slice';
import PageLayout from '../../components/PageLayout/page-layout';


function MainPage() {

    const dispatch = useDispatch<AppDispatch>();
    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);

    useEffect(() => {
      dispatch(setActivePage('Main'));
      if (!discounts || discounts.length === 0) {
        dispatch(loadSimpleDiscounts());
      }
    }, []);

    return (
      <PageLayout sections={[
        <Header key='header' text="Financial Facts" subtext="Your Gateway to Undervalued Stocks!"/>,
        <About key='about-section'/>,
        <DiscountDisplaySection key='discount-display-section'/>,
        <FactsLinkSection key='facts-link-section'/>
      ]}/>
    )
}
  
export default MainPage;