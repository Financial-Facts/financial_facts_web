import { useEffect, useState } from 'react';
import NavCircleList from '../nav-circle-list/NavCircleList';

export interface CircleNavWrapperProps {
    element: JSX.Element
    elementRef: HTMLElement | null
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

    const [numOfNavCircles, setNumNavCircles] = useState(0);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useEffect(() => {
        updateNumNavCircles();
        setCurrentItemIndex(0);
    }, [ numItemsToDisplay ]);

    useEffect(() => {
        if (elementRef) {
            elementRef.scrollTo({
                left: (itemWidth * numItemsToDisplay * currentItemIndex),
                behavior: 'smooth'
            });
        }
    }, [ currentItemIndex ]);

    const updateNumNavCircles = () => {
        if (numItemsToDisplay !== 0) {
            setNumNavCircles(listLength > numItemsToDisplay ?
                Math.ceil(listLength / numItemsToDisplay) : 
                0);
        }
    }

    return (
        <>
            { element }
            <NavCircleList
                key={ numOfNavCircles }
                numOfCircles={ numOfNavCircles }
                setCurrentCardIndex={ setCurrentItemIndex }/>
        </>
    )
  }
  
  export default CircleNavWrapper;