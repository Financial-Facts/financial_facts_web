import { useEffect, useReducer, useState } from 'react';
import './expandable-search.scss';
import { ClosurePayload } from '../sticky-menu/StickyMenu';
import { Subject } from 'rxjs';
import SearchBar from '../search-bar/SearchBar';
import { Identity, Order, SearchBy, SortBy } from '../../services/bulk-entities/bulk-entities.typings';
import SearchDropDown from '../search-drop-down/SearchDropDown';
import SearchFilterForm from '../search-filter-form/SearchFilterForm';
import { IdentityListAction, SearchCriteria, SearchCriteriaAction } from './expandable-search.typings';
import { CONSTANTS } from '../constants';
import { handleEnterKeyEvent } from '../../utilities';

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
            } as SearchCriteria
        }
        case ('set_search_by'): {
            return { ...state, ...{
                searchBy: action.payload as SearchBy,
                sortBy: action.payload as SortBy
            }}
        }
        case ('set_sort_by'): {
            return { ...state, ...{
                sortBy: action.payload as SortBy
            }}
        }
        case ('set_order'): {
            return { ...state, ...{
                order: action.payload as Order
            }}
        }
        case ('set_keyword'): {
            return { ...state, ...{
                keyword: action.payload as string
            }}
        }
    }
}

function ExpandableSearch({ $closeDropdowns }: { $closeDropdowns: Subject<ClosurePayload[]> }) {

    const [ displaySearchBar, setDisplaySearchBar ] = useState(false);
    const [ displaySearchFilter, setDisplaySearchFilter ] = useState(false);
    const [ identities, identityListDispatch ] = useReducer(identityListReducer, [] as Identity[]);
    const [ searchCriteria, dispatch ] = useReducer(searchCriteriaReducer, {
        searchBy: 'SYMBOL',
        sortBy: 'SYMBOL',
        order: 'ASC'
    } as SearchCriteria);
    let timeout: number | undefined;

    useEffect(() => {
        identityListDispatch({ type: 'reset' });
    }, [ searchCriteria.order, searchCriteria.searchBy, searchCriteria.sortBy ]);
    
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

    useEffect(() => {
        const watchForClosure = $closeDropdowns
            .subscribe((payload: ClosurePayload[]) => {
                if (payload.includes('ALL') || payload.includes('SEARCH')) {
                    handleCloseEvent();
                }
            });
        return () => {
            watchForClosure.unsubscribe();
        }
    }, []);

    return (
        <div className={`sticky-menu-option search
            ${ displaySearchBar ? CONSTANTS.EMPTY : 'search-button' } 
            ${ displaySearchFilter ? 'display-filter-form' : CONSTANTS.EMPTY}
            ${ identities.length > 0 ? 'display-search-results' : CONSTANTS.EMPTY}`}
            aria-expanded={ displaySearchBar }>
            <div className='search-bar-wrapper'>
                <img src='/assets/icons/magnifying-glass.svg'
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
                            <img role='button'
                                className='exit-button'
                                tabIndex={0}
                                src={`/assets/icons/x.svg`}
                                onClick={() => handleCloseEvent()}
                                onKeyDown={(e) => handleEnterKeyEvent(e, handleCloseEvent)}/>
                        </> : undefined
                }
            </div>
            {
                displaySearchFilter ?
                    <SearchFilterForm
                        searchCriteria={searchCriteria}
                        dispatch={dispatch}/>
                    : undefined
            }
            {
                identities.length > 0 ? 
                    <SearchDropDown identities={identities}
                        identityListDispatch={identityListDispatch}
                        searchCriteria={searchCriteria}/> :
                    undefined
            }
        </div>
    )
  }
  
  export default ExpandableSearch;