import { useEffect, useReducer, useState } from 'react';
import { Subject } from 'rxjs';
import SearchBar from '../../atoms/search-bar/SearchBar';
import SearchDropDown from '../../atoms/search-drop-down/SearchDropDown';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import SearchFilterForm from '../search-filter-form/SearchFilterForm';
import './expandable-search.scss';
import { IdentityListAction, SearchCriteria, SearchCriteriaAction } from './expandable-search.typings';
import { CONSTANTS } from '../../../constants/constants';
import { Identity } from '../../../services/bulk-entities/bulk-entities.typings';
import { handleEnterKeyEvent } from '../../../utilities';

export interface ExpandableSearchProps {
    $closeDropdowns: Subject<ClosurePayload[]>,
    isStandalone?: boolean
}

function identityListReducer(state: Identity[], action: IdentityListAction): Identity[] {
    switch (action.type) {
        case ('reset'): {
            return [];
        }
        case ('set_list'): {
            if (action.payload) {
                return action.payload;
            }
            return state;
        }
        case ('update_list'): {
            if (action.payload) {
                return [...state, ...action.payload];
            }
            return state;
        }
    }
}

function searchCriteriaReducer(state: SearchCriteria, action: SearchCriteriaAction): SearchCriteria {
    switch (action.type) {
        case ('reset_all'): {
            return {
                searchBy: 'SYMBOL',
                sortBy: 'SYMBOL',
                order: 'ASC',
                keyword: CONSTANTS.EMPTY
            }
        }
        case ('set_search_by'): {
            const payload = action.payload;
            if (payload && payload.searchBy) {
                return { ...state, ...{
                    searchBy: payload.searchBy,
                    sortBy: payload.searchBy
                }}
            }
            return state;
        }
        case ('set_sort_by'): {
            const payload = action.payload;
            if (payload && payload.sortBy) {
                return { ...state, ...{
                    sortBy: payload.sortBy
                }}
            }
            return state;
        }
        case ('set_order'): {
            const payload = action.payload;
            if (payload && payload.order) {
                return { ...state, ...{
                    order: payload.order
                }}
            }
            return state;
        }
        case ('set_keyword'): {
            const payload = action.payload;
            if (payload && payload.keyword) {
                return { ...state, ...{
                    keyword: payload.keyword
                }}
            }
            return state;
        }
    }
}

function ExpandableSearch({ $closeDropdowns, isStandalone }: ExpandableSearchProps) {

    const [ displaySearchBar, setDisplaySearchBar ] = useState(false);
    const [ displaySearchFilter, setDisplaySearchFilter ] = useState(false);
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
        const watchForClosure = $closeDropdowns
            .subscribe((payload: ClosurePayload[]) => {
                if (payload.includes('ALL') || payload.includes('SEARCH')) {
                    handleCloseEvent();
                }
            });
        if (isStandalone) {
            setDisplaySearchBar(true);
            setDisplaySearchFilter(true);
        }
        return () => {
            watchForClosure.unsubscribe();
        }
    }, []);

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
            ${ displaySearchBar ? CONSTANTS.EMPTY : 'search-button' } 
            ${ displaySearchFilter && !isStandalone ? 'display-filter-form' : CONSTANTS.EMPTY}
            ${ identities.length > 0 && !isStandalone ? 'display-search-results' : CONSTANTS.EMPTY}
            ${ isStandalone ? 'standalone-search-bar' : 'sticky-search-bar'}`}
            aria-expanded={ displaySearchBar }>
            <div className='search-bar-wrapper'>
                <img src='/assets/magnifying-glass.svg'
                    role={ displaySearchBar ? 'img' : 'button' }
                    className={`search-icon ${displaySearchBar ? 'expanded-search-icon' : CONSTANTS.EMPTY}`}
                    tabIndex={ displaySearchBar ? -1 : 0}
                    onClick={() => handleOpenEvent()}
                    onKeyDown={(e) => handleEnterKeyEvent(e, handleOpenEvent)}/>
                {
                    displaySearchBar ? 
                        <>
                            <SearchBar identityListDispatch={identityListDispatch}
                                searchCriteria={searchCriteria}
                                dispatch={dispatch}/>
                            { 
                                !isStandalone ? 
                                    <img role='button'
                                        className='exit-button'
                                        tabIndex={0}
                                        src={`/assets/x.svg`}
                                        onClick={() => handleCloseEvent()}
                                        onKeyDown={(e) => handleEnterKeyEvent(e, handleCloseEvent)}/> :
                                    undefined
                            }
                        </> : undefined
                }
            </div>
            {
                displaySearchFilter ?
                    <SearchFilterForm
                        searchCriteria={searchCriteria}
                        dispatch={dispatch}
                        renderDelay={isStandalone ? 0 : 400}/>
                    : undefined
            }
            {
                identities.length > 0 ? 
                    <SearchDropDown allIdentities={identities}
                        identityListDispatch={identityListDispatch}
                        searchCriteria={searchCriteria}/> :
                    undefined
            }
        </div>
    )
  }
  
  export default ExpandableSearch;