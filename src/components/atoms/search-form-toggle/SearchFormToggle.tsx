import { handleEnterKeyEvent } from '../../../utilities';
import './SearchFormToggle.scss';

export interface SearchFormToggleProps<T> {
    name: string,
    label: string,
    defaultId: string,
    options: ToggleOption<T>[],
    setter?: (_: T) => void
}

export interface ToggleOption <T> {
    id: string,
    input: T
}

function SearchFormToggle<T>({ name, label, defaultId, options, setter }: SearchFormToggleProps<T>) {

    const handleToggleChange = (id: string) => {
        const option = options.find(option => option.id === id);
        if (option && setter) {
            setter(option.input);
        }
    }
    
    const renderToggleOptions = () => {
        return options.map((option, index) =>
        <div className='toggle-option'
            tabIndex={0}
            key={`${name}-state-${index}`}
            onKeyDown={(e) => handleEnterKeyEvent(e, () => handleToggleChange(option.id))}>
            <input id={`${name}-state-${index}`}
                className='hide'
                type="radio"
                name={name}
                onChange={ () => handleToggleChange(option.id) }
                defaultChecked={ option.id === defaultId }/>
            <label htmlFor={`${name}-state-${index}`}>{ option.id }</label>
        </div>)
    }

    return (
        <div className='multi-toggle'>  
            <span>
                { label }
            </span>
            <div id={`${name}-toggle-group`} className="switch-toggle switch-3 switch-candy">
                { renderToggleOptions() }
            </div>
        </div>
    )
  }
  
  export default SearchFormToggle;