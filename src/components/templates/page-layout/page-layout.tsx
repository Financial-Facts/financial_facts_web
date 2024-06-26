import Footer from '../../atoms/footer/Footer';
import ContactSection from '../../organisms/contact-section/ContactSection';
import './page-layout.scss';

export interface PageLayoutProps {
    sections: (JSX.Element | undefined)[],
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