import { useState } from 'react';
import './PriceRange.scss';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export interface Bounds {
    lowerBound: number,
    upperBound: number
}

export interface PriceRangeProps {
    boundSetter: React.Dispatch<React.SetStateAction<Bounds>>,
    minimum: number,
    maximum: number
}

function PriceRange({ boundSetter, minimum, maximum }: PriceRangeProps) {

    const [ bounds, setBounds ] = useState<Bounds>({
        lowerBound: minimum,
        upperBound: maximum
    });

    const updateBounds = (ev: number[]) => {
        const newBounds: Bounds = {
            lowerBound: ev[0],
            upperBound: ev[1]
        }
        boundSetter(newBounds);
        setBounds(newBounds);
    }

    return (
        <div className='price-range'>
            <RangeSlider
                min={minimum}
                max={maximum}
                defaultValue={[minimum, maximum]}
                className={'price-ranges-slider'}
                onInput={updateBounds}/>
            <div className='price-indicators'>
                <span className='bound lower'>${ bounds.lowerBound }</span>
                <span className='bound upper'>${ bounds.upperBound }</span>
            </div>
        </div>
    )
}

export default PriceRange;
