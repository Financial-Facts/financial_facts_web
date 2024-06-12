import MultiSelect from '../../atoms/multi-select/MultiSelect';
import './MultiFunctionSideNav.scss';
import SearchFormToggle from '../../atoms/search-form-toggle/SearchFormToggle';
import SearchFilterInput from '../../atoms/search-filter-input/SearchFilterInput';
import { SideNavItem, SideNavItemType } from './MultiFunctionSideNav.typings';
import PriceRange from '../../atoms/price-range/PriceRange';
import { Orientation } from '../button-option-side-nav/ButtonOptionSideNav';
import SubmitButton from '../submit-button/submit-button';
import { useState } from 'react';
import { Outcome } from '../submit-button/submit-button.typings';


export interface MultiFunctionSideNavProps<T extends string, J extends string> {
    label: string
    items: SideNavItem<T, J>[]
    orientation: Orientation
    labelButtonOnClick?: () => void
}

function MultiFunctionSideNav<T extends string, J extends string>({ 
    label,
    items,
    orientation,
    labelButtonOnClick
}: MultiFunctionSideNavProps<T, J>) {
    const halfSizedItems = new Set<SideNavItemType>(['PRICE_RANGE', 'SEARCH', 'TITLE', 'TOGGLE']);
    const fullSizedItems = new Set<SideNavItemType>(['MULTI_SELECT', 'TOGGLE_GROUP']);
    const [ submitOutcome, setSubmitOutcome ] = useState<Outcome>('neutral');
    let timeout: ReturnType<typeof setTimeout>;

    const handleSetTimer = (): void => {
        clearTimeout(timeout);
        setSubmitOutcome('isSuccess');
        timeout = setTimeout(() => {
            setSubmitOutcome('neutral');
        }, 500);
    }

    const renderSideNavItem = (item: SideNavItem<T, J>) => {
        switch(item.type) {
            case 'MULTI_SELECT': {
                return <MultiSelect<T>
                    options={item.options}
                    value={item.value}
                    selectionSetter={item.selectionSetter}/>
            }
            case 'PRICE_RANGE': {
                return <PriceRange  
                    boundSetter={item.boundSetter}
                    minimum={item.minimum}
                    maximum={item.maximum}
                    value={item.value}/>
            }
            case 'TOGGLE': {
                return <SearchFormToggle<J>
                    label={item.label}
                    selectedId={item.selectedId}
                    options={item.options}
                    selectedIdSetter={item.selectionSetter}/>
            }
            case 'SEARCH': {
                return <SearchFilterInput
                    value={item.value}
                    setKeywordFilter={item.keywordSetter}/>
            }
            case 'TOGGLE_GROUP': {
                return item.toggles.map(toggleConfig => 
                    <SearchFormToggle<J>
                        key={`${toggleConfig.label}`}
                        label={toggleConfig.label}
                        selectedId={toggleConfig.selectedId}
                        options={toggleConfig.options}
                        selectedIdSetter={toggleConfig.selectionSetter}/>)
            }
            default: {
                return undefined;
            }
        }
    }

    const renderFullItemWrapper = (item: SideNavItem<T, J>) => 
        <div key={`${item.label}-multi-select`} className='item'>
            { item.type !== 'TOGGLE' && <span className='item-label'>{ item.label }</span> }
            { renderSideNavItem(item) }
        </div>

    const renderHalfItemsWrapper = (
        a: SideNavItem<T, J>,
        b: SideNavItem<T, J>
    ) => 
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

    const renderSideNavBuckets = (items: SideNavItem<T, J>[]): JSX.Element[] => {
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
            <h2 className='side-nav-label'>
                { label }
                { 
                    !!labelButtonOnClick && 
                        <SubmitButton
                            text='Reset'
                            outcome={submitOutcome}
                            loading={false}
                            onClick={() => {
                                labelButtonOnClick();
                                handleSetTimer();
                            }}/>
                }
            </h2>
            { 
                renderSideNavBuckets(items)
            }
        </div>
    )
  }
  
  export default MultiFunctionSideNav;