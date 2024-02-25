const observers: Record<number, ResizeObserver> = {};

const createObserver = (func: (entry: ResizeObserverEntry) => void): number => {
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            func(entry);
        }
    });
    let num = Object.keys(observers).length + 1;
    observers[num] = observer;
    return num;
}

const ResizeObserverService = {

    matchHeight: (leadingElement: HTMLElement, followingElement: HTMLElement): number => {
        const id = createObserver((entry) => {
            const cr = entry.contentRect;
            const leadingHeight = cr.height + cr.top * 2;
            followingElement.style.height = leadingHeight !== 0 ? `${leadingHeight}px` : '';
        });
        observers[id].observe(leadingElement);
        return id;
    },

    onWidthChange: (element: HTMLElement, callback: () => void): number => {
        const id = createObserver((entry) => {
            callback();
        });
        observers[id].observe(element);
        return id;
    },

    disconnectObserver: (id: number) => {
        const observer = observers[id];
        if (observer) {
            observer.disconnect();
            delete observers[id];
        }
    }

}

export default ResizeObserverService;