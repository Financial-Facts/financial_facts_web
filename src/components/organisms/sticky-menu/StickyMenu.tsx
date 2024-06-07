import { useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import ExpandableMenu from '../../atoms/expandable-menu/expandable-menu';
import ExpandableSearch from '../../molecules/expandable-search/expandable-search';
import './StickyMenu.scss';
import { initRef } from '../../../utilities';
import HomeButton from '../../atoms/home-button/HomeButton';
import { useSelector } from 'react-redux';
import { MobileState } from '../../../store/mobile/mobile.slice';
import listenForWindowClick from '../../../hooks/listenForWindowClick';

export type ClosurePayload = 'ALL' | 'NAV' | 'SEARCH';

function StickyMenu() {

    const [ stickyMenuRef, setStickyMenuRef ] = useState<HTMLElement | null>(null);
    const [ $closeDropdowns ] = useState(new Subject<ClosurePayload[]>());
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);

    listenForWindowClick(() => {
        $closeDropdowns.next(['ALL']);
    }, stickyMenuRef);

    return (
        <section className='sticky-menu'
            ref={ (ref) => initRef(ref, setStickyMenuRef) }>
            { mobile.size !== 'SMALL' && <HomeButton/> }
            <ExpandableSearch $closeDropdowns={$closeDropdowns}/>
            <ExpandableMenu $closeDropdowns={$closeDropdowns}/>
        </section>
    )
  }
  
  export default StickyMenu;