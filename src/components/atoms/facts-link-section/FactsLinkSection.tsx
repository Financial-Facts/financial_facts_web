import { useNavigate } from 'react-router-dom';
import './FactsLinkSection.scss';
import SvgIcon from '../svg-icon/SvgIcon';

function FactsLinkSection() {

    const navigate = useNavigate();

    return (
      <section className='facts-link-section'>
        <h2>Facts</h2>
        <h3>Looking for raw data for a specific company?</h3>
        <div className='search-navigation-button-wrapper'>
            <button className='search-navigation-button'
              onClick={() => navigate('/facts')}>
                Search
                <SvgIcon src='/assets/magnifying-glass.svg'
                    height='32px'
                    width='32px'
                    wrapperPadding='0'/>
            </button>
        </div>
        <div role='img' className='company-icon-list-box'/>
      </section>
    )
}
  
export default FactsLinkSection;