import { useState } from 'react';
import './expandable-menu.scss';
import { Divide as Hamburger } from 'hamburger-react';
import { useSelector } from 'react-redux';
import { Page, PageState } from '../../state/page/page.typings';
import { Link } from 'react-router-dom';

function ExpandableMenu() {

    const [isExpanded, setIsExpanded] = useState(false);
    const pages = useSelector<{ page: PageState }, PageState>((state) => state.page);

    const renderDropdownMenuList = () => renderDropdownMenuListItems(Object.keys(pages) as Page[]);

    const renderDropdownMenuListItems = (pageList: Page[]) => 
        pageList.map(page => {
            const pageData = pages[page];
            return (<li key={ page } className={`drop-down-item ${ pageData.active ? 'active' : 'inactive' }`}>
                <Link className={ pageData.active ? 'active' : 'inactive' } to={ pageData.link }>{ page }</Link>
            </li>);
        });

    return (
        <div className={'sticky-menu-option'}
            aria-expanded={isExpanded}>
            <Hamburger color="#8C19D3"
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
        </div>
    )
  }
  
  export default ExpandableMenu;