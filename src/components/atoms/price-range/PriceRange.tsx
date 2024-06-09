import { useEffect, useState } from 'react';
import './PriceRange.scss';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export interface Bounds {
    lowerBound: number,
    upperBound: number
}

export interface PriceRangeProps {
    boundSetter: (bounds: Bounds) => void,
    minimum: number,
    maximum: number,
    defaultValues: number[]
}

function PriceRange({ boundSetter, minimum, maximum, defaultValues }: PriceRangeProps) {

    const [ values, setValues ] = useState<number[]>(defaultValues);

    const updateBounds = (ev: number[]) => {
        const newBounds: Bounds = {
            lowerBound: ev[0],
            upperBound: ev[1]
        }
        boundSetter(newBounds);
        setValues(ev);
    }

    useEffect(() => {
        setValues(defaultValues);   
    }, [ defaultValues ]);

    return (
        <div className='price-range'>
            <RangeSlider
                min={minimum}
                max={maximum}
                value={values}
                className={'price-ranges-slider'}
                onInput={updateBounds}/>
            <div className='price-indicators'>
                <span className='bound lower'>${ values[0] }</span>
                <span className='bound upper'>${ values[1] }</span>
            </div>
        </div>
    )
}

export default PriceRange;
