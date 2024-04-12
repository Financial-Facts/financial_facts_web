import Header from '../../organisms/header/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { setActivePage } from '../../state/page/page.slice';
import { useParams } from 'react-router-dom';
import FactsDisplaySection from '../../organisms/facts-display-section/FactsDisplaySection';
import CompanySearchSection from '../../molecules/company-search-section/CompanySearchSection';
import PageLayout from '../../template/page-layout/page-layout';


function FactsPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { cik } = useParams();

    useEffect(() => {
      dispatch(setActivePage('Facts'));
    }, []);

    return (
      <PageLayout sections={[
          <Header key={'facts-header'} text="Facts" subtext="Raw data from the latest filings"/>,
          cik ?
              <FactsDisplaySection key={'facts-display-section'} cik={cik}/> :
              <CompanySearchSection key={'company-search-section'}/>
      ]}/>
    )
}
  
export default FactsPage