import { useNavigate } from 'react-router-dom';
import './FactsLinkSection.scss';

function FactsLinkSection() {

    const navigate = useNavigate();

    return (
      <section className='facts-link-section'>
        <h2>Facts</h2>
        <h3>Looking for info on a specific company?</h3>
        <div className='search-navigation-button-wrapper'>
            <button className='search-navigation-button'
              onClick={() => navigate('/facts')}>
                Search
                <img src='/assets/icons/magnifying-glass.svg'/>
            </button>
        </div>
        <div role='img' className='company-icon-list-box'/>
      </section>
    )
}
  
export default FactsLinkSection;