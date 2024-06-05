import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { IdentityListAction, SearchCriteria } from '../../molecules/expandable-search/expandable-search.typings';
import './SearchDropDown.scss';
import { CONSTANTS } from '../../../constants/constants';
import fetchIdentities from '../../../hooks/fetchIdentities';
import { Identity, IdentityRequest } from '../../../services/bulk-entities/bulk-entities.typings';
import { distinctUntilChanged } from 'rxjs/operators';
import { useNavigate } from 'react-router-dom';
import ResponsiveTable from '../../molecules/responsive-table/ResponsiveTable';

export interface SearchDropDownProps {
    allIdentities: Identity[],
    identityListDispatch: (action: IdentityListAction) => void,
    searchCriteria: SearchCriteria
}

function SearchDropDown({ allIdentities, identityListDispatch, searchCriteria }: SearchDropDownProps) {

    const navigate = useNavigate();
    const [ searchResultsRef, setSearchResultsRef ] = useState<HTMLDivElement | null>(null);
    const [ identityRequest, setIdentityRequest ] = useState<IdentityRequest | null>(null);
    const { identities, loading } = fetchIdentities(identityRequest, false);

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

    const subscribeToScrollEvents = (searchResults: HTMLDivElement) => 
        fromEvent<InputEvent>(searchResults, 'scroll')
            .pipe(
                map(event => event.target),
                filter(target => {
                    if (!loading &&
                        target &&
                        allIdentities.length > 0 &&
                        allIdentities.length % CONSTANTS.IDENTITY_BATCH_SIZE === 0) {
                        const element = target as HTMLElement;
                        const percentScrolled = (element.scrollTop / (element.scrollHeight - element.offsetHeight)) * 100;
                        return percentScrolled > CONSTANTS.SEARCH_SCROLL_FETCH_THRESHOLD;
                    }
                    return false;
                }),
                map(() => allIdentities.length),
                distinctUntilChanged())
            .subscribe(startIndex => setIdentityRequest({
                startIndex: startIndex,
                limit: CONSTANTS.IDENTITY_BATCH_SIZE - 1,
                ...searchCriteria
            }));

    const renderTableHeader = () =>
        <thead>
            <tr>
                <th>CIK</th>
                <th>Symbol</th>
                <th className='company-name'>Company Name</th>
            </tr>
        </thead>

    const renderTableBody = () =>
        <tbody>
            { renderTableRows() }
        </tbody>
    
    const renderTableRows = () => {
        return allIdentities.map(identity =>
            <tr key={identity.cik} onClick={() => navigate(`/facts/${identity.cik}`)}>
                <td>{ identity.cik }</td>
                <td>{ identity.symbol }</td>
                <td className='company-name'>{ identity.name }</td>
            </tr>)
    }

    return (
        <ResponsiveTable
            className='search-results-table'
            renderTableHeader={renderTableHeader}
            renderTableBody={renderTableBody}
            zeroStateCondition={ allIdentities.length === 0}
            wrapperRefSetter={setSearchResultsRef}/>
    )
  }
  
  export default SearchDropDown;