import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import Header from '../../organisms/header/Header';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings';
import { DiscountState, loadSimpleDiscounts } from '../../../store/discounts/discounts.slice';
import { setActivePage } from '../../../store/page/page.slice';
import { AppDispatch } from '../../../store/store';
import PageLayout from '../../templates/page-layout/page-layout';
import SearchFilterInput from '../../atoms/search-filter-input/SearchFilterInput';
import { CONSTANTS } from '../../../constants/constants';
import './DiscountSelectionPage.scss';

function DiscountSelectionPage() {

    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);
    const dispatch = useDispatch<AppDispatch>();
    const [ keyword, setKeyword ] = useState<string>(CONSTANTS.EMPTY);
    
    useEffect(() => {
        dispatch(setActivePage('Discount'));
        // See if simple discount list needs to be loaded
        if (!discounts || discounts.length === 0) {
          dispatch(loadSimpleDiscounts());
        }
    }, []);

    return (
      <PageLayout sections={[
        <Header key={'discounts-header'} text='Discounts' subtext='Company valuations and related data'/>,
        <div key={'discount-search-input'} className='discount-search'>
          <SearchFilterInput setKeywordFilter={setKeyword}/>
        </div>,
        <DiscountDisplaySection keyword={keyword} simplify={true} key='discount-display-section'/>
      ]}/>
    )
}
  
export default DiscountSelectionPage;