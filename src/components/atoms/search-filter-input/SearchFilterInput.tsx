import './SearchFilterInput.scss';

export interface SearchFilterInputProps {
    setKeywordFilter: (_: string) => void
}

function SearchFilterInput({ setKeywordFilter }: SearchFilterInputProps) {

    return (
        <input className='league-spartan data-search-bar'
            type='text'
            placeholder='Filter by keyword...'
            onInput={ (e) => setKeywordFilter((e.target as HTMLInputElement).value) }/>
    );
  }
  
  export default SearchFilterInput