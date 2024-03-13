import './StickyMenu.scss';
import ExpandableMenu from '../expandable-menu/expandable-menu';
import ExpandableSearch from '../expandable-search/expandable-search';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import { fetchChildren, initRef } from '../../utilities';

export type ClosurePayload = 'ALL' | 'NAV' | 'SEARCH';

function StickyMenu() {

    const [ stickyMenuRef, setStickyMenuRef ] = useState<HTMLElement | null>(null);
    const [ _, setChildrenElements ] = useState<Element[]>([]);
    const [ $closeDropdowns ] = useState(new Subject<ClosurePayload[]>());

    useEffect(() => {
        if (stickyMenuRef) {
            window.addEventListener('click', (e) => checkClickTarget(e));
        }
    }, [ stickyMenuRef ])
    
    const checkClickTarget = (e: MouseEvent): void => {
        if (stickyMenuRef) {
            const children = fetchChildren(stickyMenuRef as Element);
            setChildrenElements((val) => {
                const updatedList = children.reduce((result, el) => {
                    if (!result.includes(el)) {
                        result = [...result, el];
                    }
                    return result;
                }, val);

                setDisplayItemsWithTarget(updatedList, e.target)
                return updatedList;
            });
        }
    }

    const setDisplayItemsWithTarget = (children: Element[], target: EventTarget | null): void => {
        if (target) {
            const lastClickTarget = target as Element;
            if (!children.some(child =>
                child.tagName === lastClickTarget.tagName &&
                child.className === lastClickTarget.className)) {
                    $closeDropdowns.next(['ALL']);
                }
        }
    }

    return (
        <section className='sticky-menu'
            ref={ (ref) => initRef(ref, setStickyMenuRef) }>
            <ExpandableSearch $closeDropdowns={$closeDropdowns}/>
            <ExpandableMenu $closeDropdowns={$closeDropdowns}/>
        </section>
    )
  }
  
  export default StickyMenu;