import { Link } from "react-router-dom";
import "./SiteMap.scss";

function SiteMap() {

    return (
        <div className="site-map">
            <h2>Site Map</h2>
            <ul className="parent-list">
                <ul className="child-list-1">
                    <li><Link to={""}>Home</Link></li>
                    <li><Link to={""}>About</Link></li>
                </ul>
                <ul className="child-list-2">
                    <li><Link to={""}>Discount</Link></li>
                    <li><Link to={""}>Facts</Link></li>
                    <li><Link to={""}>API Docs</Link></li>
                </ul>
            </ul>
        </div>
    )
  }
  
  export default SiteMap;