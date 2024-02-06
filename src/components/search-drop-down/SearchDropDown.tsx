import './SearchDropDown.scss';
import { Identity } from '../../services/bulk-entities/bulk-entities.typings';
import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { CONSTANTS } from '../constants';
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { IdentityListAction, SearchCriteria } from '../expandable-search/expandable-search.typings';


function SearchDropDown({ identities, identityListDispatch, searchCriteria }: {
    identities: Identity[],
    identityListDispatch: (action: IdentityListAction) => void,
    searchCriteria: SearchCriteria
}) {

    const [ searchResultsRef, setSearchResultsRef ] = useState(null as HTMLUListElement | null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (isLoading) {
            BulkEntitiesService.fetchBulkIdentities({
                startIndex: identities.length,
                limit: identities.length + CONSTANTS.IDENTITY_BATCH_SIZE,
                ...searchCriteria
            }).then(response => {
                identityListDispatch({ type: 'update_list', payload: response.identities });
                setIsLoading(false);
            });
        }
    }, [ isLoading ]);

    useEffect(() => {
        if (searchResultsRef) {
            const inputSubscription = subscribeToScrollEvents(searchResultsRef);
            return () => {
                if (inputSubscription) {
                    inputSubscription.unsubscribe();
                }
            }
        }
    }, [ searchResultsRef, identities ]);

    const subscribeToScrollEvents = (searchResults: HTMLUListElement) => 
        fromEvent<InputEvent>(searchResults, 'scroll')
        .pipe(
            map(event => event.target),
            filter(target => {
                if (target &&
                    identities.length > 0 &&
                    identities.length % CONSTANTS.IDENTITY_BATCH_SIZE === 0) {
                    const element = target as HTMLElement;
                    const percentScrolled = (element.scrollTop / (element.scrollHeight - element.offsetHeight)) * 100;
                    return percentScrolled > CONSTANTS.SEARCH_SCROLL_FETCH_THRESHOLD;
                }
                return false;
            }))
        .subscribe(() => {
            if (!isLoading) {
                setIsLoading(true);
            }
        });

    const renderDropDownItems = () => {
        return identities.map(identity =>
            <li className={`identity-item`}
                key={identity.cik}
                tabIndex={0}>
                <span className='cik'>{identity.cik}</span>
                <div className='identity-info'>
                    <span>
                        { identity.symbol }
                    </span>
                    <div>{identity.name}</div>
                </div>
            </li>)
    }

    const initSearchResultsRef = (ref: HTMLUListElement | null) => {
        if (ref) {
            setSearchResultsRef(ref);
        }
    };

    return (
        <>  
            <div className='search-results-label dropdown-container'>
                <span className='cik'>CIK</span>
                <div className='identity-info'>
                    <span>Symbol</span>
                    <span>Company Name</span>
                </div>
            </div>
            <ul id='search-results' className='results-dropdown dropdown-container' 
                ref={ (e) => initSearchResultsRef(e) }>
                { renderDropDownItems() }
            </ul>
        </>
    )
  }
  
  export default SearchDropDown;