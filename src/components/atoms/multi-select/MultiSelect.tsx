import { CONSTANTS } from '../../../constants/constants';
import listenForWindowClick from '../../../hooks/listenForWindowClick';
import SvgIcon from '../svg-icon/SvgIcon';
import './MultiSelect.scss';
import { useRef, useState } from "react";

export interface Option<T extends string> {
    id: T;
    name: string;
  }

export interface MultiSelectProps<T extends string> { 
    options: Option<T>[],
    value: Option<T>[],
    selectionSetter: (_: Option<T>[]) => void
}


function MultiSelect<T extends string>({ options, value, selectionSetter }: MultiSelectProps<T>) {

    const [ isExpanded, setIsExpanded ] = useState(false);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);

    listenForWindowClick(() => {
        setIsExpanded(false);
    }, multiSelectRef.current);

    const handleSelectionChanges = (checked: boolean, option: Option<T>) => {
        if (checked) {
            selectionSetter([...value, option])
        } else {
            selectionSetter(value.filter(selected => selected.id !== option.id));
        }
    }

    return (
        <div className={`multi-select ${isExpanded ? 'expanded': CONSTANTS.EMPTY}`}
            ref={multiSelectRef}>
            <button className="league-spartan dropdown-button"
                onClick={() => setIsExpanded(current => !current)}>
                {
                    value.length === 0 ?
                        'Select options' :
                    value.length === 1 ?
                        value[0].name :
                        `Selected (${value.length})`
                }
                <SvgIcon
                    src={'/assets/dropdown-icon.svg'}
                    height={'100%'}
                    width={'25px'}/>
            </button>
            {
                isExpanded && (
                    <div className="dropdown">
                        {
                          options.map(option =>
                              <div className="dropdown-option" key={option.id}>
                                <input type="checkbox"
                                    id={option.id}
                                    name={ option.name }
                                    checked={ value.some(selectedValue => selectedValue.id === option.id )}
                                    onChange={(e) => handleSelectionChanges(e.target.checked, option)}/>
                                <label htmlFor={option.id}>{ option.name }</label>
                              </div>)
                        }
                    </div>
                )
            }
        </div>
    )
  }
  
  export default MultiSelect;
