import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowNavWrapper from '../../atoms/arrow-nav-wrapper/arrow-nav-wrapper'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import CircleNavWrapper from '../../molecules/circle-nav-wrapper/circle-nav-wrapper'
import DiscountCard from '../../molecules/discount-card/DiscountCard'
import './DiscountDisplaySection.scss'
import { CONSTANTS } from '../../../constants/constants'
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings'
import { DiscountState } from '../../../store/discounts/discounts.slice'
import { initRef } from '../../../utilities'

export interface DiscountDisplayParams {
    simplify?: boolean,
    keyword?: string
}

function DiscountDisplaySection({ simplify = false, keyword }: DiscountDisplayParams) {

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
    
    const checkIncludesKeyword = (discount: SimpleDiscount, value: string): boolean => 
        discount.name.includes(value) || discount.cik.includes(value) || discount.symbol.includes(value);
    
    const renderDiscountCards = () => {
        return [...discounts]
            .filter(discount => keyword ? checkIncludesKeyword(discount, keyword) : true)
            .map(discount => <DiscountCard key={discount.cik} discount={ discount }></DiscountCard>);
    }

    const updateDiscountCardDisplay = () => {
        const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        setNumCardsToDisplay(Math.floor((viewportWidth - 150) / CARD_WIDTH));
    }

    return (
      <section className={`discount-display-section ${ simplify ? 'simplify' : 'full'}`}>
        {
            !simplify && <>
              <h2>Discounts</h2>
              <h3>See firms that achieve our criteria and their <span>valuations</span></h3>
            </>
        }
        { loading ? (
          <LoadingSpinner size='LARGE' color='PURPLE'></LoadingSpinner>
        ) : (
          <div className={`body ${usingArrowNavigation ? 'body-arrows' : CONSTANTS.EMPTY}`}>
            { 
              simplify ? <ul className='standalone-list'>
                { renderDiscountCards() }
              </ul> :
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
                <ArrowNavWrapper
                    elementRef={discountListRef}
                    itemWidth={CARD_WIDTH}
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