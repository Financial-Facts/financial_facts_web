import './SearchDropDown.scss';
import { Identity, Order, SearchBy, SortBy } from '../../services/bulk-entities/bulk-entities.typings';
import SearchFormToggle from '../search-form-toggle/SearchFormToggle';

function SearchDropDown({ identities, setSortBy, setSearchBy, setOrder }: {
    identities: Identity[],
    setSortBy: (sortBy: SortBy) => void,
    setSearchBy: (searchBy: SearchBy) => void,
    setOrder: (order: Order) => void
}) {

    const renderDropDownItems = () => {
        return identities.map(identity =>
            <li className='identity-item' key={identity.cik}>
                { `${identity.symbol} - ${identity.name}` }
            </li>)
    }

    return (
        <>
            <div className='dividing-line'></div>
                <SearchFormToggle <SearchBy>
                    name={'searchBy'}
                    defaultId='NAME'
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
                    setter={ setSearchBy }>    
                </SearchFormToggle>
                <SearchFormToggle <SortBy>
                    name={'sortBy'}
                    defaultId='SYMBOL'
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
                    setter={ setSortBy }>    
                </SearchFormToggle>
                <SearchFormToggle <Order>
                    name={'order'}
                    defaultId='ASC'
                    options={[{
                        id: 'ASC',
                        input: 'ASC'
                    }, {
                        id: 'DESC',
                        input: 'DESC'
                    }]} 
                    setter={ setOrder }>    
                </SearchFormToggle>
            <div className='dividing-line'></div>
            <ul className='results-dropdown'>
                { renderDropDownItems() }
            </ul>
        </>
    )
  }
  
  export default SearchDropDown;