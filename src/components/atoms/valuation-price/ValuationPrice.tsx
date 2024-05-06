import FormatService from '../../../services/format/format.service';
import './ValuationPrice.scss';

export interface ValuationProps {
    price: number,
    lastUpdated: Date
}

function ValuationPrice({ price, lastUpdated }: ValuationProps) {

    return (
        <div className='valuation-price'>
            <div>
                <h2>Fair Value</h2>
                <span className='value'>{ FormatService.formatToDollarValue(price) }</span>
            </div>
            <div className='last-updated'>
                <h2>Last Updated</h2>
                <span className='value'>{ lastUpdated.toDateString() }</span>
            </div>
        </div>
    )
  }
  
  export default ValuationPrice;