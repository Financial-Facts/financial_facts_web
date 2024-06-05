import { useEffect, useState } from 'react';
import './arrow-nav-wrapper.scss';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';

export type Direction = 'LEFT' | 'RIGHT';

export interface ArrowNavWrapperProps {
    element: JSX.Element
    elementRef: HTMLUListElement | null
    itemWidth: number
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
    
    useEffect(() => {
        if (elementRef) {
            elementRef.scrollTo(scrollToOptions);
        }
    }, [ scrollToOptions ]);

    useEffect(() => {
        if (elementRef) {
            const subscription = updateArrowsOnScroll(elementRef);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [ elementRef, itemWidth ]); 

    const updateArrowsOnScroll = (listElement: HTMLUListElement) =>
        fromEvent<InputEvent>(listElement, 'scroll')
            .pipe(map(event => event.target))
            .subscribe((target) => {
                if (target) {
                    const element = target as HTMLElement;
                    const scrollLeft = Math.ceil(element.scrollLeft);
                    setShowLeftArrow(scrollLeft - itemWidth >= 0);
                    setShowRightArrow((scrollLeft + itemWidth) !== element.scrollWidth);
                }
            });

    const handleArrowClick = (arrow: 'RIGHT' | 'LEFT') => {
        if (elementRef) {
            setScrollToOptions(current => {
                const currentLeft = elementRef.scrollLeft;
                const delta = arrow === 'LEFT' ? -itemWidth : itemWidth;
                return {
                    ...current,
                    ...{
                        left: Math.min(Math.max(0, currentLeft + delta), elementRef.scrollWidth)
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
        <div className='nav-wrapper-body'>
            { renderArrowButton('LEFT', showLeftArrow) }
            { element }
            { renderArrowButton('RIGHT', showRightArrow) }
        </div>
    )
  }
  
  export default ArrowNavWrapper;