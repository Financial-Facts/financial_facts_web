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
    const [ displayDefinition, setDisplayDefinition ] = useState<boolean>(false);
    const [ listItemRef, setListItemRef ] = useState<HTMLLIElement | null>(null);
    
    useEffect(() => {
        if (listItemRef) {
            listItemRef.style.setProperty('--list-item-expanded-height', `${expandedHeight}px`);
        }
    }, [ listItemRef ]);

    useEffect(() => {
        if (expanded) {
            setTimeout(() => {
                setDisplayDefinition(true);
            }, 400);
        } else {
            setDisplayDefinition(false);
        }
    }, [ expanded ]);

    return <li className={`definitions-list-item ${expanded && 'expanded'}`}
        role='listitem button'
        onClick={() => setExpanded(current => !current) }
        ref={(ref) => initRef(ref, setListItemRef)}>
            <div className={`word-container ${expanded && 'expanded'}`}>
                <h3>{ word }</h3>
            </div>
            { 
                expanded && <div className='definition-container'> 
                    { displayDefinition && definitionElement }
                </div>
            }
    </li>
}

export default DefinitionListItem;