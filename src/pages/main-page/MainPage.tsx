import './MainPage.scss'
import Header from '../../components/header/Header'
import About from '../../components/about/About'
import { useEffect, useState } from 'react'
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import DiscountDisplaySection from '../../components/discounts-display-section/DiscountDisplaySection';
import { Identity, SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import { catchError } from 'rxjs/internal/operators/catchError';
import FactsLinkSection from '../../components/facts-link-section/FactsLinkSection';


function MainPage() {
    const [discounts, setDiscounts] = useState([] as SimpleDiscount[]);
    const [identities, setIdentities] = useState([] as Identity[]);
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
          setIdentities(bulkEntityResponse.identities);
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
      </div>
    )
}
  
export default MainPage