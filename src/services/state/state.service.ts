import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Page, PageStatus } from "./state.typings";


const pages = new BehaviorSubject<PageStatus>({
    'Main': {
        active: true,
        link: ''
    },
    'About': {
        active: false,
        link: ''
    },
    'Discount': {
        active: false,
        link: ''
    },
    'Facts': {
        active: false,
        link: ''
    },
    'API Docs': {
        active: false,
        link: ''
    }
});

const StateService = {

    activePage$: pages.asObservable(),

    setActivePage: (pageUpdate: Page) => {
        const currentPages = pages.value;
        const pageNames = Object.keys(currentPages) as Page[];
        pages.next(pageNames
            .reduce((pageMap: PageStatus, page: Page) => {
                pageMap[page] = {
                    active: pageUpdate === page,
                    link: currentPages[page].link
                };
                return pageMap;
            }, {} as PageStatus));
    }
}

export default StateService;