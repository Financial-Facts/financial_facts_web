import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import NavCircleList from '../../atoms/nav-circle-list/NavCircleList';


export interface CircleNavWrapperProps {
    element: JSX.Element
    elementRef: React.MutableRefObject<HTMLUListElement | null>
    listLength: number
    numItemsToDisplay: number,
    itemWidth: number
}

function CircleNavWrapper({
    element,
    elementRef,
    listLength,
    numItemsToDisplay,
    itemWidth
}: CircleNavWrapperProps) {
    
    const numOfCircles = Math.ceil(listLength / numItemsToDisplay);

    const [ navCircles, setNavCircles ] = useState<boolean[]>(numItemsToDisplay === 0 ? [] : () => {
        const circles: boolean[] = [...Array(numOfCircles)].map((_, index) => index === 0);
        return circles;
    });

    const [ scrollToOptions, setScrollToOptions ] = useState<ScrollToOptions>({
        left: 0,
        behavior: 'smooth',
    });

    useEffect(() => {
        setScrollToOptions({
            left: 0,
            behavior: 'smooth'
        });
        const circles: boolean[] = [...Array(numOfCircles)].map((_, index) => index === 0);
        setNavCircles(circles);
    }, [ numItemsToDisplay ]);

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.scrollTo(scrollToOptions);
        }
    }, [ scrollToOptions ]);

    useEffect(() => {
        if (elementRef.current) {
            const subscription = updateSelectedCircleOnScroll(elementRef.current);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [ elementRef.current, navCircles ]);

    const updateSelectedCircleOnScroll = (listElement: HTMLUListElement) =>
        fromEvent<InputEvent>(listElement, 'scroll')
            .pipe(map(event => event.target))
            .subscribe((target) => {
                if (target && navCircles.length > 0) {
                    const element = target as HTMLElement;
                    const elementWidth = numItemsToDisplay * itemWidth;
                    const navCircleIndex = Math.ceil(element.scrollLeft / elementWidth);
                    setNavCircles(current => current.map((_, index) => index === navCircleIndex));
                }
            });

    return (
        <>
            { element }
            <NavCircleList
                itemWidth={itemWidth}
                numItemsToDisplay={numItemsToDisplay}
                setScrollToOptions={setScrollToOptions}
                navCircles={navCircles}
                setNavCircles={setNavCircles}/>
        </>
    )
  }
  
  export default CircleNavWrapper;