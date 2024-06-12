import { useMemo, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import SymbolIcon from '../../atoms/symbol-icon/symbol-icon';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import ExpandableSearch from '../expandable-search/expandable-search';
import './CompanySearchSection.scss';
import fetchIdentities from '../../../hooks/fetchIdentities';
import { CONSTANTS } from '../../../constants/constants';
import { IdentityRequest } from '../../../services/bulk-entities/bulk-entities.typings';


function CompanySearchSection() {

    const SIZE_BACKGROUND_IMG = 114; 
    const NUM_BACKGROUND_ROWS = window.outerHeight / SIZE_BACKGROUND_IMG;

    const calculateIdentityLimit = (): number => 
        Math.round((window.outerWidth / SIZE_BACKGROUND_IMG) * NUM_BACKGROUND_ROWS);

    const [ imagesLoaded, setImagesLoaded ] = useState(0);
    const identityRequest: IdentityRequest = useMemo(() => ({
        startIndex: 0,
        limit: calculateIdentityLimit(),
        searchBy: 'SYMBOL',
        sortBy: 'SYMBOL',
        order: 'ASC'
    }), [ SIZE_BACKGROUND_IMG, NUM_BACKGROUND_ROWS ]);

    const { identities } = fetchIdentities(identityRequest);

    const identityImages = useMemo(() => identities.map(identity =>
        <SymbolIcon 
            key={identity.cik}
            symbol={identity.symbol}
            size='SMALL'
            setImageNotFound={() => setImagesLoaded((current) => current + 1)}/>)
    , [ identities ]);

    const isLoadingImages = identityImages.length === 0 || imagesLoaded !== identityImages.length;
    
    return (
        <section className='company-search-section'>
            { isLoadingImages ? <LoadingSpinner size={'LARGE'} color={'PURPLE'}/> : undefined }
            <div className={`${ isLoadingImages ? 'hide' : CONSTANTS.EMPTY}` }>
                <div className='company-search-container'>
                    <div className='company-search-wrapper'>
                        <div className='divider-text'>Search for Public Entities</div>
                        <div className='search-wrapper'>
                            <ExpandableSearch $closeDropdowns={new Subject<ClosurePayload[]>()} isStandalone={true}/>                                
                        </div>
                    </div>
                </div>
                <div className='search-background'>
                    {
                        identityImages
                    }
                </div>
            </div>
        </section>
    )
  }
  
  export default CompanySearchSection;