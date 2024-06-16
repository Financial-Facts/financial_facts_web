import { useEffect, useRef, useState } from "react";
import { cleanKey } from "../../../utilities";
import ArrowNavWrapper from "../../atoms/arrow-nav-wrapper/arrow-nav-wrapper";
import './ArrowKeyNavigator.scss';
import ResizeObserverService from "../../../services/resize-observer-service/resize-observer.service";

export interface ArrowKeyNavigatorProps<T extends string> {
    keyOptions: T[]
    keySetter: (_: T) => void
}


function ArrowKeyNavigator<T extends string>({ keyOptions, keySetter }: ArrowKeyNavigatorProps<T>) {

    const keyListRef = useRef<HTMLUListElement | null>(null);
    const [ itemWidth, setItemWidth ] = useState<number>(keyListRef.current ? keyListRef.current.clientWidth : 200);

    useEffect(() => {
        const currentKeyListRef = keyListRef.current;
        if (currentKeyListRef) {
            const observerId = ResizeObserverService.onSizeChange(currentKeyListRef, () => {
                const width = currentKeyListRef.clientWidth;
                setItemWidth(width);
                currentKeyListRef.style.setProperty('--item-width', `${width}px`);
            });
            return (() => ResizeObserverService.disconnectObserver(observerId));
        }
    }, [ keyListRef.current ]);

    
    useEffect(() => {
        const currentKeyListRef = keyListRef.current;
        if (keyOptions.length > 0 && currentKeyListRef) {
            currentKeyListRef.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        }
    }, [ keyListRef.current, keyOptions ]);
    
    useEffect(() => {
        const currentKeyListRef = keyListRef.current;
        if (currentKeyListRef) {
            const listener = (event: Event) => {
                if (event.target) {
                    const element = event.target as HTMLElement;
                    const keyIndex = Math.floor(element.scrollLeft / itemWidth);
                    if (keyIndex < keyOptions.length) {
                        keySetter(keyOptions[keyIndex]);
                    }
                }
            };
            currentKeyListRef.addEventListener('scroll', listener);
            return () => {
                currentKeyListRef.removeEventListener('scroll', listener);
            };
        }
    }, [ keyListRef.current, keyOptions, itemWidth ]);

    const renderKeyListItems = () => keyOptions.map(key => 
        <li className='key-option' key={key}>
            { cleanKey(key) }
        </li>
    );

    const renderKeyList = () =>
        <ul ref={keyListRef}
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