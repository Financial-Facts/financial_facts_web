import { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import './SearchDropDown.scss';
import { CONSTANTS } from '../../../constants/constants';
import { Identity } from '../../../services/bulk-entities/bulk-entities.typings';
import { distinctUntilChanged } from 'rxjs/operators';
import { useNavigate } from 'react-router-dom';
import ResponsiveTable from '../../molecules/responsive-table/ResponsiveTable';
import { handleEnterKeyEvent } from '../../../utilities';
import { IdentityRequestAction } from '../../molecules/expandable-search/reducers/identity-request.reducer';

export interface SearchDropDownProps {
    identities: Identity[],
    identityRequestDispatch: React.Dispatch<IdentityRequestAction>
}

function SearchDropDown({ identities, identityRequestDispatch }: SearchDropDownProps) {

    const navigate = useNavigate();
    const searchResultsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentSearchResultsRef = searchResultsRef.current;
        if (currentSearchResultsRef) {
            const inputSubscription = subscribeToScrollEvents(currentSearchResultsRef);
            return () => {
                if (inputSubscription) {
                    inputSubscription.unsubscribe();
                }
            }
        }
    }, [ searchResultsRef.current ]);

    const subscribeToScrollEvents = (searchResults: HTMLDivElement) => 
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
                }),
                map(() => identities.length),
                distinctUntilChanged())
            .subscribe(startIndex => identityRequestDispatch({
                type: 'set_start_and_limit',
                payload: {
                    startIndex: startIndex,
                    limit: CONSTANTS.IDENTITY_BATCH_SIZE - 1
                }
            }));

    const handleClick = (identity: Identity) => {
        navigate(`/facts/${identity.cik}`, {
            state: identity
        })
    }
    
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
        return identities.map(identity =>
            <tr key={identity.cik}
                tabIndex={0}
                onClick={() => handleClick(identity)}
                onKeyDown={(e) => handleEnterKeyEvent(e, () => handleClick(identity))}>
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
            zeroStateCondition={ identities.length === 0}
            wrapperRefSetter={searchResultsRef}/>
    )
  }
  
  export default SearchDropDown;