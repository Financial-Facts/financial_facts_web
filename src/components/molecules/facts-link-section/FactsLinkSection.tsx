import './FactsLinkSection.scss';
import CompanySearchSection from '../company-search-section/CompanySearchSection';

function FactsLinkSection() {

    return (
      <section className='facts-link-section'>
        <div className='main-content'>
          <h2>Facts</h2>
          <h3>Looking for raw data from a specific company?</h3>
          <CompanySearchSection isStandalone={true}/>
        </div>
      </section>
    )
}
  
export default FactsLinkSection;