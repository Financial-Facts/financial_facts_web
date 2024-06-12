import './SearchFilterInput.scss';

export interface SearchFilterInputProps {
    setKeywordFilter: (_: string) => void,
    value: string
}

function SearchFilterInput({ setKeywordFilter, value }: SearchFilterInputProps) {

    const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        const updatedValue = (e.target as HTMLInputElement).value;
        setKeywordFilter(updatedValue);
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