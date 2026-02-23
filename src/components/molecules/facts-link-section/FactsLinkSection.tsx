import './FactsLinkSection.scss';
import CompanySearchSection from '../company-search-section/CompanySearchSection';

function FactsLinkSection() {

    return (
      <section className='facts-link-section'>
        <div className='main-content'>
          <h2>Search</h2>
          <h3>Looking for discounts for a specific company?</h3>
          <CompanySearchSection isStandalone={true}/>
        </div>
      </section>
    )
}
  
export default FactsLinkSection;