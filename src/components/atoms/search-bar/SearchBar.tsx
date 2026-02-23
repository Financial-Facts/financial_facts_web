import { useEffect, useRef } from 'react';
import './SearchBar.scss';
import { CONSTANTS } from '../../../constants/constants';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IdentityRequestAction } from '../../molecules/expandable-search/reducers/identity-request.reducer';
import { useSelector } from 'react-redux';
import { MobileState } from '../../../store/mobile/mobile.slice';

export interface SearchBarProps {
    identityRequestDispatch: React.Dispatch<IdentityRequestAction>
}

function SearchBar({ identityRequestDispatch }: SearchBarProps) {

    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const searchBarRef = useRef<HTMLInputElement | null>(null);
    
    useEffect(() => {
        const currentSearchBarRef = searchBarRef.current;
        if (currentSearchBarRef) {
            const inputSubscription = subscribeToInputEvents(currentSearchBarRef);
            return () => {
                if (inputSubscription) {
                    inputSubscription.unsubscribe();
                }
            }
        }
    }, [ searchBarRef.current ]);

    const subscribeToInputEvents = (searchBar: HTMLInputElement) => 
        fromEvent<InputEvent>(searchBar, 'input')
            .pipe(
                map(event => {
                    const target = event.target;
                    if (target && searchBarRef.current && target === searchBarRef.current) {
                        return searchBarRef.current.value;
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
                ref={searchBarRef}
                role={'search'}
                className='search-bar'
                placeholder={ mobile.size === 'SMALL' ? 'Search...' : `Search for discounts...`}>    
            </input>
        </div>
    )
  }
  
  export default SearchBar;