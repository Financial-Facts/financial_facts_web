import { useEffect, useState } from 'react';
import './SearchBar.scss';
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Identity, Order, SearchBy, SortBy } from '../../services/bulk-entities/bulk-entities.typings';


function SearchBar({ setIdentities, sortBy, searchBy, order }: {
    setIdentities: (identities: Identity[]) => void,
    sortBy: SortBy,
    searchBy: SearchBy,
    order: Order
}) {

    const [ searchBarRef, setSearchBarRef ] = useState(null as HTMLInputElement | null);

    useEffect(() => {
        if (searchBarRef) {
            const inputSubscription = fromEvent<InputEvent>(searchBarRef, 'input')
                .pipe(
                    map(event => {
                        const target = event.target;
                        if (target && target === searchBarRef) {
                            return searchBarRef.value;
                        }
                    }),
                    filter(input => !!input && input.length > 2),
                    debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(input => BulkEntitiesService.fetchBulkIdentities({
                        startIndex: 0,
                        limit: 100,
                        searchBy: searchBy,
                        sortBy: sortBy,
                        order: order,
                        keyword: input
                    })))
                .subscribe(response => {
                    setIdentities(response.identities);
                });
            return () => {
                inputSubscription.unsubscribe();
            }
        }
    }, [ searchBarRef, sortBy, searchBy, order ]);

    useEffect(() => {
        if (searchBarRef) {
            searchBarRef.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }, [ sortBy, searchBy, order ]);

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