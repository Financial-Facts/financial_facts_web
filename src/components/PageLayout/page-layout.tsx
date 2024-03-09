import ContactSection from '../../sections/contact-section/ContactSection';
import Footer from '../../sections/footer/Footer';
import './page-layout.scss'

export interface PageLayoutProps {
    sections: JSX.Element[],
    includeContact?: boolean,
    includeFooter?: boolean
}

function PageLayout({ sections, includeContact = true, includeFooter = true }: PageLayoutProps) {

    return (
        <main className='page-layout'>
            {
                sections
            }
            { includeContact ? <ContactSection/> : undefined }
            { includeFooter ? <Footer/> : undefined }
        </main>
    )
  }
  
  export default PageLayout;