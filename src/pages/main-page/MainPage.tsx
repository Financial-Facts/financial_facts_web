import './MainPage.scss'
import Header from '../../sections/header/Header'
import About from '../../sections/about/About'
import { useEffect } from 'react'
import DiscountDisplaySection from '../../sections/discounts-display-section/DiscountDisplaySection';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import FactsLinkSection from '../../sections/facts-link-section/FactsLinkSection';
import Footer from '../../sections/footer/Footer';
import ContactSection from '../../sections/contact-section/ContactSection';
import { useDispatch, useSelector } from 'react-redux';
import { DiscountState, loadSimpleDiscounts } from '../../state/discounts/discounts.slice';
import { AppDispatch } from '../../state/store';
import { setActivePage } from '../../state/page/page.slice';


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
      <main className='main-page'>
        <Header text="Financial Facts" subtext="Your Gateway to Undervalued Stocks!"></Header>
        <About></About>
        <DiscountDisplaySection></DiscountDisplaySection>
        <FactsLinkSection></FactsLinkSection>
        <ContactSection></ContactSection>
        <Footer></Footer>
      </main>
    )
}
  
export default MainPage