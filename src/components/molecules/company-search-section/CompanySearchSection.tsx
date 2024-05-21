import { useEffect, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import SymbolIcon from '../../atoms/symbol-icon/symbol-icon';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import ExpandableSearch from '../expandable-search/expandable-search';
import './CompanySearchSection.scss';
import fetchIdentities from '../../../hooks/fetchIdentities';
import { CONSTANTS } from '../../../constants/constants';
import { IdentityRequest } from '../../../services/bulk-entities/bulk-entities.typings';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';


function CompanySearchSection() {

    const NUM_BACKGROUND_ROWS = 6;
    const SIZE_BACKGROUND_IMG = 50; 
    const calculateIdentityLimit = (screenWidth: number): number => {
        return Math.round((screenWidth / SIZE_BACKGROUND_IMG) * NUM_BACKGROUND_ROWS);
    }

    const [ identityImages, setIdentityImages ] = useState<JSX.Element[]>([]);
    const [ imagesLoaded, setImagesLoaded ] = useState(0);
    const [ isLoadingImages, setIsLoadingImages ] = useState(true);
    const [ requestIdentity, setRequestIdentity ] = useState<IdentityRequest>({
        startIndex: 0,
        limit: calculateIdentityLimit(window.outerWidth),
        sortBy: 'SYMBOL',
        order: 'ASC'
    });

    const { identities, loading, error } = fetchIdentities(requestIdentity);

    useEffect(() => {
        const resizeSubscription = fromEvent(window, 'resize')
            .pipe(
                map(event => {
                    const target = event.target as Window;
                    return calculateIdentityLimit(target.outerWidth);
                }),
                distinctUntilChanged(),
                debounceTime(CONSTANTS.DEBOUNCE_TIME)
            ).subscribe(identityLimit => setRequestIdentity(current => ({
                ...current,
                limit: identityLimit
            })));
        return () => {
            resizeSubscription.unsubscribe();
        }
    }, []);

    useEffect(() => {  
        console.log(loading);
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