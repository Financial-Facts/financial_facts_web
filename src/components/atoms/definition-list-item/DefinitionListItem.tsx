import { useEffect, useRef, useState } from 'react';
import './DefinitionListItem.scss';
import { handleEnterKeyEvent } from '../../../utilities';
import ResizeObserverService from '../../../services/resize-observer-service/resize-observer.service';
import { CONSTANTS } from '../../../constants/constants';

export interface DefinitionListItemProps {
    word: string,
    expandedHeight: number,
    definitionElement: JSX.Element
}

function DefinitionListItem({ word, expandedHeight, definitionElement }: DefinitionListItemProps) {

    const [ expanded, setExpanded ] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const listItemRef = useRef<HTMLLIElement | null>(null);
    
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
        const currentListItemRef = listItemRef.current;
        const currentContentRef = contentRef.current;
        if (currentListItemRef) {
            if (expanded && currentContentRef) {
                const observerId = ResizeObserverService.onSizeChange(currentContentRef, () => {
                    setListItemExpandedHeight(currentListItemRef, currentContentRef.clientHeight);
                });
                return (() => {
                    ResizeObserverService.disconnectObserver(observerId);
                });
            } else {
                currentListItemRef.style.setProperty('--list-item-expanded-height', `${expandedHeight}px`);
            }
        }
    }, [ expanded, contentRef.current ]);

    return <li className={`definitions-list-item ${expanded && 'expanded'}`}
        tabIndex={0}
        role='listitem button'
        aria-expanded={expanded}
        onClick={handleClick}
        onKeyDown={(e) => handleEnterKeyEvent(e, () => setExpanded(current => !current))}
        ref={listItemRef}>
        <div className='list-item-content' ref={contentRef}>
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