import { useEffect, useState } from "react";
import { cleanKey, initRef } from "../../../utilities";
import ArrowNavWrapper from "../../atoms/arrow-nav-wrapper/arrow-nav-wrapper";
import './ArrowKeyNavigator.scss';
import ResizeObserverService from "../../../services/resize-observer-service/resize-observer.service";

export interface ArrowKeyNavigatorProps<T extends string> {
    keyOptions: T[]
    keySetter: (_: T) => void
}


function ArrowKeyNavigator<T extends string>({ keyOptions, keySetter }: ArrowKeyNavigatorProps<T>) {

    const [ keyListRef, setKeyListRef ] = useState<HTMLUListElement | null>(null);
    const [ itemWidth, setItemWidth ] = useState<number>(keyListRef ? keyListRef.clientWidth : 200);

    useEffect(() => {
        if (keyListRef) {
            const observerId = ResizeObserverService.onSizeChange(keyListRef, () => {
                const width = keyListRef.clientWidth;
                setItemWidth(width);
                keyListRef.style.setProperty('--item-width', `${width}px`);
            });
            return (() => ResizeObserverService.disconnectObserver(observerId));
        }
    }, [ keyListRef ]);

    
    useEffect(() => {
        if (keyOptions.length > 0 && keyListRef) {
            keyListRef.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        }
    }, [ keyListRef, keyOptions ]);
    
    useEffect(() => {
        if (keyListRef) {
            const listener = (event: Event) => {
                if (event.target) {
                    const element = event.target as HTMLElement;
                    const keyIndex = Math.floor(element.scrollLeft / itemWidth);
                    if (keyIndex < keyOptions.length) {
                        keySetter(keyOptions[keyIndex]);
                    }
                }
            };
            keyListRef.addEventListener('scroll', listener);
            return () => {
                keyListRef.removeEventListener('scroll', listener);
            };
        }
    }, [ keyListRef, keyOptions, itemWidth ]);

    const renderKeyListItems = () => keyOptions.map(key => 
        <li className='key-option' key={key}>
            { cleanKey(key) }
        </li>
    );

    const renderKeyList = () =>
        <ul ref={ (ref) => initRef(ref, setKeyListRef) }
            className="key-option-list">
            { renderKeyListItems() }
        </ul>

    return (
        <ArrowNavWrapper
            element={renderKeyList()}
            elementRef={keyListRef}
            itemWidth={itemWidth}/>
    )
  }
  
  export default ArrowKeyNavigator;