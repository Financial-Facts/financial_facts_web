import { Subject } from 'rxjs/internal/Subject';
import ExpandableSearch from '../../components/expandable-search/expandable-search';
import { ClosurePayload } from '../../components/sticky-menu/StickyMenu';
import './CompanySearchSection.scss'
import { useEffect, useState } from 'react';
import SymbolIcon from '../../components/SymbolIcon/symbol-icon';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { CONSTANTS } from '../../components/constants';
import fetchIdentities from '../../hooks/fetchIdentities';


function CompanySearchSection() {

    const NUM_BACKGROUND_ROWS = 6;
    const SIZE_BACKGROUND_IMG = 50;
    const [identityImages, setIdentityImages] = useState<JSX.Element[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [ isLoadingImages, setIsLoadingImages ] = useState(true);
    const { identities, loading, error } = fetchIdentities({
        startIndex: 0,
        limit: (window.outerWidth / SIZE_BACKGROUND_IMG) * NUM_BACKGROUND_ROWS,
        sortBy: 'SYMBOL',
        order: 'ASC'
    });

    useEffect(() => {  
        if (!loading && !error) {
            setIdentityImages(identities.map(identity =>
                <SymbolIcon 
                    key={identity.cik}
                    symbol={identity.symbol}
                    size='SMALL'
                    setImageNotFound={incrementImagesLoaded}/>))
        }
    }, [ loading ]);

    useEffect(() => {
        if (identityImages.length !== 0 && imagesLoaded === identityImages.length) {
            setIsLoadingImages(false);
        }
    }, [ imagesLoaded ]);

    const incrementImagesLoaded = (_: boolean): void => {
        setImagesLoaded((current) => current + 1);
    }

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