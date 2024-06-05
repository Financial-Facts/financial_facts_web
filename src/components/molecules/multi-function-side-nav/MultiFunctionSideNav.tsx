import MultiSelect from '../../atoms/multi-select/MultiSelect';
import './MultiFunctionSideNav.scss';
import SearchFormToggle from '../../atoms/search-form-toggle/SearchFormToggle';
import SearchFilterInput from '../../atoms/search-filter-input/SearchFilterInput';
import { SideNavItem, SideNavItemType } from './MultiFunctionSideNav.typings';
import PriceRange from '../../atoms/price-range/PriceRange';
import { Orientation } from '../button-option-side-nav/ButtonOptionSideNav';


export interface MultiFunctionSideNavProps {
    label: string
    items: SideNavItem[]
    orientation: Orientation
}

function MultiFunctionSideNav({ label, items, orientation }: MultiFunctionSideNavProps) {
    const halfSizedItems = new Set<SideNavItemType>(['PRICE_RANGE', 'SEARCH', 'TITLE', 'TOGGLE']);
    const fullSizedItems = new Set<SideNavItemType>(['MULTI_SELECT', 'TOGGLE_GROUP']);

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

    const renderFullItemWrapper = (item: SideNavItem) => 
        <div key={`${item.label}-multi-select`} className='item'>
            { item.type !== 'TOGGLE' && <span className='item-label'>{ item.label }</span> }
            { renderSideNavItem(item) }
        </div>

    const renderHalfItemsWrapper = (a: SideNavItem, b: SideNavItem) => 
        <div key={`${a.label}-${b.label}-multi-select`} className='item two-halves-item'>
            <div>
                { a.type !== 'TOGGLE' && <span className='item-label'>{ a.label }</span> }
                { renderSideNavItem(a) }
            </div>
            <div>
                { b.type !== 'TOGGLE' && <span className='item-label'>{ b.label }</span> }
                { renderSideNavItem(b) }
            </div>
        </div>

    const renderSideNavBuckets = (items: SideNavItem[]): JSX.Element[] => {
        const result: JSX.Element[] = [];
        let i = 0;
        while (i < items.length) {
            const item = items[i];
            if (fullSizedItems.has(item.type)) {
                result.push(renderFullItemWrapper(item));
            } else if (i + 1 < items.length && halfSizedItems.has(items[i + 1].type)) {
                result.push(renderHalfItemsWrapper(item, items[i + 1]));
                i++;
            } else {
                result.push(renderFullItemWrapper(item))
            }
            i++;
        }
        return result;
    }

    return (
        <div className={`multi-side-nav multi-function-${orientation}`}>
            <h2 className='side-nav-label'>{ label }</h2>
            { 
                renderSideNavBuckets(items)
            }
        </div>
    )
  }
  
  export default MultiFunctionSideNav;