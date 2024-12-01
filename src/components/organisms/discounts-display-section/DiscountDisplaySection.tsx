import { useEffect, useMemo, useRef, useState } from 'react'
import ArrowNavWrapper from '../../atoms/arrow-nav-wrapper/arrow-nav-wrapper'
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner'
import CircleNavWrapper from '../../molecules/circle-nav-wrapper/circle-nav-wrapper'
import DiscountCard from '../../molecules/discount-card/DiscountCard'
import './DiscountDisplaySection.scss'
import { CONSTANTS } from '../../../constants/constants'
import InformationIcon from '../../molecules/information-icon/InformationIcon'
import { messaging } from '../../../constants/messaging'
import listenForWindowClick from '../../../hooks/listenForWindowClick'
import { Subject } from 'rxjs'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../../molecules/submit-button/submit-button'
import fetchQualifiedDiscounts from '../../../hooks/fetchQualifiedDiscounts'

const hideDataSubject = new Subject<void>();

function DiscountDisplaySection() {
    
    const { qualifiedDiscounts, loading } = fetchQualifiedDiscounts();
    const discountListRef = useRef<HTMLUListElement | null>(null);
    const MIN_CARD_WIDTH = 235;

    const calculateNumCardsToDisplay = (): number => {
        if (discountListRef.current) {
            const width = discountListRef.current.clientWidth;
            const numCards = Math.max(1, Math.floor((width) / MIN_CARD_WIDTH));
            if (discountListRef.current) {
                setCardWidth(discountListRef.current.clientWidth / numCards);
            }
            return Math.max(1, Math.floor((width) / MIN_CARD_WIDTH));
        }
        return 4;
    }

    const calculateCardWidth = (): number => discountListRef.current ? 
        discountListRef.current.clientWidth / numCardsToDisplay :
        MIN_CARD_WIDTH;

    const navigate = useNavigate();
    const [ numCardsToDisplay, setNumCardsToDisplay ] = useState(4);
    const [ cardWidth, setCardWidth ] = useState(calculateCardWidth());

    const usingArrowNavigation = numCardsToDisplay === 1;
    const discountCardsList = useMemo(() =>
        <ul ref={(ref) => {
                discountListRef.current = ref;
                setNumCardsToDisplay(calculateNumCardsToDisplay());
            }}
            className={ 'discounts' }
            style={{
                "--discount-card-width": `${cardWidth}px`
            } as React.CSSProperties }>
            { 
                qualifiedDiscounts
                    .map(discount =>
                        <DiscountCard
                            key={discount.cik}
                            discount={ discount }
                            hideDataTrigger$={hideDataSubject.asObservable()}/>)
            }
        </ul>,
    [ qualifiedDiscounts, cardWidth ]);

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
                            <CircleNavWrapper listLength={qualifiedDiscounts.length}
                                numItemsToDisplay={numCardsToDisplay}
                                elementRef={discountListRef}
                                itemWidth={cardWidth}
                                element={discountCardsList}/> :
                            <ArrowNavWrapper
                                elementRef={discountListRef}
                                itemWidth={cardWidth}
                                element={discountCardsList}/>
                    }
                    <SubmitButton
                        text="View all"
                        outcome={'neutral'}
                        loading={false}
                        iconSource='/assets/redirect.svg'
                        onClick={() => navigate('/discounts')}/>
                </div>
            )}
        </section>
    )
}
  
  export default DiscountDisplaySection