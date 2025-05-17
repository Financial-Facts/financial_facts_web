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
    value: number[]
}

function PriceRange({ boundSetter, minimum, maximum, value }: PriceRangeProps) {

    const updateBounds = (ev: number[]) => {
        boundSetter({
            lowerBound: ev[0],
            upperBound: ev[1]
        });
    }

    return (
        <div className='price-range'>
            <RangeSlider
                min={minimum}
                max={maximum}
                value={value}
                className={'price-ranges-slider'}
                onInput={updateBounds}/>
            <div className='price-indicators'>
                <input
                    type='number'
                    className='league-spartan bound lower'
                    value={value[0]}
                    onChange={ev => updateBounds([Number(ev.target.value), value[1]])}/>
                <input
                    type='number'
                    className='league-spartan bound upper'
                    value={value[1]}
                    onChange={ev => updateBounds([value[0], Number(ev.target.value)])}/>
            </div>
        </div>
    )
}

export default PriceRange;
