import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleDiscount } from '../services/bulk-entities/bulk-entities.typings';
import { DiscountState, loadSimpleDiscounts } from '../store/discounts/discounts.slice';
import { AppDispatch } from '../store/store';


const loadDiscounts = () => {

    const dispatch = useDispatch<AppDispatch>();
    const allDiscounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.allDiscounts);
    
    useEffect(() => {
        if (allDiscounts.length === 0) {
            dispatch(loadSimpleDiscounts());
          }
    }, []);
}
  
export default loadDiscounts;