import './MainPage.scss'
import Header from '../../sections/header/Header'
import About from '../../sections/about/About'
import { useEffect, useState } from 'react'
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import DiscountDisplaySection from '../../sections/discounts-display-section/DiscountDisplaySection';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import { catchError } from 'rxjs/internal/operators/catchError';
import FactsLinkSection from '../../sections/facts-link-section/FactsLinkSection';
import Footer from '../../sections/footer/Footer';
import ContactSection from '../../sections/contact-section/ContactSection';


function MainPage() {
    const [discounts, setDiscounts] = useState([] as SimpleDiscount[]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      setLoading(true);
      BulkEntitiesService.fetchBulkIdentitiesAndDiscounts({
          startIndex: 0,
          limit: 100,
          sortBy: 'CIK',
          order: 'ASC'
        })
        .pipe(catchError(err => {
          setLoading(false);
          throw err;
        }))
        .subscribe(bulkEntityResponse => {
          if (bulkEntityResponse.discounts) {
            setDiscounts(bulkEntityResponse.discounts);
          }
          setLoading(false);
        });
    };

    return (
      <div className='main-page'>
        <Header text="Financial Facts" subtext="Your Gateway to Undervalued Stocks!"></Header>
        <About></About>
        <DiscountDisplaySection
          discounts={ discounts }
          loading={ loading }>
        </DiscountDisplaySection>
        <FactsLinkSection></FactsLinkSection>
        <ContactSection></ContactSection>
        <Footer></Footer>
      </div>
    )
}
  
export default MainPage