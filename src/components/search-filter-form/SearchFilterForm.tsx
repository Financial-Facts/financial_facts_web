import './SearchFilterForm.scss';
import { Order, SearchBy, SortBy } from '../../services/bulk-entities/bulk-entities.typings';
import SearchFormToggle from '../search-form-toggle/SearchFormToggle';
import { useEffect, useState } from 'react';
import { SearchCriteria, SearchCriteriaAction } from '../expandable-search/expandable-search.typings';

export interface SearchFilterFormProps {
    searchCriteria: SearchCriteria,
    dispatch: (action: SearchCriteriaAction) => void,
    renderDelay: number
 }

function SearchFilterForm({ searchCriteria, dispatch, renderDelay }: SearchFilterFormProps) {
    const [ displayForm, setDisplayForm ] = useState(false);
    let timeout: ReturnType<typeof setTimeout>;

    useEffect(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setDisplayForm(true);
        }, renderDelay);
    }, []);

    return (
        displayForm ?
            <form className='search-filter-form' key={`${JSON.stringify(searchCriteria)}`}>
                <SearchFormToggle <SearchBy>
                    name={'searchBy'}
                    label='Search by...'
                    defaultId={searchCriteria.searchBy}
                    options={[{
                        id: 'SYMBOL',
                        input: 'SYMBOL'
                    }, {
                        id: 'NAME',
                        input: 'NAME'
                    }, {
                        id: 'CIK',
                        input: 'CIK'
                    }]} 
                    setter={ (searchBy => {
                        dispatch({
                            type: 'set_search_by',
                            payload: { searchBy }
                        })
                    }) }>    
                </SearchFormToggle>
                <SearchFormToggle <SortBy>
                    name={'sortBy'}
                    label='Sort by...'
                    defaultId={searchCriteria.sortBy}
                    options={[{
                        id: 'SYMBOL',
                        input: 'SYMBOL'
                    }, {
                        id: 'NAME',
                        input: 'NAME'
                    }, {
                        id: 'CIK',
                        input: 'CIK'
                    }]} 
                    setter={ (sortBy => {
                        dispatch({
                            type: 'set_sort_by',
                            payload: { sortBy }
                        })
                    }) }>    
                </SearchFormToggle>
                <SearchFormToggle <Order>
                    name={'order'}
                    label='Order by...'
                    defaultId={searchCriteria.order}
                    options={[{
                        id: 'ASC',
                        input: 'ASC'
                    }, {
                        id: 'DESC',
                        input: 'DESC'
                    }]} 
                    setter={ (order => {
                        dispatch({
                            type: 'set_order',
                            payload: { order }
                        })
                    }) }>    
                </SearchFormToggle>
            </form> :
            undefined
    )
  }
  
  export default SearchFilterForm;