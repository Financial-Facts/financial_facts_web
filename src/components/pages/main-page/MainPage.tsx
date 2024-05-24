import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import About from '../../atoms/about/About';
import FactsLinkSection from '../../atoms/facts-link-section/FactsLinkSection';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import Header from '../../organisms/header/Header';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';
import loadDiscounts from '../../../hooks/loadDiscounts';
import { resetFilteredDiscounts } from '../../../store/discounts/discounts.slice';


function MainPage() {

    const dispatch = useDispatch<AppDispatch>();
    loadDiscounts();

    useEffect(() => {
      dispatch(setActivePage('Main'));
      dispatch(resetFilteredDiscounts());
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