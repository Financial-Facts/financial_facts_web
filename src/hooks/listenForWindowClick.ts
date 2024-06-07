import { useEffect } from 'react';


const listenForWindowClick = (
    onWindowClick: (target: HTMLElement) => void,
    ignoreElement?: HTMLElement | null
) => {

    const isChildOf = (parent: Element, element: Element): boolean => {
        return parent === element || parent.contains(element);
    }

    useEffect(() => {
        const listener = (ev: MouseEvent) => {
            const { target } = ev;
            if (target) {
                const element = target as HTMLElement
                if (!!ignoreElement) {
                    if (!isChildOf(ignoreElement, element)) {
                        onWindowClick(element);  
                    }
                } else {
                    onWindowClick(element);
                }
            }
        }
        window.addEventListener('click', listener);
        return () => {
            window.removeEventListener('click', listener);
        }
    }, [ onWindowClick, ignoreElement ]);
}
  
export default listenForWindowClick;