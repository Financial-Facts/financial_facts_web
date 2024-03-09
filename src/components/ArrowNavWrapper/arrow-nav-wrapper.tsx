import { useEffect, useState } from 'react';
import './arrow-nav-wrapper.scss';

export type Direction = 'LEFT' | 'RIGHT';

export interface ArrowNavWrapperProps {
    element: JSX.Element
    elementRef: HTMLElement | null
    listLength: number,
    itemWidth: number,
    numItemsToDisplay: number 
}

function ArrowNavWrapper({
    element,
    elementRef,
    listLength,
    itemWidth,
    numItemsToDisplay = 1
}: ArrowNavWrapperProps) {

    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useEffect(() => {
        if (elementRef) {
            elementRef.scrollTo({
                left: (itemWidth * numItemsToDisplay * currentItemIndex),
                behavior: 'smooth'
            });
        }
    }, [ currentItemIndex ]);
    
    const handleArrowClick = (arrow: 'RIGHT' | 'LEFT') => {
        const val = arrow === 'LEFT' ? -1 : 1;
        setCurrentItemIndex((current) => Math.max(current + val, 0));
    };
  
    const renderArrowButton = (arrow: 'RIGHT' | 'LEFT') => {
        const direction = arrow.toLowerCase();
        const shouldDisplayArrow =
            arrow === 'LEFT' && currentItemIndex !== 0 ||
            arrow === 'RIGHT' && currentItemIndex !== listLength - 1;
        return (
            <div className={ `${ direction }-button-placeholder` }>
                { shouldDisplayArrow ? (
                    <button className={ `move-button move-${ direction }-button` }
                        onClick={ (_event) => handleArrowClick(arrow) }>
                        <img src='/assets/arrow_right.svg'/>
                    </button>
                ): undefined }
            </div>)
    };

    return (
        <>
            { renderArrowButton('LEFT') }
            { element }
            { renderArrowButton('RIGHT') }
        </>
    )
  }
  
  export default ArrowNavWrapper;