import { useState } from 'react';
import './ButtonOptionList.scss';
import { CONSTANTS } from '../../../constants/constants';
import { cleanKey } from '../../../utilities';
import { Orientation } from '../../molecules/button-option-side-nav/ButtonOptionSideNav';

export interface ButtonOptionListProps <T extends string> {
    keys: T[],
    setter: (v: T | undefined) => void,
    title?: string,
    selectedKey?: T,
    orientation: Orientation,
    includeSearch?: boolean,
    deselectable?: boolean
}

function ButtonOptionList<T extends string>({
    keys,
    setter,
    title,
    selectedKey,
    orientation,
    includeSearch,
    deselectable
}: ButtonOptionListProps<T>) {
    const [ keywordFilter, setKeywordFilter ] = useState(CONSTANTS.EMPTY);
    
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
            { !!title && <span className='title-text'>{ title }</span> }
            <div className='key-group-wrapper'>
                {
                    includeSearch &&
                        <input className='league-spartan data-search-bar'
                            type='text'
                            placeholder='Filter by keyword...'
                            onInput={ (e) => setKeywordFilter((e.target as HTMLInputElement).value) }/>
                }
                <ul className={`key-group
                    ${orientation}`}>
                    { renderKeys() }
                </ul>
            </div>
        </>
    )
  }
  
  export default ButtonOptionList;