import makeAnimated from 'react-select/animated';
import Select, { MultiValue } from 'react-select';

export interface Option {
    value: string;
    label: string;
    isFixed?: boolean;
    isDisabled?: boolean;
  }

export interface MultiSelectProps { 
    options: Option[],
    defaultSelected: Option[],
    selectionSetter: (_: MultiValue<Option>) => void
}


function MultiSelect({ options, defaultSelected, selectionSetter }: MultiSelectProps) {

    const animatedComponents = makeAnimated();
    
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={defaultSelected}
            isMulti={true}
            options={options}
            isClearable={false}
            onChange={selectionSetter}/>
    )
  }
  
  export default MultiSelect;
