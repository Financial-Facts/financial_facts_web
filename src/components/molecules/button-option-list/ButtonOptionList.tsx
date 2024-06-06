import { useEffect, useState } from 'react';
import './ButtonOptionList.scss';
import { CONSTANTS } from '../../../constants/constants';
import { cleanKey } from '../../../utilities';
import { Orientation } from '../button-option-side-nav/ButtonOptionSideNav';
import SearchFilterInput from '../../atoms/search-filter-input/SearchFilterInput';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';

export interface ButtonOptionListProps <T extends string> {
    keys: T[],
    setter: (v: T | undefined) => void,
    title?: string,
    selectedKey?: T,
    orientation: Orientation,
    includeSearch?: boolean,
    deselectable?: boolean,
    isScrollable?: boolean,
    isFoldable?: boolean,
    onFoldedElement?: JSX.Element
}

function ButtonOptionList<T extends string>({
    keys,
    setter,
    title,
    selectedKey,
    orientation,
    includeSearch,
    deselectable,
    isScrollable,
    isFoldable,
    onFoldedElement
}: ButtonOptionListProps<T>) {
    const [ keywordFilter, setKeywordFilter ] = useState(CONSTANTS.EMPTY);
    const [ isUnfolded, setIsUnfolded ] = useState<boolean>(true);

    useEffect(() => {
        if (isFoldable && selectedKey) {
            setIsUnfolded(false);
        }
    }, [ selectedKey ]);

    const renderKeys = () => {
        return keys
            .reduce<T[]>((acc, key) => {
                const cleanedKey: string = cleanKey(key);
                if (keywordFilter && cleanedKey.toLowerCase().includes(keywordFilter.toLowerCase())) {
                    acc.push(key);
                } else if (!keywordFilter) {
                    acc.push(key);
                }
                return acc;
            }, [])
            .map(key => 
                (<button role='listitem'
                    tabIndex={0}
                    key={key}
                    className={`league-spartan key ${ key === selectedKey ? 'active' : CONSTANTS.EMPTY}`}
                    onClick={() => {
                        if (deselectable && selectedKey === key) {
                            setter(undefined);
                        } else {
                            setter(key)
                        }
                    }}>
                    { cleanKey(key) }
                </button>));
    }

    return (
        <>
            { 
                !!title && 
                    <div className='options-title-wrapper'>
                        <span className={`title-text ${ isUnfolded ? CONSTANTS.EMPTY : 'folded'}`}>
                            { isUnfolded ? title : selectedKey ? cleanKey(selectedKey) : title }
                        </span>
                        { !!isFoldable && !isUnfolded &&
                            <SvgIcon
                                src='/assets/edit.svg'
                                height='16px'
                                width='16px'
                                isButton={true}
                                onClick={() => setIsUnfolded(current => !current)}
                                color='#8C19D3'/>}
                    </div> 
            }
            {
                isUnfolded ?
                    <div className='key-group-wrapper'>
                        {
                            includeSearch &&
                                <SearchFilterInput setKeywordFilter={setKeywordFilter}/>
                        }
                        <ul className={`key-group
                            ${isScrollable ? 'vertical scrollable' : orientation}`}>
                            { renderKeys() }
                        </ul>
                    </div> :
                    onFoldedElement
            }
        </>
    )
  }
  
  export default ButtonOptionList;