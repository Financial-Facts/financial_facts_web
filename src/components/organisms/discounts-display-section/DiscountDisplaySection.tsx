import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowNavWrapper from '../../atoms/arrow-nav-wrapper/arrow-nav-wrapper'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import CircleNavWrapper from '../../molecules/circle-nav-wrapper/circle-nav-wrapper'
import DiscountCard from '../../molecules/discount-card/DiscountCard'
import './DiscountDisplaySection.scss'
import { CONSTANTS } from '../../../constants/constants'
import { DiscountState } from '../../../store/discounts/discounts.slice'
import InformationIcon from '../../molecules/information-icon/InformationIcon'
import { messaging } from '../../../constants/messaging'
import listenForWindowClick from '../../../hooks/listenForWindowClick'
import { Subject } from 'rxjs'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../../molecules/submit-button/submit-button'

const hideDataSubject = new Subject<void>();

function DiscountDisplaySection() {
    
    const { allDiscounts, loading } = useSelector< { discounts: DiscountState }, DiscountState>((state) => state.discounts);
    
    const CARD_WIDTH = 250;
    const calculateNumCardsToDisplay = (): number => {
        const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        return Math.max(1, Math.floor((viewportWidth - 150) / CARD_WIDTH));
    }

    const navigate = useNavigate();
    const [ numCardsToDisplay, setNumCardsToDisplay ] = useState(calculateNumCardsToDisplay());
    const discountListRef = useRef<HTMLUListElement | null>(null);

    const usingArrowNavigation = numCardsToDisplay === 1;
    const discountCardsList = useMemo(() =>
        <ul ref={discountListRef}
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
        if (!target.classList.contains('symbol-icon') &&
            !discountListRef.current?.contains(target)) {
            hideDataSubject.next();
        }
    });

    useEffect(() => {
        const listener = () => {
            setNumCardsToDisplay(calculateNumCardsToDisplay());
        }
        window.addEventListener('resize', listener);
        return (() => {
            window.removeEventListener('resize', listener);
        });
    }, [ loading ]);

    useEffect(() => {
        const currentDiscountListRef = discountListRef.current;
        if (currentDiscountListRef) {
            currentDiscountListRef.style.width = `${numCardsToDisplay * CARD_WIDTH}px`;
            currentDiscountListRef.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        }
    }, [ discountListRef.current, numCardsToDisplay ]);

    return (
        <section className={`discount-display-section full`}>
            <h2 className='discounts-display-header'>
                Discounts
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
                    <SubmitButton
                        text="View all"
                        outcome={'neutral'}
                        loading={false}
                        iconSource='/assets/redirect.svg'
                        onClick={() => navigate('/discount')}/>
                </div>
            )}
        </section>
    )
}
  
  export default DiscountDisplaySection