import { useMemo, useReducer, useState } from 'react';
import { Subject } from 'rxjs';
import SearchBar from '../../atoms/search-bar/SearchBar';
import SearchDropDown from '../../atoms/search-drop-down/SearchDropDown';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import SearchFilterForm from '../search-filter-form/SearchFilterForm';
import './expandable-search.scss';
import { CONSTANTS } from '../../../constants/constants';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';
import watchForMenuClosure from '../../../hooks/watchForMenuClosure';
import ZeroState from '../../atoms/zero-state/ZeroState';
import { identityRequestReducer } from './reducers/identity-request.reducer';
import fetchIdentities from '../../../hooks/fetchIdentities';

export interface ExpandableSearchProps {
    $closeDropdowns: Subject<ClosurePayload[]>,
    isStandalone?: boolean
}

function ExpandableSearch({ $closeDropdowns, isStandalone }: ExpandableSearchProps) {

    watchForMenuClosure($closeDropdowns, (payload) => {
        if (payload.includes('ALL') || payload.includes('SEARCH')) {
            handleCloseEvent();
        }
    });

    const [ displaySearchBar, setDisplaySearchBar ] = useState(isStandalone);
    const [ displaySearchFilter, setDisplaySearchFilter ] = useState(isStandalone);
    const [ identityRequest, identityRequestDispatch ] = useReducer(identityRequestReducer, {
        startIndex: 0,
        limit: CONSTANTS.IDENTITY_BATCH_SIZE,
        searchBy: 'SYMBOL',
        sortBy: 'SYMBOL',
        order: 'ASC',
        keyword: CONSTANTS.EMPTY
    });

    const { identities, loading } = fetchIdentities(identityRequest.keyword ? identityRequest : null);

    const displaySearchResults = useMemo(() => !!identityRequest.keyword, [ identityRequest.keyword ]);

    let timeout: NodeJS.Timeout | undefined;

    const handleOpenEvent = (): void => {
        clearTimeout(timeout);
        setDisplaySearchBar(true);
        timeout = setTimeout(() => {
            setDisplaySearchFilter(true);
            $closeDropdowns.next([ 'NAV' ]);
        }, 400);
    }

    const handleCloseEvent = (): void => {
        identityRequestDispatch({ type: 'reset' });
        setDisplaySearchFilter(false);
        setDisplaySearchBar(false);
    }

    return (
        <div className={`sticky-menu-option search
            ${ isStandalone ? 'standalone-search-bar' : 'sticky-search-bar'}
            ${ !isStandalone && displaySearchBar ? 'display-search-bar' : CONSTANTS.EMPTY }
            ${ displaySearchFilter && !isStandalone ? 'display-filter-form' : CONSTANTS.EMPTY}
            ${ displaySearchResults && !isStandalone ? 'display-search-results' : CONSTANTS.EMPTY}`}
            aria-expanded={ displaySearchBar }>
            <div className='search-bar-wrapper'>
                <SvgIcon src='/assets/magnifying-glass.svg'
                    height='48px'
                    width='48px'
                    isButton={!displaySearchBar}
                    onClick={handleOpenEvent}/>
                {
                    displaySearchBar &&
                        <>
                            <SearchBar identityRequestDispatch={identityRequestDispatch}/>
                            { 
                                !isStandalone &&
                                    <SvgIcon src='/assets/x.svg'
                                        height='30px'
                                        width='30px'
                                        isButton={true}
                                        onClick={handleCloseEvent}/>
                            }
                        </>
                }
            </div>
            {
                displaySearchFilter && 
                    <SearchFilterForm
                        identityRequest={identityRequest} 
                        identityRequestDispatch={identityRequestDispatch}
                        renderDelay={isStandalone ? 0 : 400}/>
            }
            {
                displaySearchResults ?
                    loading ? 
                        <LoadingSpinner size={'SMALL'} color={'PURPLE'}/> : 
                        <SearchDropDown
                            identities={identities}
                            identityRequestDispatch={identityRequestDispatch}/> :
                    isStandalone &&
                        <ZeroState message={'No input'} supportText={'Use the search bar to find company filings'}/>
            }
        </div>
    )
  }
  
  export default ExpandableSearch;