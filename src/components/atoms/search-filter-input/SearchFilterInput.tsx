import { useEffect, useState } from 'react';
import { CONSTANTS } from '../../../constants/constants';
import './SearchFilterInput.scss';

export interface SearchFilterInputProps {
    setKeywordFilter: (_: string) => void,
    defaultValue?: string
}

function SearchFilterInput({ setKeywordFilter, defaultValue }: SearchFilterInputProps) {

    const [ value, setValue ] = useState<string>(defaultValue || CONSTANTS.EMPTY);

    useEffect(() => {
        if (defaultValue !== null && defaultValue !== undefined) {
            setValue(defaultValue);
        }
    }, [ defaultValue ]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        const updatedValue = (e.target as HTMLInputElement).value;
        setKeywordFilter(updatedValue);
        setValue(updatedValue);
    };

    return (
        <input className='league-spartan data-search-bar'
            type='text'
            placeholder='Filter by keyword...'
            value={value}
            onInput={handleInput}/>
    );
  }
  
  export default SearchFilterInput