import { useEffect, useState } from 'react';
import './DefinitionListItem.scss';
import { initRef } from '../../../utilities';
import ResizeObserverService from '../../../services/resize-observer-service/resize-observer.service';
import { CONSTANTS } from '../../../constants/constants';

export interface DefinitionListItemProps {
    word: string,
    expandedHeight: number,
    definitionElement: JSX.Element
}

function DefinitionListItem({ word, expandedHeight, definitionElement }: DefinitionListItemProps) {

    const [ expanded, setExpanded ] = useState<boolean>(false);
    const [ listItemRef, setListItemRef ] = useState<HTMLLIElement | null>(null);
    const [ contentRef, setContentRef ] = useState<HTMLDivElement | null>(null);

    const setListItemExpandedHeight = (ref: HTMLLIElement, height: number) => {
        ref.style.setProperty('--list-item-expanded-height', height + 'px');
    }

    const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
        const element = event.target as HTMLElement;
        if (element.tagName !== CONSTANTS.TAG_NAME.ANCHOR) {
            setExpanded(current => !current) 
        }
    }

    useEffect(() => {
        if (listItemRef) {
            if (expanded && contentRef) {
                const observerId = ResizeObserverService.onSizeChange(contentRef, () => {
                    setListItemExpandedHeight(listItemRef, contentRef.clientHeight);
                });
                return (() => {
                    ResizeObserverService.disconnectObserver(observerId);
                });
            } else {
                listItemRef.style.setProperty('--list-item-expanded-height', `${expandedHeight}px`);
            }
        }
    }, [ expanded, contentRef ]);

    return <li className={`definitions-list-item ${expanded && 'expanded'}`}
        role='listitem button'
        onClick={handleClick}
        ref={(ref) => initRef(ref, setListItemRef)}>
        <div className='list-item-content' ref={(ref) => initRef(ref, setContentRef)}>
            <div className={`word-container ${expanded && 'expanded'}`}>
                <span className='word'>{ word }</span>
                <span>(?)</span>
            </div>
            { 
                expanded && <div className='definition-container'> 
                    { definitionElement }
                </div>
            }
        </div>
    </li>
}

export default DefinitionListItem;