import { useState } from 'react';
import SearchFormToggle from '../../atoms/search-form-toggle/SearchFormToggle';
import './SearchFilterForm.scss';
import { SearchBy, SortBy, Order, IdentityRequest } from '../../../services/bulk-entities/bulk-entities.typings';
import { IdentityRequestAction } from '../expandable-search/reducers/identity-request.reducer';

export interface SearchFilterFormProps {
    identityRequest: IdentityRequest,
    identityRequestDispatch: React.Dispatch<IdentityRequestAction>,
    renderDelay: number
 }

function SearchFilterForm({ identityRequest, identityRequestDispatch, renderDelay }: SearchFilterFormProps) {
    const [ displayForm, setDisplayForm ] = useState(false);

    setTimeout(() => {
        setDisplayForm(true);
    }, renderDelay);

    return (
        displayForm &&
            <form className='search-filter-form'>
                <SearchFormToggle <SearchBy>
                    label='Search by...'
                    selectedId={identityRequest.searchBy}
                    options={[{
                        id: 'SYMBOL',
                        label: 'SYMBOL'
                    }, {
                        id: 'NAME',
                        label: 'NAME'
                    }, {
                        id: 'CIK',
                        label: 'CIK'
                    }]} 
                    selectedIdSetter={ (searchBy => {
                        identityRequestDispatch({
                            type: 'set_search_by',
                            payload: searchBy
                        })
                    }) }/>
                <SearchFormToggle <SortBy>
                    label='Sort by...'
                    selectedId={identityRequest.sortBy}
                    options={[{
                        id: 'SYMBOL',
                        label: 'SYMBOL'
                    }, {
                        id: 'NAME',
                        label: 'NAME'
                    }, {
                        id: 'CIK',
                        label: 'CIK'
                    }]} 
                    selectedIdSetter={ (sortBy => {
                        identityRequestDispatch({
                            type: 'set_sort_by',
                            payload: sortBy
                        })
                    })}/>
                <SearchFormToggle <Order>
                    label='Order by...'
                    selectedId={identityRequest.order}
                    options={[{
                        id: 'ASC',
                        label: 'ASC'
                    }, {
                        id: 'DESC',
                        label: 'DESC'
                    }]} 
                    selectedIdSetter={ (order => {
                        identityRequestDispatch({
                            type: 'set_order',
                            payload: order
                        })
                    }) }/>
            </form>
    )
  }
  
  export default SearchFilterForm;