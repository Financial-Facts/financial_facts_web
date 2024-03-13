import { useEffect, useState } from 'react';
import './SearchBar.scss';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { CONSTANTS } from '../constants';
import { IdentityListAction, SearchCriteria, SearchCriteriaAction } from '../expandable-search/expandable-search.typings';
import { initRef } from '../../utilities';
import fetchIdentities from '../../hooks/fetchIdentities';
import { IdentityRequest } from '../../services/bulk-entities/bulk-entities.typings';

export interface SearchBarProps {
    identityListDispatch: (action: IdentityListAction) => void,
    searchCriteria: SearchCriteria,
    dispatch: (action: SearchCriteriaAction) => void
}

function SearchBar({ identityListDispatch, searchCriteria, dispatch }: SearchBarProps) {

    const [ searchBarRef, setSearchBarRef ] = useState<HTMLInputElement | null>(null);
    const [ identityRequest, setIdentityRequest ] = useState<IdentityRequest | null>(null);
    const { identities } = fetchIdentities(identityRequest);

    useEffect(() => {
        if (searchBarRef) {
            const inputSubscription = subscribeToInputEvents(searchBarRef);
            searchBarRef.dispatchEvent(new Event('input', { bubbles: true }));
            return () => {
                if (inputSubscription) {
                    inputSubscription.unsubscribe();
                }
            }
        }
    }, [ searchBarRef, searchCriteria.sortBy, searchCriteria.searchBy, searchCriteria.order ]);

    useEffect(() => {
        identityListDispatch({ type: 'set_list', payload: identities });
    }, [ identities ])

    const subscribeToInputEvents = (searchBar: HTMLInputElement) => 
        fromEvent<InputEvent>(searchBar, 'input')
            .pipe(
                map(event => {
                    const target = event.target;
                    if (target && target === searchBarRef) {
                        return searchBarRef.value;
                    }
                }),
                debounceTime(CONSTANTS.DEBOUNCE_TIME),
                distinctUntilChanged(),
                filter(input => {
                    if (!input) {
                        identityListDispatch({ type: 'reset' });
                        return false;
                    }
                    dispatch({
                        type: 'set_keyword',
                        payload: { keyword: input }
                    });
                    return true;
                }),
                map(input => ({
                    startIndex: 0,
                    limit: CONSTANTS.IDENTITY_BATCH_SIZE,
                    searchBy: searchCriteria.searchBy,
                    sortBy: searchCriteria.sortBy,
                    order: searchCriteria.order,
                    keyword: input
                })))
            .subscribe((response: IdentityRequest) => setIdentityRequest(response));

    return (
        <div className='input-wrapper'>
            <input type='text'
                ref={ (ref) => initRef(ref, setSearchBarRef) }
                role={'search'}
                className='search-bar'
                placeholder='Search...'>    
            </input>
        </div>
    )
  }
  
  export default SearchBar;