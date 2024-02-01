import './SearchFormToggle.scss';

export interface ToggleOption <T> {
    id: string,
    input: T
}

function SearchFormToggle<T>({ name, defaultId, options, setter }: {
    name: string,
    defaultId: string,
    options: ToggleOption<T>[],
    setter: (_: T) => void
}) {

    const handleToggleChange = (id: string) => {
        const option = options.find(option => option.id === id);
        if (option) {
            setter(option.input);
        }
    }
    
    const renderToggleOptions = () => {
        return options.map((option, index) =>
        <div className='toggle-option' key={`${name}-state-${index}`}>
            <input id={`${name}-state-${index}`}
                type="radio"
                name={name}
                onChange={ () => handleToggleChange(option.id) }
                defaultChecked={ option.id === defaultId }/>
            <label htmlFor={`${name}-state-${index}`}>{ option.id }</label>
        </div>)
    }

    return (
        <div className="switch-toggle switch-3 switch-candy">
           { renderToggleOptions() }
      </div>
    )
  }
  
  export default SearchFormToggle;