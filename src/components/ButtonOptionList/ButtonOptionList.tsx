import './ButtonOptionList.scss'
import { CONSTANTS } from '../constants';
import { useState } from 'react';

const cleanKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').trim();
}

function ButtonOptionList<T extends string>({ keys, setter, selectedKey, orientation, includeSearch }: {
    keys: T[],
    setter: (v: T) => void,
    selectedKey?: T,
    orientation?: 'vertical',
    includeSearch?: boolean
}) {
    const [ keywordFilter, setKeywordFilter ] = useState(CONSTANTS.EMPTY);

    const renderKeys = () => {
        return keys
            .reduce((acc, key) => {
                const cleanedKey: string = cleanKey(key as string);
                if (keywordFilter && cleanedKey.toLowerCase().includes(keywordFilter.toLowerCase())) {
                    acc.push(key as T);
                } else if (!keywordFilter) {
                    acc.push(key as T);
                }
                return acc;
            }, [] as T[])
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