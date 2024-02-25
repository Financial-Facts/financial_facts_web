import { Subject } from 'rxjs/internal/Subject';
import ExpandableSearch from '../../components/expandable-search/expandable-search';
import { ClosurePayload } from '../../components/sticky-menu/StickyMenu';
import './CompanySearchSection.scss'
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { useEffect, useId, useState } from 'react';
import { Identity } from '../../services/bulk-entities/bulk-entities.typings';
import ResizeObserverService from '../../services/resize-observer-service/resize-observer.service';
import { initRef } from '../../utilities';

function CompanySearchSection() {

    const NUM_BACKGROUND_ROWS = 10;
    const SIZE_BACKGROUND_IMG = 50;
    const SIZE_BACKGROUND_GAP = 64;
    const [identities, setIdentities] = useState([] as Identity[]);
    const [backgroundRef, setBackgroundRef] = useState(null as HTMLDivElement | null);
    const [width, setWidth] = useState(window.innerWidth);
    let identityIndex = 0;

    useEffect(() => {  
        BulkEntitiesService.fetchBulkIdentities({
            startIndex: 0,
            limit: (window.outerWidth / SIZE_BACKGROUND_IMG) * NUM_BACKGROUND_ROWS,
            sortBy: 'SYMBOL',
            order: 'ASC'
        }).then(response => setIdentities(response.identities));
    }, []);

    useEffect(() => {
        if (backgroundRef) {
            const observerId = ResizeObserverService.onWidthChange(backgroundRef, () => {
                setWidth(window.innerWidth);
            });
            return (() => {
                ResizeObserverService.disconnectObserver(observerId);
            })
        }
    }, [backgroundRef]);

    const buildBackgroundRow = (numImages: number) => {
        const images: JSX.IntrinsicElements['img'][] = [];
        let imageIndex = 0;
        while (imageIndex < numImages && identityIndex < identities.length) {
            images.push(<img className='background-image'
                loading='lazy'
                height={SIZE_BACKGROUND_IMG}
                src={`https://financialmodelingprep.com/image-stock/${identities[identityIndex].symbol}.png`}/>);
            imageIndex += 1;
            identityIndex += 1;
        }
        return images;
    }

    const renderBackgroundRows = () => {
        const result: JSX.IntrinsicElements['div'][] =[];
        for (let i = 0; i < NUM_BACKGROUND_ROWS; i++) {
            let numImages = (window.innerWidth - 64) / (SIZE_BACKGROUND_IMG  + SIZE_BACKGROUND_GAP);
            if (result.length % 2 !== 0) {
                numImages = numImages - 1;
            }
            result.push(
                <div key={useId()} className='background-row'>
                    {
                        buildBackgroundRow(numImages).map(image => <>
                            { image }
                        </>)
                    }
                </div>
            );
        }
        return result;
    }

    return (
        <section className='company-search-section'>
            <div className='company-search-container'>
                <div className='company-search-wrapper'>
                    <div className='divider-text'>Search for Public Entities</div>
                    <div className='search-wrapper'>
                        <ExpandableSearch $closeDropdowns={new Subject<ClosurePayload[]>()} isStandalone={true}/>                                
                    </div>
                </div>
            </div>
            <div className='search-background'
                ref={(ref) => initRef(ref, setBackgroundRef)}
                key={width}>
                {
                    renderBackgroundRows().map(row => <>
                        { row }
                    </>)
                }
            </div>
        </section>
    )
  }
  
  export default CompanySearchSection;