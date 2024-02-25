import './FactsPage.scss'
import Header from '../../sections/header/Header'
import { useEffect } from 'react'
import Footer from '../../sections/footer/Footer';
import ContactSection from '../../sections/contact-section/ContactSection';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { setActivePage } from '../../state/page/page.slice';
import { useParams } from 'react-router-dom';
import FactsDisplaySection from '../../sections/facts-display-section/FactsDisplaySection';
import CompanySearchSection from '../../sections/company-search-section/CompanySearchSection';


function FactsPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { cik } = useParams();

    useEffect(() => {
      dispatch(setActivePage('Facts'));
    }, []);

    return (
      <main className='main-page'>
        <Header text="Facts" subtext="Raw data from the latest filings"></Header>
        {
          cik ?
            <FactsDisplaySection cik={cik}/> :
            <CompanySearchSection/>
        }
        <ContactSection></ContactSection>
        <Footer></Footer>
      </main>
    )
}
  
export default FactsPage