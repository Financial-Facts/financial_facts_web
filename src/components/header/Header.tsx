import "./Header.scss"

function Header() {

    return (
      <header className='header'>
        <section className="logo-wrapper">
            <img src="./assets/logo.svg" className="logo"/>
        </section>
        <section className='title-wrapper'>
            <h1>Financial Facts</h1>
            <span>Your Gateway to Undervalued Stocks!</span>
        </section>
      </header>
    )
  }
  
  export default Header