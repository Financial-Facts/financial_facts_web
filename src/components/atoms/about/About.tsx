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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan quam ac turpis venenatis, in eleifend ligula cursus. Integer consectetur, urna vel tempor rhoncus, mi dolor tincidunt urna, non gravida turpis purus ac justo. 
Sed at ante eu orci fermentum tincidunt nec nec nisi. Fusce convallis ex eget odio efficitur vulputate. Suspendisse potenti.</p>
            <button className="read-more-button">Read more</button>
        </div>
      </section>
    )
  }
  
  export default About