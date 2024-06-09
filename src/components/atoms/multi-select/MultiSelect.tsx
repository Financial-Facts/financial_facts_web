import makeAnimated from 'react-select/animated';
import Select, { MultiValue } from 'react-select';
import { useEffect, useState } from 'react';

export interface Option<T extends string> {
    value: T;
    label: string;
    isFixed?: boolean;
    isDisabled?: boolean;
  }

export interface MultiSelectProps<T extends string> { 
    options: Option<T>[],
    defaultSelected: MultiValue<Option<T>>,
    selectionSetter: (_: MultiValue<Option<T>>) => void
}


function MultiSelect<T extends string>({ options, defaultSelected, selectionSetter }: MultiSelectProps<T>) {

    const animatedComponents = makeAnimated();
    const [ value, setValue ] = useState<MultiValue<Option<T>>>(defaultSelected);

    useEffect(() => {
      setValue(defaultSelected);
    }, [ defaultSelected ]);

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={value}
            isMulti={true}
            options={options}
            isClearable={false}
            onChange={(val) => {
              setValue(val);
              selectionSetter(val);
            }}/>
    )
  }
  
  export default MultiSelect;
