import { Subject } from 'rxjs/internal/Subject';
import ExpandableSearch from '../../components/expandable-search/expandable-search';
import { ClosurePayload } from '../../components/sticky-menu/StickyMenu';
import './CompanySearchSection.scss'
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { useEffect, useState } from 'react';
import SymbolIcon from '../../components/SymbolIcon/symbol-icon';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { CONSTANTS } from '../../components/constants';

function CompanySearchSection() {

    const NUM_BACKGROUND_ROWS = 6;
    const SIZE_BACKGROUND_IMG = 50;
    const [identityImages, setIdentityImages] = useState<JSX.Element[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {  
        BulkEntitiesService.fetchBulkIdentities({
            startIndex: 0,
            limit: (window.outerWidth / SIZE_BACKGROUND_IMG) * NUM_BACKGROUND_ROWS,
            sortBy: 'SYMBOL',
            order: 'ASC'
        }).then(response => 
                setIdentityImages(response.identities.map(identity =>
                    <SymbolIcon 
                        key={identity.cik}
                        symbol={identity.symbol}
                        size='SMALL'
                        setImageNotFound={incrementImagesLoaded}/>)
        )).catch(err => {
            throw err;
        })
    }, []);

    useEffect(() => {
        if (identityImages.length !== 0 && imagesLoaded === identityImages.length) {
            setIsLoading(false);
        }
    }, [ imagesLoaded ]);

    const incrementImagesLoaded = (_: boolean): void => {
        setImagesLoaded((current) => current + 1);
    }

    return (
        <section className='company-search-section'>
            { isLoading ? <LoadingSpinner size={'LARGE'} color={'PURPLE'}/> : undefined }
            <div className={`${ isLoading ? 'hide' : CONSTANTS.EMPTY}` }>
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