import { Link } from "react-router-dom";
import "./Footer.scss"
import { environment } from "../../../environment";
import { messaging } from "../../../constants/messaging";

function Footer() {

    return (
        <footer className="footer">
            <div className="content-wrapper">
                <div className="column disclaimer">
                    <h2><u>DISCLAIMER</u></h2>
                    <span className="subtext">
                        { messaging.disclaimer }
                    </span>
                </div>
                <div className="column information">
                    <i>2026 Financial Facts. All Rights Reserved.</i>
                    <span className="subtext">
                        Discounts calculated with data provided by <Link to={`${environment.fmpDocsUrl}`} target="_blank">Financial Modeling Prep</Link>
                    </span>
                </div>
            </div>
        </footer>
    )
  }
  
  export default Footer;