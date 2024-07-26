import { useMemo, useRef, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import SymbolIcon from '../../atoms/symbol-icon/symbol-icon';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import ExpandableSearch from '../expandable-search/expandable-search';
import './CompanySearchSection.scss';
import fetchIdentities from '../../../hooks/fetchIdentities';
import { IdentityRequest } from '../../../services/bulk-entities/bulk-entities.typings';
import LinearLoopAnimation from '../../atoms/linear-loop-animation/LinearLoopAnimation';
import { CONSTANTS } from '../../../constants/constants';

export interface CompanySearchSectionProps {
    isStandalone?: boolean
}

function CompanySearchSection({ isStandalone = true }: CompanySearchSectionProps) {

    const SIZE_BACKGROUND_IMG = 114;
    const BACKGROUND_MAX_HEIGHT = 500;
    const BACKGROUND_MAX_WIDTH = 1150;

    const NUM_BACKGROUND_ROWS = Math.ceil(BACKGROUND_MAX_HEIGHT / SIZE_BACKGROUND_IMG);
    const NUM_BACKGROUNDS_COLUMNS = Math.ceil((BACKGROUND_MAX_WIDTH / SIZE_BACKGROUND_IMG));
    const backgroundRef = useRef<HTMLDivElement | null>(null);

    const calculateIdentityLimit = (): number => 
        Math.ceil(NUM_BACKGROUNDS_COLUMNS * NUM_BACKGROUND_ROWS * 1.25);

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

    const isLoadingImages = identityImages.length === 0 || imagesLoaded < NUM_BACKGROUND_ROWS * NUM_BACKGROUNDS_COLUMNS;
    
    const symbolsRows = useMemo(() => {
        if (backgroundRef.current) {
            let result: JSX.Element[] = [];
            for (let x = 0; x < NUM_BACKGROUND_ROWS; x++) {
                result.push(
                    <LinearLoopAnimation
                        key={`symbol-row-${x}`}
                        duration='60s'
                        direction={ x % 2 === 0 ? 'reverse' : 'forward' }
                        element={
                            <div className='symbol-row'>
                                { identityImages.slice(x * NUM_BACKGROUNDS_COLUMNS, (x + 1) * NUM_BACKGROUNDS_COLUMNS) }
                            </div>
                        }/>
                )
            }
            return result;
        }
    }, [ identityImages, backgroundRef.current ]);

    return (
        <section className='company-search-section'>
            { isLoadingImages ? <LoadingSpinner size={'LARGE'} color={'PURPLE'} minHeight={500}/> : undefined }
            <div className={`${ isLoadingImages ? 'hide' : 'content-container'}` }>
                <div className={`search-background
                    ${ isStandalone ? 'standalone-search-background' : CONSTANTS.EMPTY}`}
                    ref={backgroundRef}>
                    { symbolsRows }
                </div>
                <div className='company-search-container'>
                    <div className='company-search-wrapper'>
                        <ExpandableSearch $closeDropdowns={new Subject<ClosurePayload[]>()} isStandalone={true}/> 
                    </div>
                </div>
            </div>
        </section>
    )
  }
  
  export default CompanySearchSection;