import { useEffect, useState } from 'react';
import './SearchBar.scss';
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CONSTANTS } from '../constants';
import { IdentityListAction, SearchCriteria, SearchCriteriaAction } from '../expandable-search/expandable-search.typings';


function SearchBar({ identityListDispatch, searchCriteria, dispatch }: {
    identityListDispatch: (action: IdentityListAction) => void,
    searchCriteria: SearchCriteria,
    dispatch: (action: SearchCriteriaAction) => void
}) {

    const [ searchBarRef, setSearchBarRef ] = useState(null as HTMLInputElement | null);

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
                        payload: input
                    });
                    return true;
                }),
                switchMap(input => BulkEntitiesService.fetchBulkIdentities({
                    startIndex: 0,
                    limit: CONSTANTS.IDENTITY_BATCH_SIZE,
                    searchBy: searchCriteria.searchBy,
                    sortBy: searchCriteria.sortBy,
                    order: searchCriteria.order,
                    keyword: input
                })))
            .subscribe(response => {
                identityListDispatch({ type: 'set_list', payload: response.identities });
            });

    const initSearchBarRef = (ref: HTMLInputElement | null) => {
        if (ref) {
            setSearchBarRef(ref);
        }
    };

    return (
        <div className='input-wrapper'>
            <input type='text'
                ref={ (e) => initSearchBarRef(e) }
                role={'search'}
                className='search-bar'
                placeholder='Search...'>    
            </input>
        </div>
    )
  }
  
  export default SearchBar;