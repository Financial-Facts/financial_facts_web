import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowNavWrapper from '../../atoms/arrow-nav-wrapper/arrow-nav-wrapper'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import CircleNavWrapper from '../../molecules/circle-nav-wrapper/circle-nav-wrapper'
import DiscountCard from '../../molecules/discount-card/DiscountCard'
import './DiscountDisplaySection.scss'
import { CONSTANTS } from '../../../constants/constants'
import { DiscountState } from '../../../store/discounts/discounts.slice'
import { initRef } from '../../../utilities'
import InformationIcon from '../../molecules/information-icon/InformationIcon'
import { messaging } from '../../../constants/messaging'
import listenForWindowClick from '../../../hooks/listenForWindowClick'
import { Subject } from 'rxjs'
import SvgIcon from '../../atoms/svg-icon/SvgIcon'
import { useNavigate } from 'react-router-dom'

const hideDataSubject = new Subject<void>();

function DiscountDisplaySection() {
    
    const { allDiscounts, loading } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    
    const CARD_WIDTH = 250;

    const navigate = useNavigate();
    const [ numCardsToDisplay, setNumCardsToDisplay ] = useState(0);
    const [ usingArrowNavigation, setUsingArrowNavigation ] = useState(false);
    const [ discountListRef, setDiscountListRef ] = useState<HTMLUListElement | null>(null);

    const discountCardsList = useMemo(() =>
        <ul ref={(ref) => initRef(ref, setDiscountListRef)}
            className={ 'discounts' }
            style={{
                "--discount-card-width": `${CARD_WIDTH}px`
            } as React.CSSProperties }>
            { 
                allDiscounts.map(discount =>
                    <DiscountCard
                        key={discount.cik}
                        discount={ discount }
                        hideDataTrigger$={hideDataSubject.asObservable()}/>)
            }
        </ul>,
    [ allDiscounts ]);

    listenForWindowClick((target: Element) => {
        if (!target.classList.contains('symbol-icon')) {
            hideDataSubject.next();
        }
    }, discountListRef);

    useEffect(() => {
        updateDiscountCardDisplay();
        window.addEventListener('resize', updateDiscountCardDisplay);
    }, [ loading ]);

    useEffect(() => {
        if (discountListRef) {
            discountListRef.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        }
    }, [ discountListRef, numCardsToDisplay ]);

    useEffect(() => {
        if (discountListRef) {
            discountListRef.style.width = `${numCardsToDisplay * CARD_WIDTH}px`;
        }
        setUsingArrowNavigation(numCardsToDisplay === 1);
    }, [ numCardsToDisplay, discountListRef ]);

    const updateDiscountCardDisplay = () => {
        const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        setNumCardsToDisplay(Math.floor((viewportWidth - 150) / CARD_WIDTH));
    }

    return (
        <section className={`discount-display-section full`}>
            <h2 className='discounts-display-header'>
                Discounts
                <SvgIcon src={'/assets/list.svg'}
                    height={'16px'}
                    width={'16px'}
                    color='#F5F5F5'
                    tooltipMessage={messaging.discountListLink}
                    isButton={true}
                    onClick={() => navigate('/discount')}/>
            </h2>
            <h3>
                See firms that match our criteria and their&nbsp;
                <span className='valuation-text'>
                    valuations
                    <InformationIcon 
                        message={messaging.valuationDefinitionsLocation}
                        color='#292929'
                        alignPopup='center'
                        screenSide='right'/>
                </span>
            </h3>
            { loading ? (
                <LoadingSpinner size='LARGE' color='PURPLE'/>
            ) : (
                <div className={`body ${usingArrowNavigation ? 'body-arrows' : CONSTANTS.EMPTY}`}>
                    { 
                        !usingArrowNavigation ? 
                            <CircleNavWrapper listLength={allDiscounts.length}
                                numItemsToDisplay={numCardsToDisplay}
                                elementRef={discountListRef}
                                itemWidth={CARD_WIDTH}
                                element={discountCardsList}/> :
                            <ArrowNavWrapper
                                elementRef={discountListRef}
                                itemWidth={CARD_WIDTH}
                                element={discountCardsList}/>
                    }
                </div>
            )}
        </section>
    )
}
  
  export default DiscountDisplaySection