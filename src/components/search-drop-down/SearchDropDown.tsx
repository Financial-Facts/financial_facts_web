import './SearchDropDown.scss';
import { Identity, IdentityRequest } from '../../services/bulk-entities/bulk-entities.typings';
import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { CONSTANTS } from '../constants';
import { IdentityListAction, SearchCriteria } from '../expandable-search/expandable-search.typings';
import { Link } from 'react-router-dom';
import { initRef } from '../../utilities';
import fetchIdentities from '../../hooks/fetchIdentities';

export interface SearchDropDownProps {
    allIdentities: Identity[],
    identityListDispatch: (action: IdentityListAction) => void,
    searchCriteria: SearchCriteria
}

function SearchDropDown({ allIdentities, identityListDispatch, searchCriteria }: SearchDropDownProps) {

    const [ searchResultsRef, setSearchResultsRef ] = useState<HTMLUListElement | null>(null);
    const [ identityRequest, setIdentityRequest ] = useState<IdentityRequest | null>(null);
    const { identities, loading } = fetchIdentities(identityRequest);

    useEffect(() => {
        identityListDispatch({ type: 'update_list', payload: identities });
    }, [ identities ]);

    useEffect(() => {
        if (searchResultsRef) {
            const inputSubscription = subscribeToScrollEvents(searchResultsRef);
            return () => {
                if (inputSubscription) {
                    inputSubscription.unsubscribe();
                }
            }
        }
    }, [ searchResultsRef, allIdentities ]);

    const subscribeToScrollEvents = (searchResults: HTMLUListElement) => 
        fromEvent<InputEvent>(searchResults, 'scroll')
            .pipe(
                map(event => event.target),
                filter(target => {
                    if (target &&
                        allIdentities.length > 0 &&
                        allIdentities.length % CONSTANTS.IDENTITY_BATCH_SIZE === 0) {
                        const element = target as HTMLElement;
                        const percentScrolled = (element.scrollTop / (element.scrollHeight - element.offsetHeight)) * 100;
                        return percentScrolled > CONSTANTS.SEARCH_SCROLL_FETCH_THRESHOLD;
                    }
                    return false;
                }))
            .subscribe(() => {
                if (!loading) {
                    setIdentityRequest({
                        startIndex: allIdentities.length,
                        limit: allIdentities.length + CONSTANTS.IDENTITY_BATCH_SIZE,
                        ...searchCriteria
                    })
                }
            });

    const renderDropDownItems = () => {
        return allIdentities.map(identity =>
            <li key={identity.cik}>
                <Link className='identity-item' to={`/facts/${identity.cik}`}>
                    <span className='cik'>{identity.cik}</span>
                    <div className='identity-info'>
                        <span>
                            { identity.symbol }
                        </span>
                        <div>{identity.name}</div>
                    </div>
                </Link>
            </li>)
    }

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
                ref={ (ref) => initRef(ref, setSearchResultsRef) }>
                { renderDropDownItems() }
            </ul>
        </>
    )
  }
  
  export default SearchDropDown;