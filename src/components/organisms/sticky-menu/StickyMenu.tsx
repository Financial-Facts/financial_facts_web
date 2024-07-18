import { useRef, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import ExpandableMenu from '../../atoms/expandable-menu/expandable-menu';
import ExpandableSearch from '../../molecules/expandable-search/expandable-search';
import './StickyMenu.scss';
import HomeButton from '../../atoms/home-button/HomeButton';
import listenForWindowClick from '../../../hooks/listenForWindowClick';
import StickyTextButton from '../../atoms/sticky-text-button/StickyTextButton';
import { useSelector } from 'react-redux';
import { MobileState } from '../../../store/mobile/mobile.slice';

export type ClosurePayload = 'ALL' | 'NAV' | 'SEARCH';

function StickyMenu() {

    const [ $closeDropdowns ] = useState(new Subject<ClosurePayload[]>());
    const stickyMenuRef = useRef<HTMLElement | null>(null);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);

    listenForWindowClick((e) => {
        const isToggleButton = e.id.includes('-state-');
        if (!isToggleButton && !stickyMenuRef.current?.contains(e)) {
            $closeDropdowns.next(['ALL']);
        }
    });

    return (
        <section className='sticky-menu'
            ref={stickyMenuRef}>
            <HomeButton/>
            {
                mobile.size !== 'SMALL' && <div className='redirect-options-list'>
                    <StickyTextButton text={'Facts'} url={'/Facts'}/>
                    <StickyTextButton text={'Discounts'} url={'/Discount'}/>
                    <StickyTextButton text={'About'} url={'/about'}/>
                </div>
            }
            <div className='options-list'>
                <ExpandableSearch $closeDropdowns={$closeDropdowns}/>
                { mobile.size === 'SMALL' && <ExpandableMenu $closeDropdowns={$closeDropdowns}/> }
            </div>
        </section>
    )
  }
  
  export default StickyMenu;