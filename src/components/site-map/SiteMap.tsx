import { Link } from "react-router-dom";
import "./SiteMap.scss";
import { useEffect, useState } from "react";
import StateService from "../../services/state/state.service";
import { Page, PageStatus } from "../../services/state/state.typings";


function SiteMap() {

    const [pages, setPages] = useState({} as PageStatus);

    useEffect(() => {
        StateService.activePage$.subscribe(pages => {
            setPages(pages);
        })
    }, []);

    const renderSiteMapList = () => renderSiteMapListItems(Object.keys(pages) as Page[]);

    const renderSiteMapListItems = (pageList: Page[]) => 
        pageList.map(page => {
            const pageData = pages[page];
            return (<li key={ page }>
                <Link className={ pageData.active ? 'active' : 'inactive' } to={ pageData.link }>{ page }</Link>
            </li>);
        });

    return (
        <div className="site-map">
            <h2>Site Map</h2>
            <ul className={`parent-list`}>
                { renderSiteMapList() }
            </ul>
        </div>
    )
  }
  
  export default SiteMap;