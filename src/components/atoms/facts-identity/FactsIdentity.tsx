import SymbolIcon from '../symbol-icon/symbol-icon';
import './FactsIdentity.scss';
import { Identity } from '../../../services/bulk-entities/bulk-entities.typings';

export interface FactsIdentityProps {
    identity: Identity | null
}

function FactsIdentity({ identity }: FactsIdentityProps) {
        
    return (
        <div className='facts-identity-wrapper'>
            {
                !!identity &&
                    <div className='facts-identity'>
                        <SymbolIcon symbol={identity.symbol} size={'MEDIUM'}/>
                        <span className='text-container'>
                            <span className='name'>{ identity.name }</span>
                            <span className='symbol'>{ identity.symbol }</span>
                        </span>
                    </div>
            }
        </div>
    )
}

export default FactsIdentity;