import { useEffect, useState } from 'react';
import './arrow-nav-wrapper.scss';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';

export type Direction = 'LEFT' | 'RIGHT';

export interface ArrowNavWrapperProps {
    element: JSX.Element
    elementRef: HTMLUListElement | null
    listLength: number,
    itemWidth: number,
    numItemsToDisplay: number 
}

function ArrowNavWrapper({
    element,
    elementRef,
    itemWidth
}: ArrowNavWrapperProps) {

    const [ scrollToOptions, setScrollToOptions ] = useState<ScrollToOptions>({
        left: 0,
        behavior: 'smooth',
    });

    const [ showLeftArrow, setShowLeftArrow ] = useState<boolean>(false);
    const [ showRightArrow, setShowRightArrow ] = useState<boolean>(true);
    const [ maxScrollWidth, setMaxScrollWidth ] = useState<number | undefined>(undefined);
    
    useEffect(() => {
        if (elementRef) {
            elementRef.scrollTo(scrollToOptions);
        }
    }, [ scrollToOptions ]);

    useEffect(() => {
        if (elementRef) {
            setMaxScrollWidth(elementRef.scrollWidth - (elementRef.scrollWidth % itemWidth));
        }
    }, [ elementRef ]);

    useEffect(() => {
        if (elementRef && maxScrollWidth) {
            const subscription = updateArrowsOnScroll(elementRef);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [ maxScrollWidth ]); 

    const updateArrowsOnScroll = (listElement: HTMLUListElement) =>
        fromEvent<InputEvent>(listElement, 'scroll')
            .pipe(map(event => event.target))
            .subscribe((target) => {
                if (target && maxScrollWidth) {
                    const element = target as HTMLElement;
                    setShowLeftArrow(element.scrollLeft - itemWidth > 0);
                    setShowRightArrow(element.scrollLeft + itemWidth < maxScrollWidth);
                }
            });

    const handleArrowClick = (arrow: 'RIGHT' | 'LEFT') => {
        if (elementRef && maxScrollWidth) {
            setScrollToOptions(current => {
                const currentLeft = elementRef.scrollLeft;
                const delta = arrow === 'LEFT' ? -itemWidth : itemWidth;
                return {
                    ...current,
                    ...{
                        left: Math.min(Math.max(0, currentLeft + delta), maxScrollWidth)
                    }
                }
            });
        }
    };
  
    const renderArrowButton = (arrow: 'RIGHT' | 'LEFT', shouldDisplayArrow: boolean) => {
        const direction = arrow.toLowerCase();
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
            { renderArrowButton('LEFT', showLeftArrow) }
            { element }
            { renderArrowButton('RIGHT', showRightArrow) }
        </>
    )
  }
  
  export default ArrowNavWrapper;