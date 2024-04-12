import { Divide as Hamburger } from 'hamburger-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Subject } from 'rxjs/internal/Subject';
import { ClosurePayload } from '../../organisms/sticky-menu/StickyMenu';
import './expandable-menu.scss';
import { PageState, Page } from '../../../store/page/page.typings';

export interface ExpandableMenuProps  { 
    $closeDropdowns: Subject<ClosurePayload[]>
}

function ExpandableMenu({ $closeDropdowns }: ExpandableMenuProps) {

    const [ isExpanded, setIsExpanded ] = useState(false);
    const pages = useSelector<{ page: PageState }, PageState>((state) => state.page);

    useEffect(() => {
        const watchForClosure = $closeDropdowns
            .subscribe((payload: ClosurePayload[]) => setIsExpanded(
                !payload.includes('ALL') && !payload.includes('NAV')));
        return () => {
            watchForClosure.unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (isExpanded) {
            $closeDropdowns.next([ 'SEARCH' ]);
        }
    }, [ isExpanded ]);
    
    const renderDropdownMenuList = () => renderDropdownMenuListItems(Object.keys(pages) as Page[]);

    const renderDropdownMenuListItems = (pageList: Page[]) => 
        pageList.map(page => {
            const pageData = pages[page];
            return (<li key={ page } className={`drop-down-item ${ pageData.active ? 'active' : 'inactive' }`}>
                <Link className={ pageData.active ? 'active' : 'inactive' } to={ pageData.link }>{ page }</Link>
            </li>);
        });

    return (
        <nav className={'sticky-menu-option expandable-menu'}
            aria-expanded={isExpanded}>
            <Hamburger color="#8C19D3"
                hideOutline={false}
                toggled={isExpanded}
                onToggle={(toggled) => setIsExpanded(toggled) }>
            </Hamburger>
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