import './MainPage.scss';
import About from '../../atoms/about/About';
import FactsLinkSection from '../../molecules/facts-link-section/FactsLinkSection';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import Header from '../../organisms/header/Header';
import PageLayout from '../../templates/page-layout/page-layout';
import { CONSTANTS } from '../../../constants/constants';
import BlockSectionsDisplay from '../../molecules/block-sections-display/BlockSectionsDisplay';


function MainPage() {

    return (
      <PageLayout sections={[
        <Header key='header' text="Financial Facts" subtext="Your Gateway to Undervalued Stocks!"/>,
        <About key='about-section'/>,
        <section className='horizontal-section'>
          <div className='horizontal-section-content'>
            <BlockSectionsDisplay
              key={`block-sections-display`}
              blocks={[
                CONSTANTS.BLOCK_CONFIGS.DISCOUNT
            ]}/>
            <FactsLinkSection key='facts-link-section'/>
          </div>
        </section>,
        <DiscountDisplaySection key='discount-display-section'/>,
        <section className='vertical-section'>
          <div className='vertical-section-content'>
            <div className='valuations-header-container'>
              <h2 className='valuations-header'>
                  Valuations
              </h2>
              <h3>
                  Understand the supported valuations and their meaning
              </h3>
            </div>
            <BlockSectionsDisplay
                key={`block-sections-valuations-display`}
                blocks={[
                  CONSTANTS.BLOCK_CONFIGS.STICKER_PRICE,
                  CONSTANTS.BLOCK_CONFIGS.DISCOUNTED_CASH_FLOW,
                  CONSTANTS.BLOCK_CONFIGS.BENCHMARK_RATIO
              ]}/>
          </div>
        </section>
      ]}/>
    )
}
  
export default MainPage;