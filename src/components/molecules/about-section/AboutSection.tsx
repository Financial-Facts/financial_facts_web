import { messaging } from '../../../constants/messaging';
import './AboutSection.scss';
import { CONSTANTS } from '../../../constants/constants';
import BlockSectionsDisplay from '../block-sections-display/BlockSectionsDisplay';
import { useEffect } from 'react';

function AboutSection() {

    const philosophyImageSrc = '/assets/coffee-image.png';
    const originsImageSrc = '/assets/glasses-image.png';

    useEffect(() => {
        // Preload images to prevent pop-in when component mounts
        const imageUrls = [philosophyImageSrc, originsImageSrc];
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }, []);

    return <section className='about-section'>
        <div className='about-information'>
            <div className='philosophy-block'>
                <img src={philosophyImageSrc} className='support-img'/>
                <div className='text-container'>
                    <h3>Philosophy</h3>
                    <p>{ messaging.aboutUs }</p>
                </div>
            </div>
            <div className='origins-block'>
                <div className='text-container'>
                    <h3>Origins</h3>
                    <p>{ messaging.origin }</p>
                </div>
                <img src={originsImageSrc} className='support-img' sizes='cover'/>
            </div>
        </div>
        <h3 className='definitions-header'>Definitions</h3>
        <BlockSectionsDisplay
            blocks={[
                CONSTANTS.BLOCK_CONFIGS.DISCOUNT,
                CONSTANTS.BLOCK_CONFIGS.FACTS,
                CONSTANTS.BLOCK_CONFIGS.STICKER_PRICE,
                CONSTANTS.BLOCK_CONFIGS.DISCOUNTED_CASH_FLOW,
                CONSTANTS.BLOCK_CONFIGS.BENCHMARK_RATIO
          ]}/>
    </section>
}

export default AboutSection;