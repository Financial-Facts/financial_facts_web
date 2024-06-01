import { useSelector } from "react-redux";
import { messaging } from "../../../constants/messaging"
import "./About.scss"
import { PageState } from "../../../store/page/page.typings";
import { useNavigate } from "react-router-dom";

function About() {
    
    const navigate = useNavigate();
    const aboutLink = useSelector<{ page: PageState }, string>((state) => state.page.About.link);

    return (
      <section className='about'>
        <img className="image"></img>
        <div className="body">
            <div className="body-header">
              <img src="/assets/logo.svg" className="logo hide"/>
              <div className="header-text-wrapper">
                <h2>About <span>Financial Facts</span></h2>
                <h3>Our Philosophy</h3>
              </div>
            </div>
            <p>{ messaging.aboutUs }</p>
            <button className="league-spartan read-more-button"
                onClick={() => navigate(aboutLink)}>
                Read more</button>
        </div>
      </section>
    )
  }
  
  export default About