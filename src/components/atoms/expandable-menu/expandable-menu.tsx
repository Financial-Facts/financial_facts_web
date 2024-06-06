import { Divide as Hamburger } from 'hamburger-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Subject } from 'rxjs/internal/Subject';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import './expandable-menu.scss';
import { PageState, Page } from '../../../store/page/page.typings';
import { MobileState } from '../../../store/mobile/mobile.slice';
import watchForMenuClosure from '../../../hooks/watchForMenuClosure';

export interface ExpandableMenuProps  { 
    $closeDropdowns: Subject<ClosurePayload[]>
}

function ExpandableMenu({ $closeDropdowns }: ExpandableMenuProps) {

    const [ isExpanded, setIsExpanded ] = useState(false);
    const pages = useSelector<{ page: PageState }, PageState>((state) => state.page);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    watchForMenuClosure($closeDropdowns, (payload) => setIsExpanded(!payload.includes('ALL') && !payload.includes('NAV')));

    useEffect(() => {
        if (isExpanded) {
            $closeDropdowns.next([ 'SEARCH' ]);
        }
    }, [ isExpanded ]);
    
    const renderDropdownMenuList = () => renderDropdownMenuListItems(Object.keys(pages) as Page[]);

    const buildListItem = (page: Page) => {
        const pageData = pages[page];
        return (<li key={ page } className={`drop-down-item ${ pageData.active ? 'active' : 'inactive' }`}>
            <Link className={ pageData.active ? 'active' : 'inactive' } to={ pageData.link }>{ page }</Link>
        </li>)
    }

    const renderDropdownMenuListItems = (pageList: Page[]) => 
        mobile.size === 'SMALL' ? 
            pageList.map(page => {
                return buildListItem(page);
            }) :
            pageList.reduce<JSX.Element[]>((acc, page) => {
                if (page !== 'Main') {
                    acc.push(buildListItem(page));
                }
                return acc;
            }, []);
    
    return (
        <nav className={'sticky-menu-option expandable-menu'}
            aria-expanded={isExpanded}>
            <div className='hamburger-wrapper'>
                <Hamburger color="#8C19D3"
                    hideOutline={false}
                    toggled={isExpanded}
                    onToggle={(toggled) => setIsExpanded(toggled) }>
                </Hamburger>
            </div>
            {
                isExpanded ? 
                    <div className='drop-down-container'>
                        <ul className='drop-down'>
                            { renderDropdownMenuList() }
                        </ul>
                    </div> : undefined
            }
        </nav>
    )
  }
  
  export default ExpandableMenu;