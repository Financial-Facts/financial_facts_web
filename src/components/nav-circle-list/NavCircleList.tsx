import "./NavCircleList.scss"
import { CONSTANTS } from "../constants"

export interface NavCircleListProps { 
  itemWidth: number,
  numItemsToDisplay: number,
  navCircles: boolean[],
  setNavCircles: (_: boolean[]) => void,
  setScrollToOptions: (_: (current: ScrollToOptions) => ScrollToOptions) => void
}

function NavCircleList({ itemWidth, numItemsToDisplay, navCircles, setNavCircles, setScrollToOptions }: NavCircleListProps) {

    const renderNavCircles = () => {
      return navCircles.map((isActive, index) => {
        return <div
            key={`nav-circle-${index}`}
            className={'nav-circle ' + (isActive ? 'active' : CONSTANTS.EMPTY)}
            onClick={ () => handleCircleSelection(index) }></div>
      });
    }

    const handleCircleSelection = (clickedIndex: number) => {
        setNavCircles(navCircles.map((_navCircle, circleIndex) => circleIndex === clickedIndex));
        setScrollToOptions(current => ({
            ...current,
            ...{
                left: itemWidth * numItemsToDisplay * clickedIndex
            }
        }));
    }

    return (
        <div className="nav-circle-wrapper">
            { renderNavCircles() }
        </div>
    )
  }
  
  export default NavCircleList;