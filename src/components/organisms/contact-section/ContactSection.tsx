import ContactInfoList from '../../atoms/contact-info-list/ContactInfoList';
import SiteMap from '../../atoms/site-map/SiteMap';
import ContactForm from '../contact-form/ContactForm';
import './ContactSection.scss';

function ContactSection() {

    return (
        <section className='contact-section'>
            <div className='contact-wrapper'>
                <ContactForm/>
                <ContactInfoList/>
            </div>
            <SiteMap/>
        </section>
    )
  }
  
  export default ContactSection;