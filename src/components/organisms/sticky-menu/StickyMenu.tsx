import { useRef, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import ExpandableMenu from '../../atoms/expandable-menu/expandable-menu';
import ExpandableSearch from '../../molecules/expandable-search/expandable-search';
import './StickyMenu.scss';
import HomeButton from '../../atoms/home-button/HomeButton';
import { useSelector } from 'react-redux';
import { MobileState } from '../../../store/mobile/mobile.slice';
import listenForWindowClick from '../../../hooks/listenForWindowClick';

export type ClosurePayload = 'ALL' | 'NAV' | 'SEARCH';

function StickyMenu() {

    const [ $closeDropdowns ] = useState(new Subject<ClosurePayload[]>());
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const stickyMenuRef = useRef<HTMLElement | null>(null);
    
    listenForWindowClick((e) => {
        const isToggleButton = e.id.includes('-state-');
        if (!isToggleButton && !stickyMenuRef.current?.contains(e)) {
            $closeDropdowns.next(['ALL']);
        }
    });

    return (
        <section className='sticky-menu'
            ref={stickyMenuRef}>
            { mobile.size !== 'SMALL' && <HomeButton/> }
            <ExpandableSearch $closeDropdowns={$closeDropdowns}/>
            <ExpandableMenu $closeDropdowns={$closeDropdowns}/>
        </section>
    )
  }
  
  export default StickyMenu;