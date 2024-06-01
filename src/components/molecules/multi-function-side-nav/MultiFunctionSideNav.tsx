import MultiSelect from '../../atoms/multi-select/MultiSelect';
import './MultiFunctionSideNav.scss';
import SearchFormToggle from '../../atoms/search-form-toggle/SearchFormToggle';
import SearchFilterInput from '../../atoms/search-filter-input/SearchFilterInput';
import { SideNavItem } from './MultiFunctionSideNav.typings';
import PriceRange from '../../atoms/price-range/PriceRange';
import { Orientation } from '../button-option-side-nav/ButtonOptionSideNav';


export interface MultiFunctionSideNavProps {
    label: string
    items: SideNavItem[]
    orientation: Orientation
}

function MultiFunctionSideNav({ label, items, orientation }: MultiFunctionSideNavProps) {

    const renderSideNavItem = (item: SideNavItem) => {
        switch(item.type) {
            case 'MULTI_SELECT': {
                return <MultiSelect
                    options={item.options}
                    defaultSelected={item.defaultSelected}
                    selectionSetter={item.selectionSetter}/>
            }
            case 'PRICE_RANGE': {
                return <PriceRange  
                    boundSetter={item.boundSetter}
                    minimum={item.minimum}
                    maximum={item.maximum}
                    defaultValues={item.defaultValues}/>
            }
            case 'TOGGLE': {
                return <SearchFormToggle
                    name={item.label}
                    label={item.label}
                    defaultId={item.defaultSelected}
                    options={item.options}
                    setter={item.selectionSetter}/>
            }
            case 'SEARCH': {
                return <SearchFilterInput
                    defaultValue={item.defaultValue}
                    setKeywordFilter={item.keywordSetter}/>
            }
            case 'TOGGLE_GROUP': {
                return item.toggles.map(toggleConfig => 
                    <SearchFormToggle
                        key={`${toggleConfig.label}`}
                        name={toggleConfig.label}
                        label={toggleConfig.label}
                        defaultId={toggleConfig.defaultSelected}
                        options={toggleConfig.options}
                        setter={toggleConfig.selectionSetter}/>)
            }
            default: {
                return undefined;
            }
        }
    }

    return (
        <div className={`multi-side-nav multi-function-${orientation}`}>
            <h2 className='side-nav-label'>{ label }</h2>
            { 
                items.map(item => 
                    <div key={`${item.label}-multi-select`} className='item'>
                        { item.type !== 'TOGGLE' && <span className='item-label'>{ item.label }</span> }
                        { renderSideNavItem(item) }
                    </div>)
            }
        </div>
    )
  }
  
  export default MultiFunctionSideNav;