import { useEffect, useState } from 'react';
import NavCircleList from '../../atoms/nav-circle-list/NavCircleList';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';


export interface CircleNavWrapperProps {
    element: JSX.Element
    elementRef: HTMLUListElement | null
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

    const [ navCircles, setNavCircles ] = useState<boolean[]>([]);
    const [ scrollToOptions, setScrollToOptions ] = useState<ScrollToOptions>({
        left: 0,
        behavior: 'smooth',
    });

    useEffect(() => {
        if (numItemsToDisplay !== 0) {
            const numOfNavCircles = listLength > numItemsToDisplay ?
                Math.ceil(listLength / numItemsToDisplay) : 
                0;
            generateNavCircles(numOfNavCircles);
        }
    }, [ numItemsToDisplay ]);

    useEffect(() => {
        if (elementRef) {
            elementRef.scrollTo(scrollToOptions);
        }
    }, [ scrollToOptions ]);

    useEffect(() => {
        if (elementRef) {
            const subscription = updateSelectedCircleOnScroll(elementRef);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [ elementRef, navCircles ]);

    const generateNavCircles = (numOfCircles: number) => {
        const circles = [];
        for (let i = 0; i < numOfCircles; i++) {
          circles.push(i === 0)
        }
        setNavCircles(circles);
    }

    const updateSelectedCircleOnScroll = (listElement: HTMLUListElement) =>
        fromEvent<InputEvent>(listElement, 'scroll')
            .pipe(map(event => event.target))
            .subscribe((target) => {
                if (target && navCircles.length > 0) {
                    const element = target as HTMLElement;
                    const numItems = element.scrollLeft / (itemWidth + 10);
                    const navCircleIndex = Math.ceil(numItems / numItemsToDisplay);
                    setNavCircles([...navCircles].map((_, index) => index === navCircleIndex));
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