import ContactForm from '../../components/contact-form/ContactForm';
import ContactInfoList from '../../components/contact-info-list/ContactInfoList';
import SiteMap from '../../components/site-map/SiteMap';
import './ContactSection.scss'

function ContactSection() {

    return (
        <section className='contact-section'>
            <div className='contact-wrapper'>
                <ContactInfoList></ContactInfoList>
                <ContactForm></ContactForm>
            </div>
            <SiteMap></SiteMap>
        </section>
    )
  }
  
  export default ContactSection;