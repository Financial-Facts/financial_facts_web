import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings'
import DiscountCard from '../../components/discount-card/DiscountCard'
import LoadingSpinner from '../../components/loading-spinner/loading-spinner'
import './DiscountDisplaySection.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DiscountState } from '../../state/discounts/discounts.slice'
import { CONSTANTS } from '../../components/constants'
import { initRef } from '../../utilities'
import ArrowNavWrapper from '../../components/ArrowNavWrapper/arrow-nav-wrapper'
import CircleNavWrapper from '../../components/CircleNavWrapper/circle-nav-wrapper'

export interface DiscountDisplayParams {
  discounts: SimpleDiscount[],
  loading: boolean
}

function DiscountDisplaySection() {

    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);
    const loading = useSelector< { discounts: DiscountState }, boolean>((state) => state.discounts.loading);

    const CARD_WIDTH = 200;
    const CARD_GAP = 10;

    const [numCardsToDisplay, setNumCardsToDisplay] = useState(0);
    const [usingArrowNavigation, setUsingArrowNavigation] = useState(false);
    const [discountListRef, setDiscountListRef] = useState<HTMLUListElement | null>(null);

    useEffect(() => {
        updateDiscountCardDisplay();
        window.addEventListener('resize', updateDiscountCardDisplay);
    }, [ loading ]);

    useEffect(() => {
        if (discountListRef) {
            discountListRef.style.width = `${numCardsToDisplay * CARD_WIDTH + ((numCardsToDisplay - 1) * CARD_GAP)}px`;
        }
        setUsingArrowNavigation(numCardsToDisplay === 1);
    }, [ numCardsToDisplay, discountListRef ]);
    
    const renderDiscountCards = () => {
        return [...discounts]
            .map(discount => <DiscountCard key={discount.cik} discount={ discount }></DiscountCard>);
    }

    const updateDiscountCardDisplay = () => {
        const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        setNumCardsToDisplay(Math.floor((viewportWidth - 150) / CARD_WIDTH));
    }

    return (
      <section className='discount-display-section'>
        <h2>Current Discounts</h2>
        <h3>See existing discounts and their <span>sale price</span></h3>
        { loading ? (
          <LoadingSpinner size='LARGE' color='PURPLE'></LoadingSpinner>
        ) : (
          <div className={`body ${usingArrowNavigation ? 'body-arrows' : CONSTANTS.EMPTY}`}>
            { 
              !usingArrowNavigation ? 
                <CircleNavWrapper listLength={discounts.length}
                    numItemsToDisplay={numCardsToDisplay}
                    elementRef={discountListRef}
                    itemWidth={CARD_WIDTH}
                    element={
                        <ul ref={(ref) => initRef(ref, setDiscountListRef)}
                            className='discounts'>
                            { renderDiscountCards() }
                        </ul>}/> :
                <ArrowNavWrapper listLength={discounts.length}
                    elementRef={discountListRef}
                    itemWidth={CARD_WIDTH}
                    numItemsToDisplay={numCardsToDisplay}
                    element={
                        <ul ref={(ref) => initRef(ref, setDiscountListRef)}
                            className='discounts'>
                            {renderDiscountCards()}
                        </ul>}/>
            }
          </div>
        )}
      </section>
    )
  }
  
  export default DiscountDisplaySection