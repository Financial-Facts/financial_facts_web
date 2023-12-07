import './MainPage.scss'
import Header from '../../components/header/Header'
import About from '../../components/about/About'
import { useEffect, useState } from 'react'
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import DiscountDisplaySection from '../../components/discounts-display-section/DiscountDisplaySection';
import { Identity, SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';


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
      }).then(bulkEntityResponse => {
        setIdentities(bulkEntityResponse.identities);
        setDiscounts(bulkEntityResponse.discounts);
        setLoading(false);
      });
    };

    return (
      <>
        <Header></Header>
        <About></About>
        { loading ? (
          <>
            <LoadingSpinner></LoadingSpinner>
          </>
        ) : (
          <div className='main-page'>
            <DiscountDisplaySection discounts={ discounts }></DiscountDisplaySection>
          </div>
        )}
      </>
    )
}
  
export default MainPage