import './ButtonOptionList.scss'
import { CONSTANTS } from '../constants';
import { useState } from 'react';

export interface ButtonOptionListProps <T extends string> {
    keys: T[],
    setter: (v: T) => void,
    selectedKey?: T,
    orientation?: 'vertical',
    includeSearch?: boolean
}

function ButtonOptionList<T extends string>({
    keys,
    setter,
    selectedKey,
    orientation,
    includeSearch 
}: ButtonOptionListProps<T>) {
    const [ keywordFilter, setKeywordFilter ] = useState(CONSTANTS.EMPTY);

    const cleanKey = (key: string): string => {
        return key.replace(/([A-Z])/g, ' $1').trim();
    }
    
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
                    className={`key ${ key === selectedKey ? 'active' : CONSTANTS.EMPTY}`}
                    onClick={() => setter(key)}>
                    { cleanKey(key) }
                </button>));
    }

    return (
        <>
            {
                includeSearch ? 
                    <input className='data-search-bar'
                        type='text'
                        placeholder='Filter by keyword...'
                        onInput={ (e) => setKeywordFilter((e.target as HTMLInputElement).value) }/> :
                    undefined
            }
            <ul className={`key-group
                ${orientation ? orientation : CONSTANTS.EMPTY}`}>
                { renderKeys() }
            </ul>
        </>
    )
  }
  
  export default ButtonOptionList;