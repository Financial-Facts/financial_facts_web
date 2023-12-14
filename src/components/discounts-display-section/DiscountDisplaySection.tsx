import { SimpleDiscount } from "../../services/bulk-entities/bulk-entities.typings"
import DiscountCard from "../discount-card/DiscountCard"
import LoadingSpinner from "../loading-spinner/loading-spinner"
import "./DiscountDisplaySection.scss"
import NavCircleList from "../nav-circle-list/NavCircleList"
import { useEffect, useState } from "react"

export interface DiscountDisplayParams {
  discounts: SimpleDiscount[],
  loading: boolean
}

function DiscountDisplaySection({ discounts, loading }: DiscountDisplayParams ) {

    const initDiscountListRef = (ref: HTMLUListElement | null) => {
      if (ref) setDiscountListRef(ref);
    };

    const cardWidth = 210;
    const [numCardsToDisplay, setNumCardsToDisplay] = useState(0);
    const [numOfNavCircles, setNumNavCircles] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [usingArrowNavigation, setUsingArrowNavigation] = useState(false);
    const [discountListRef, setDiscountListRef] = useState(null as HTMLUListElement | null);

    useEffect(() => {
      updateDiscountCardDisplay();
      updateNumNavCircles();
      window.addEventListener('resize', updateDiscountCardDisplay);
    }, [ loading ]);

    useEffect(() => {
      if (discountListRef) {
        discountListRef.scrollTo({
          left: (cardWidth * numCardsToDisplay * currentCardIndex),
          behavior: 'smooth'
        });
      }
    }, [ currentCardIndex ]);

    useEffect(() => {
      if (discountListRef) {
        discountListRef.style.width = `${numCardsToDisplay * cardWidth}px`;
      }
      updateNumNavCircles();
      setUsingArrowNavigation(numCardsToDisplay === 1);
    }, [ numCardsToDisplay, discountListRef ]);
    
    const renderDiscountCards = () => {
      return discounts
        .sort((a, b) => a.active ? -1 : b.active ? 1 : a.ttySalePrice - b.ttySalePrice)
        .map(discount => <DiscountCard key={discount.cik} discount={ discount }></DiscountCard>);
    }

    const updateDiscountCardDisplay = () => {
      const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      setNumCardsToDisplay(Math.floor((viewportWidth - 150) / cardWidth));
      setCurrentCardIndex(0);
    }

    const updateNumNavCircles = () => {
      if (numCardsToDisplay !== 0) {
        setNumNavCircles(discounts.length > numCardsToDisplay ?
          Math.ceil(discounts.length / numCardsToDisplay) : 
          0);
      }
    }

    const handleArrowClick = (arrow: 'RIGHT' | 'LEFT') => {
      const val = arrow === 'LEFT' ? -1 : 1;
      setCurrentCardIndex((current) => Math.max(current + val, 0));
    }

    const renderArrowButton = (arrow: 'RIGHT' | 'LEFT') => {
      const direction = (arrow as string).toLowerCase();
      const shouldDisplayArrow =
        arrow === 'LEFT' && currentCardIndex !== 0 ||
        arrow === 'RIGHT' && currentCardIndex !== discounts.length - 1;
      return usingArrowNavigation ? (
        <div className={ `${ direction }-button-placeholder` }>
          { shouldDisplayArrow ? (
            <button className={ `move-button move-${ direction }-button` }
              onClick={ (_event) => handleArrowClick(arrow) }>
              <img src="/assets/arrow_right.svg"></img>
            </button>
          ): undefined }
        </div> ) : undefined;
    }

    return (
      <section className="discount-display-section">
        <h2>Current Discounts</h2>
        <h3>See existing discounts and their <span>sale price</span></h3>
        { loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div className={`body ${usingArrowNavigation ? 'body-arrows' : ''}`}>
            { renderArrowButton('LEFT') }
            <ul ref={ (e) => initDiscountListRef(e) }
              className="discounts">
              { renderDiscountCards() }
            </ul>
            { renderArrowButton('RIGHT') }
            { !usingArrowNavigation ? (
              <NavCircleList
               key={ numOfNavCircles }
               numOfCircles={ numOfNavCircles }
               setCurrentCardIndex={ setCurrentCardIndex }>
             </NavCircleList>
            ) : undefined }
          </div>
        )}
      </section>
    )
  }
  
  export default DiscountDisplaySection