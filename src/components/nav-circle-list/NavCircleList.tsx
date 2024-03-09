import { useEffect, useState } from "react"
import { SimpleDiscount } from "../../services/bulk-entities/bulk-entities.typings"
import "./NavCircleList.scss"
import { CONSTANTS } from "../constants"

export interface DiscountDisplayParams {
  discounts: SimpleDiscount[],
  loading: boolean
}

export interface NavCircleListProps { 
  numOfCircles: number,
  setCurrentCardIndex: (index: number) => void
}

function NavCircleList({ numOfCircles, setCurrentCardIndex }: NavCircleListProps) {

    const [navCircles, setNavCircles] = useState<boolean[]>([]);

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
            className={'nav-circle ' + (isActive ? 'active' : CONSTANTS.EMPTY)}
            onClick={ () => handleCircleSelection(index) }></div>
      });
    }

    const handleCircleSelection = (clickedIndex: number) => {
        setCurrentCardIndex(clickedIndex);
        setNavCircles(navCircles.map((_navCircle, circleIndex) => circleIndex === clickedIndex));
    }

    return (
        <div className="nav-circle-wrapper">
            { renderNavCircles() }
        </div>
    )
  }
  
  export default NavCircleList;