import { useParams } from 'react-router-dom';
import './DiscountPage.scss'
import DiscountDisplaySection from '../../components/discounts-display-section/DiscountDisplaySection';
import { useEffect, useState } from 'react';
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import { catchError } from 'rxjs';
import Header from '../../components/header/Header';


function DiscountPage() {

    const { cik } = useParams();
    const [ discounts, setDiscounts ] = useState([] as SimpleDiscount[]);
    const [ loading, setLoading ] = useState(false);
    
    useEffect(() => {
        fetchDiscounts();
      }, []);
    
    const fetchDiscounts = () => {
        setLoading(true);
        BulkEntitiesService
            .fetchBulkDiscounts()
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
      <div className='discount-page'>
        <Header text="Discounts" subtext={''}></Header>
        <DiscountDisplaySection discounts={discounts} loading={loading}></DiscountDisplaySection>
      </div>
    )
}
  
export default DiscountPage