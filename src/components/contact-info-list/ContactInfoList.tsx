import { Link } from "react-router-dom";
import "./ContactInfoList.scss"
import { environment } from "../../environment";

function ContactInfoList() {

    return (
        <div className="contact-info-list">
            <img src="/assets/logo.svg" className="logo"/>
            <ul className="contact-list">
                <li className="row">
                    <img src="/assets/icons/letter.svg" className="icon"/>
                    <span>{ environment.contactEmail }</span>
                </li>
                <li className="row">
                    <img src="/assets/icons/github.svg" className="icon"/>
                    <Link to={ environment.githubUrl }>Financial Facts Github</Link>
                </li>
                <li className="row">
                    <img src="/assets/icons/linkedin.svg" className="icon"/>
                    <Link to={ environment.linkedInUrl}>Matthew Gabriel LinkedIn</Link>
                </li>
            </ul>
        </div>
    )
  }
  
  export default ContactInfoList;