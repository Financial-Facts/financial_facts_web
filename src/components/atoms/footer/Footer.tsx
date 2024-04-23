import { Link } from "react-router-dom";
import "./Footer.scss"
import { environment } from "../../../environment";

function Footer() {

    return (
        <footer className="footer">
            <i>2023 Financial Facts. All Rights Reserved.</i>
            <span className="subtext">
                Discounts calculated with data provided by <Link to={`${environment.fmpDocsUrl}`} target="_blank">Financial Modeling Prep</Link>
            </span>
        </footer>
    )
  }
  
  export default Footer;