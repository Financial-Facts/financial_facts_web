import { Link } from "react-router-dom";
import "./SiteMap.scss";
import { Page, PageState } from "../../state/page/page.typings";
import { useSelector } from "react-redux";


function SiteMap() {

    const pages = useSelector<{ page: PageState }, PageState>((state) => state.page);

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