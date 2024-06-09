import { useEffect, useState } from 'react';
import { IdentityListAction, SearchCriteria, SearchCriteriaAction } from '../../molecules/expandable-search/expandable-search.typings';
import './SearchBar.scss';
import fetchIdentities from '../../../hooks/fetchIdentities';
import { CONSTANTS } from '../../../constants/constants';
import { IdentityRequest } from '../../../services/bulk-entities/bulk-entities.typings';
import { initRef } from '../../../utilities';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

export interface SearchBarProps {
    identityListDispatch: (action: IdentityListAction) => void,
    searchCriteria: SearchCriteria,
    dispatch: (action: SearchCriteriaAction) => void,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar({ identityListDispatch, searchCriteria, dispatch, setIsLoading }: SearchBarProps) {

    const [ searchBarRef, setSearchBarRef ] = useState<HTMLInputElement | null>(null);
    const [ identityRequest, setIdentityRequest ] = useState<IdentityRequest | null>(null);
    const { identities, loading } = fetchIdentities(identityRequest);

    useEffect(() => {
        setIsLoading(loading);
    }, [ loading ]);

    useEffect(() => {
        if (searchBarRef) {
            const inputSubscription = subscribeToInputEvents(searchBarRef);
            return () => {
                if (inputSubscription) {
                    inputSubscription.unsubscribe();
                }
            }
        }
    }, [ searchBarRef ]);

    useEffect(() => {
        if (searchCriteria.keyword) {
            setIdentityRequest(() => ({
                ...searchCriteria,
                startIndex: 0,
                limit: CONSTANTS.IDENTITY_BATCH_SIZE - 1
            }));
        }
    }, [ searchCriteria ]);

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
                        dispatch({
                            type: 'set_keyword',
                            payload: { keyword: undefined }
                        });
                        return false;
                    }
                    return true;
                }))
                .subscribe((input) => dispatch({
                    type: 'set_keyword',
                    payload: { keyword: input }
                }));

    return (
        <div className='input-wrapper'>
            <input type='text'
                ref={ (ref) => initRef(ref, setSearchBarRef) }
                role={'search'}
                className='search-bar'
                placeholder='Search for facts...'>    
            </input>
        </div>
    )
  }
  
  export default SearchBar;