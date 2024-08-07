import { handleEnterKeyEvent } from '../../../utilities';
import './SearchFormToggle.scss';

export interface SearchFormToggleProps<T extends string> {
    label: string,
    options: ToggleOption<T>[],
    selectedId: T,
    selectedIdSetter: (_: T) => void
}

export interface ToggleOption <T extends string> {
    id: T,
    label: string
}

function SearchFormToggle<T extends string>({
    label,
    options,
    selectedId,
    selectedIdSetter
}: SearchFormToggleProps<T>) {

    const handleToggleClick = () => {
        const optionIndex = options.findIndex(option => option.id === selectedId);
        if (optionIndex !== -1 && optionIndex !== options.length - 1) {
            selectedIdSetter(options[optionIndex + 1].id);
        } else {
            selectedIdSetter(options[0].id);
        }
    }

    const handleToggleChange = (id: T) => {
        const option = options.find(option => option.id === id);
        if (option) {
            selectedIdSetter(option.id);
        }
    }
    
    const renderToggleOptions = () => 
        options.map((option, index) =>
            <div className='toggle-option'
                tabIndex={0}
                key={`${label}-state-${index}`}
                onKeyDown={(e) => handleEnterKeyEvent(e, () => handleToggleChange(option.id))}>
                <input id={`${label}-state-${index}`}
                    className='hide'
                    type="radio"
                    name={label}
                    onChange={ () => handleToggleChange(option.id) }
                    onClick={handleToggleClick}
                    checked={ option.id === selectedId }/>
                <label htmlFor={`${label}-state-${index}`}>{ option.label }</label>
            </div>)

    return (
        <div className='multi-toggle'>  
            <span>
                { label }
            </span>
            <div id={`${label}-toggle-group`} className="switch-toggle switch-3 switch-candy">
                { renderToggleOptions() }
            </div>
        </div>
    )
  }
  
  export default SearchFormToggle;