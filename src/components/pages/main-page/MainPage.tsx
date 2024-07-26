import About from '../../atoms/about/About';
import FactsLinkSection from '../../molecules/facts-link-section/FactsLinkSection';
import DiscountDisplaySection from '../../organisms/discounts-display-section/DiscountDisplaySection';
import Header from '../../organisms/header/Header';
import PageLayout from '../../templates/page-layout/page-layout';
import loadDiscounts from '../../../hooks/loadDiscounts';
import { CONSTANTS } from '../../../constants/constants';
import BlockSectionsDisplay from '../../molecules/block-sections-display/BlockSectionsDisplay';


function MainPage() {

    loadDiscounts();

    return (
      <PageLayout sections={[
        <Header key='header' text="Financial Facts" subtext="Your Gateway to Undervalued Stocks!"/>,
        <About key='about-section'/>,
        <BlockSectionsDisplay
            key={`block-sections-display`}
            blocks={[
              CONSTANTS.BLOCK_CONFIGS.DISCOUNT,
              CONSTANTS.BLOCK_CONFIGS.FACTS
          ]}/>,
        <DiscountDisplaySection key='discount-display-section'/>,
        <FactsLinkSection key='facts-link-section'/>
      ]}/>
    )
}
  
export default MainPage;