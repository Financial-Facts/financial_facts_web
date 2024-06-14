import { Identity } from '../../../services/bulk-entities/bulk-entities.typings';
import SymbolIcon from '../symbol-icon/symbol-icon';
import './FactsIdentity.scss';
import ZeroState from '../zero-state/ZeroState';

export interface FactsIdentityProps {
    identity: Identity
}

function FactsIdentity({ identity }: FactsIdentityProps) {

    return (
        !!identity ? 
            <div className='facts-identity'>
                <span className='text-container'>
                    <span className='name'>{ identity.name }</span>
                    <span className='symbol'>{ identity.symbol }</span>
                </span>
                <SymbolIcon symbol={identity.symbol} size={'MEDIUM'}/>
            </div> :
            <ZeroState message={'Error'} supportText={'Error occurred while fetching company identity details'}/>
    )
}

export default FactsIdentity;