import { messaging } from '../../../constants/messaging';
import './AboutSection.scss';
import { CONSTANTS } from '../../../constants/constants';
import BlockSectionsDisplay from '../block-sections-display/BlockSectionsDisplay';

function AboutSection() {

    return <section className='about-section'>
        <div className='about-information'>
            <div className='philosophy-block'>
                <img src='/assets/coffee-image.png' className='support-img'/>
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
                <img src='/assets/glasses-image.png' className='support-img' sizes='cover'/>
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