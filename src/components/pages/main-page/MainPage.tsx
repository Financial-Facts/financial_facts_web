import './MainPage.scss';
import About from '../../atoms/about/About';
import FactsLinkSection from '../../molecules/facts-link-section/FactsLinkSection';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import Header from '../../organisms/header/Header';
import PageLayout from '../../templates/page-layout/page-layout';
import loadDiscounts from '../../../hooks/loadDiscounts';
import BlockSectionsDisplay from '../../molecules/block-sections-display/BlockSectionsDisplay';


function MainPage() {

    loadDiscounts();

    return (
      <PageLayout sections={[
        <Header key='header' text="Financial Facts" subtext="Your Gateway to Undervalued Stocks!"/>,
        <About key='about-section'/>,
        <BlockSectionsDisplay key='block-section-display'
          blocks={[
            {
              iconSource: '/assets/discount-icon.svg',
              title: 'Discounts',
              link: {
                label: 'View all',
                url: '/discount'
              },
              content: <div className='discounts-definition'>
                  <span className='discounts-description'>
                      A publicly traded company that has been successfully evaluated. This requires that the following criteria be met over the past 10 years.
                  </span>
                  <label htmlFor='criteria' className='criteria-list-header'>
                      The following values must be 10% or greater
                  </label>
                  <ul id='criteria'>
                      <li>Average annual return on invested capital (ROIC)</li>
                      <li>Average annual revenue growth</li>
                      <li>Average annual earnings per share (EPS) growth</li>
                      <li>Average annual equity growth</li>
                      <li>Average annual operating cash flow growth</li>
                  </ul>
              </div>
            },
            {
              iconSource: '/assets/facts-icon.svg',
              title: 'Facts',
              link: {
                label: 'Search for facts',
                url: '/facts'
              },
              content: <div className='discounts-definition'>
                  <span>
                      Raw filings data spanning multiple taxonomies that contains a
                      wide range of valuable financial data for examination and analysis.
                  </span>
                  <label htmlFor='examples' className='criteria-list-header'>
                      Examples
                  </label>
                  <ul id='examples'>
                      <li>Assets</li>
                      <li>Accounts Payable, Current</li>
                      <li>Earnings Per Share, Basic</li>
                      <li>Common Stock, Shares, Outstanding</li>
                      <li>Accrued Liabilities, Current</li>
                  </ul>
              </div>
            }
          ]}/>,
        <DiscountDisplaySection key='discount-display-section'/>,
        <FactsLinkSection key='facts-link-section'/>
      ]}/>
    )
}
  
export default MainPage;