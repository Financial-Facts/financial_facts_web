import { messaging } from '../../../constants/messaging';
import DefinitionsSection from '../definitions-section/DefinitionsSection';
import ValuationsSection from '../../organisms/valuations-section/ValuationsSection';
import './AboutSection.scss';

function AboutSection() {

    return <section className='about-section'>
        <div>
            <h3>{ 'Philosophy' }</h3>
            <p>{ messaging.aboutUs }</p>
        </div>
        <div>
            <h3>{ 'Origins' }</h3>
            <p>{ messaging.origin }</p>
        </div>
        <DefinitionsSection/>
        <ValuationsSection/>
    </section>
}

export default AboutSection;