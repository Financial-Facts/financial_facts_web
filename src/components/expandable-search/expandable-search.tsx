import { useEffect, useState } from 'react';
import './expandable-search.scss';
import { ClosurePayload } from '../sticky-menu/StickyMenu';
import { Subject } from 'rxjs';
import SearchBar from '../search-bar/SearchBar';
import { Identity, Order, SearchBy, SortBy } from '../../services/bulk-entities/bulk-entities.typings';
import SearchDropDown from '../search-drop-down/SearchDropDown';


function ExpandableSearch({ $closeDropdowns }: { $closeDropdowns: Subject<ClosurePayload[]> }) {

    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ identities, setIdentities ] = useState([] as Identity[]);
    const [ sortBy, setSortBy ] = useState('SYMBOL' as SortBy);
    const [ searchBy, setSearchBy ] = useState('SYMBOL' as SearchBy);
    const [ order, setOrder ] = useState('ASC' as Order);

    const handleKeyEvent = (e: React.KeyboardEvent<HTMLDivElement>, val: boolean): void => {
        if (e.code === 'Enter') {
            setIsExpanded(val);
        }
    }

    useEffect(() => {
        const watchForClosure = $closeDropdowns
            .subscribe((payload: ClosurePayload[]) => setIsExpanded(
                !payload.includes('ALL') && !payload.includes('SEARCH')));
        return () => {
            watchForClosure.unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (!isExpanded) {
            setIdentities([]);
        }
    }, [ isExpanded ]);

    useEffect(() => {
        if (identities.length > 0) {
            $closeDropdowns.next([ 'NAV' ]);
        }
    }, [ identities ]);

    return (
        <div className={`sticky-menu-option search ${ isExpanded ? 'search-field' : 'search-button' }`}
            aria-expanded={ isExpanded}>
            <div className='search-bar-wrapper'>
                <img src='/assets/icons/magnifying-glass.svg'
                    role={ isExpanded ? 'img' : 'button' }
                    className={`search-icon ${isExpanded ? 'expanded-search-icon' : ''}`}
                    tabIndex={ isExpanded ? -1 : 0}
                    onClick={() => setIsExpanded(true)}
                    onKeyDown={(e) => handleKeyEvent(e, true)}/>
                {
                    isExpanded ? 
                        <>
                            <SearchBar setIdentities={setIdentities}
                                sortBy={sortBy}
                                searchBy={searchBy}
                                order={order}>    
                            </SearchBar>
                            <img role='button'
                                className='exit-button'
                                tabIndex={0}
                                src={`/assets/icons/x.svg`}
                                onClick={() => setIsExpanded(false)}
                                onKeyDown={(e) => handleKeyEvent(e, false)}/>
                        </> : undefined
                }
            </div>
            {
                identities.length > 0 ? 
                    <SearchDropDown identities={identities}
                        setSortBy={ setSortBy }
                        setSearchBy={ setSearchBy }
                        setOrder={ setOrder }>
                    </SearchDropDown> : 
                    undefined
            }
        </div>
    )
  }
  
  export default ExpandableSearch;