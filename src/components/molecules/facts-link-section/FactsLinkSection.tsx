import { useNavigate } from 'react-router-dom';
import './FactsLinkSection.scss';
import SubmitButton from '../submit-button/submit-button';

function FactsLinkSection() {

    const navigate = useNavigate();

    return (
      <section className='facts-link-section'>
        <h2>Facts</h2>
        <h3>Looking for raw data for a specific company?</h3>
        <div className='search-navigation-button-wrapper'>
            <SubmitButton
              text='Search'
              outcome={'neutral'}
              loading={false}
              iconSource='/assets/magnifying-glass.svg'
              onClick={() => navigate('/facts')}/>
        </div>
        <div role='img' className='company-icon-list-box'/>
      </section>
    )
}
  
export default FactsLinkSection;