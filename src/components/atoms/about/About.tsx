import { messaging } from "../../../constants/messaging"
import "./About.scss"

function About() {

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
            <button className="read-more-button">Read more</button>
        </div>
      </section>
    )
  }
  
  export default About