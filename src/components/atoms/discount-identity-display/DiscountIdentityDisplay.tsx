import { Identity } from '../../../services/bulk-entities/bulk-entities.typings';
import SymbolIcon from '../symbol-icon/symbol-icon';
import './DiscountIdentityDisplay.scss';

export interface DiscountIdentityDisplayProps {
    identity: Identity
}

function DiscountIdentityDisplay({ identity }: DiscountIdentityDisplayProps) {

    return (
        <div className='discount-identity-display'>
            <SymbolIcon symbol={identity.symbol} size={'LARGE'}/>
            <div className='text-data'>
                <span className='discount-name'>{ identity.name }</span>
                <div className='discount-identifiers'>
                    <span>{ identity.symbol }</span> - <span>{ identity.cik }</span>
                </div>
            </div>
        </div>
    )
  }
  
  export default DiscountIdentityDisplay;