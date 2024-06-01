import { useEffect, useState } from 'react';
import './DefinitionListItem.scss';
import { initRef } from '../../../utilities';

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

    useEffect(() => {
        if (listItemRef) {
            if (expanded && contentRef) {
                const listener = () => {
                    setListItemExpandedHeight(listItemRef, contentRef.clientHeight);
                }
                window.addEventListener('resize', listener);
                listener();
                return (() => {
                    window.removeEventListener('resize', listener);
                });
            } else {
                listItemRef.style.setProperty('--list-item-expanded-height', `${expandedHeight}px`);
            }
        }
    }, [ expanded, contentRef ]);

    return <li className={`definitions-list-item ${expanded && 'expanded'}`}
        role='listitem button'
        onClick={() => setExpanded(current => !current) }
        ref={(ref) => initRef(ref, setListItemRef)}>
        <div className='list-item-content' ref={(ref) => initRef(ref, setContentRef)}>
            <div className={`word-container ${expanded && 'expanded'}`}>
                <span className='word'>{ word }</span>
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