import { useEffect, useReducer, useState } from 'react';
import { Subject } from 'rxjs';
import SearchBar from '../../atoms/search-bar/SearchBar';
import SearchDropDown from '../../atoms/search-drop-down/SearchDropDown';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import SearchFilterForm from '../search-filter-form/SearchFilterForm';
import './expandable-search.scss';
import { CONSTANTS } from '../../../constants/constants';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';
import watchForMenuClosure from '../../../hooks/watchForMenuClosure';
import { searchCriteriaReducer } from './reducers/search-criteria.reducer';
import { identityListReducer } from './reducers/identity-list.reducer';
import ZeroState from '../../atoms/zero-state/ZeroState';

export interface ExpandableSearchProps {
    $closeDropdowns: Subject<ClosurePayload[]>,
    isStandalone?: boolean
}

function ExpandableSearch({ $closeDropdowns, isStandalone }: ExpandableSearchProps) {

    watchForMenuClosure($closeDropdowns, (payload) => {
        if (payload.includes('ALL') || payload.includes('SEARCH')) {
            handleCloseEvent();
        }
    });

    const [ displaySearchBar, setDisplaySearchBar ] = useState(isStandalone);
    const [ displaySearchFilter, setDisplaySearchFilter ] = useState(isStandalone);
    const [ displaySearchResults, setDisplaySearchResults ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ identities, identityListDispatch ] = useReducer(identityListReducer, []);
    const [ searchCriteria, dispatch ] = useReducer(searchCriteriaReducer, {
        searchBy: 'SYMBOL',
        sortBy: 'SYMBOL',
        order: 'ASC'
    });
    let timeout: NodeJS.Timeout | undefined;

    useEffect(() => {
        identityListDispatch({ type: 'reset' });
    }, [ searchCriteria.order, searchCriteria.searchBy, searchCriteria.sortBy ]);

    useEffect(() => {
        setDisplaySearchResults(!!searchCriteria.keyword);
    }, [ searchCriteria.keyword ]);

    const handleOpenEvent = (): void => {
        clearTimeout(timeout);
        setDisplaySearchBar(true);
        timeout = setTimeout(() => {
            setDisplaySearchFilter(true);
            $closeDropdowns.next([ 'NAV' ]);
        }, 400);
    }

    const handleCloseEvent = (): void => {
        identityListDispatch({ type: 'reset' });
        setDisplaySearchFilter(false);
        dispatch({
            type: 'reset_all'
        });
        setDisplaySearchBar(false);
    }

    return (
        <div className={`sticky-menu-option search
            ${ isStandalone ? 'standalone-search-bar' : 'sticky-search-bar'}
            ${ !isStandalone && displaySearchBar ? 'display-search-bar' : CONSTANTS.EMPTY }
            ${ displaySearchFilter && !isStandalone ? 'display-filter-form' : CONSTANTS.EMPTY}
            ${ displaySearchResults && !isStandalone ? 'display-search-results' : CONSTANTS.EMPTY}`}
            aria-expanded={ displaySearchBar }>
            <div className='search-bar-wrapper'>
                <SvgIcon src='/assets/magnifying-glass.svg'
                    height='48px'
                    width='48px'
                    isButton={!displaySearchBar}
                    onClick={handleOpenEvent}/>
                {
                    displaySearchBar &&
                        <>
                            <SearchBar identityListDispatch={identityListDispatch}
                                searchCriteria={searchCriteria}
                                dispatch={dispatch}
                                setIsLoading={setIsLoading}/>
                            { 
                                !isStandalone &&
                                    <SvgIcon src='/assets/x.svg'
                                        height='30px'
                                        width='30px'
                                        isButton={true}
                                        onClick={handleCloseEvent}/>
                            }
                        </>
                }
            </div>
            {
                displaySearchFilter &&
                    <SearchFilterForm
                        searchCriteria={searchCriteria}
                        dispatch={dispatch}
                        renderDelay={isStandalone ? 0 : 400}/>
            }
            {
                displaySearchResults ?
                    isLoading ? 
                        <LoadingSpinner size={'SMALL'} color={'PURPLE'}/> : 
                        <SearchDropDown allIdentities={identities}
                            identityListDispatch={identityListDispatch}
                            searchCriteria={searchCriteria}/> :
                    isStandalone &&
                        <ZeroState message={'No input'} supportText={'Use the search bar to find company filings'}/>
            }
        </div>
    )
  }
  
  export default ExpandableSearch;