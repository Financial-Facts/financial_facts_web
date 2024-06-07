import makeAnimated from 'react-select/animated';
import Select, { MultiValue } from 'react-select';

export interface Option<T extends string> {
    value: T;
    label: string;
    isFixed?: boolean;
    isDisabled?: boolean;
  }

export interface MultiSelectProps<T extends string> { 
    options: Option<T>[],
    defaultSelected: Option<T>[],
    selectionSetter: (_: MultiValue<Option<T>>) => void
}


function MultiSelect<T extends string>({ options, defaultSelected, selectionSetter }: MultiSelectProps<T>) {

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
