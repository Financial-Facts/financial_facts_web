import { useEffect, useState } from "react";
import { cleanKey, initRef } from "../../../utilities";
import ArrowNavWrapper from "../../atoms/arrow-nav-wrapper/arrow-nav-wrapper";
import './ArrowKeyNavigator.scss';

export interface ArrowKeyNavigatorProps {
    keyOptions: string[]
    keySetter: (_: string) => void
}


function ButtonOptionSideNav({ keyOptions, keySetter }: ArrowKeyNavigatorProps) {

    const [ keyListRef, setKeyListRef ] = useState<HTMLUListElement | null>(null);

    useEffect(() => {
        if (keyOptions.length > 0) {
            keySetter(keyOptions[0]);
        }
    }, []);

    useEffect(() => {
        if (keyListRef) {
            const listener = (event: Event) => {
                if (event.target) {
                    const element = event.target as HTMLElement;
                    const keyIndex = Math.floor(element.scrollLeft / 250);
                    if (keyIndex < keyOptions.length) {
                        keySetter(keyOptions[keyIndex]);
                    }
                }
            }
            keyListRef.addEventListener('scroll', listener);
            return () => {
                keyListRef.removeEventListener('scroll', listener);
            };
        }
    }, [keyListRef]);

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
        <ArrowNavWrapper element={renderKeyList()}
            elementRef={keyListRef}
            listLength={keyOptions.length}
            itemWidth={250}
            numItemsToDisplay={1}/>
    )
  }
  
  export default ButtonOptionSideNav;