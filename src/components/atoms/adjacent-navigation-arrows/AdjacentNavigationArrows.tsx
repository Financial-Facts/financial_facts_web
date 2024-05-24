import { useNavigate } from 'react-router-dom';
import './AdjacentNavigationArrows.scss';

export interface NavigationItem {
    id: string
    label: string
}

export interface AdjacentNavigationState {
    uri: string,
    previousItem: NavigationItem | undefined
    nextItem: NavigationItem | undefined
}

export interface AdjacentNavigationProps {
    adjacentNavigationState: AdjacentNavigationState
}


function AdjacentNavigationArrows({ adjacentNavigationState }: AdjacentNavigationProps) {

    const navigate = useNavigate();

    const renderAdjacentNavArrow = (direction: 'left' | 'right', uri: string, navigationItem: NavigationItem) =>
        <button className={`adjacent-nav-button adjacent-nav-button-${direction}`} 
            onClick={() => navigate(`${uri}/${navigationItem.id}`)}>
            <span>{ navigationItem.label }</span>
            <img src={`/assets/navigation-arrow-${direction}.svg`} height={25} width={25}/>
        </button>

    const renderAdjacentNavigation = (adjacentNavigationState: AdjacentNavigationState) => 
        <nav className={`adjacent-navigation 
            ${ !adjacentNavigationState.previousItem && 'row-reverse'}`}>
            { adjacentNavigationState.previousItem &&
                renderAdjacentNavArrow('left', adjacentNavigationState.uri, adjacentNavigationState.previousItem) }
            { adjacentNavigationState.nextItem &&
                renderAdjacentNavArrow('right', adjacentNavigationState.uri, adjacentNavigationState.nextItem) }
        </nav>

    return renderAdjacentNavigation(adjacentNavigationState);
}

export default AdjacentNavigationArrows;