import { useEffect, useState } from "react"
import { SimpleDiscount } from "../../services/bulk-entities/bulk-entities.typings"
import "./NavCircleList.scss"

export interface DiscountDisplayParams {
  discounts: SimpleDiscount[],
  loading: boolean
}

function NavCircleList({ numOfCircles, scrollToIndex }: { 
    numOfCircles: number,
    scrollToIndex: (index: number) => void
}) {

    const [navCircles, setNavCircles] = useState([] as boolean[]);

    useEffect(() => {
        generateNavCircles();
    }, []);

    const generateNavCircles = () => {
        const circles = [];
        for (let i = 0; i < numOfCircles; i++) {
          circles.push(i === 0)
        }
        setNavCircles(circles);
    }

    const renderNavCircles = () => {
      return navCircles.map((isActive, index) => {
        return <div
            key={`nav-circle-${index}`}
            className={'nav-circle ' + (isActive ? 'active' : '')}
            onClick={ () => handleCircleSelection(index) }></div>
      });
    }

    const handleCircleSelection = (clickedIndex: number) => {
        scrollToIndex(clickedIndex);
        setNavCircles(navCircles.map((_navCircle, circleIndex) => circleIndex === clickedIndex));
    }

    return (
        <div className="nav-circle-wrapper">
            { renderNavCircles() }
        </div>
    )
  }
  
  export default NavCircleList;