import { useEffect, useState } from 'react';
import './SearchBar.scss';
import { CONSTANTS } from '../../../constants/constants';
import { initRef } from '../../../utilities';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IdentityRequestAction } from '../../molecules/expandable-search/reducers/identity-request.reducer';

export interface SearchBarProps {
    identityRequestDispatch: React.Dispatch<IdentityRequestAction>
}

function SearchBar({ identityRequestDispatch }: SearchBarProps) {

    const [ searchBarRef, setSearchBarRef ] = useState<HTMLInputElement | null>(null);

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
                        identityRequestDispatch({ type: 'reset' })
                        return false;
                    }
                    return true;
                }))
                .subscribe((input) => identityRequestDispatch({
                    type: 'set_keyword',
                    payload: input 
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