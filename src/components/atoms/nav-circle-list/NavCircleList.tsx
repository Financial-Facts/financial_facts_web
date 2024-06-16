import { CONSTANTS } from "../../../constants/constants";
import "./NavCircleList.scss";

export interface NavCircleListProps { 
  itemWidth: number,
  numItemsToDisplay: number,
  navCircles: boolean[],
  setScrollToOptions: (_: (current: ScrollToOptions) => ScrollToOptions) => void
}

function NavCircleList({ itemWidth, numItemsToDisplay, navCircles, setScrollToOptions }: NavCircleListProps) {

    const renderNavCircles = () => {
      return navCircles.map((isActive, index) => {
        return <div
            key={`nav-circle-${index}`}
            className={'nav-circle ' + (isActive ? 'active' : CONSTANTS.EMPTY)}
            onClick={ () => handleCircleSelection(index) }></div>
      });
    }

    const handleCircleSelection = (clickedIndex: number) => {
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