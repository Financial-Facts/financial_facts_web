import "./Header.scss"

function Header() {

    return (
      <header className='header'>
        <section className="logo-wrapper">
            <img src="./assets/logo.svg" className="logo"/>
        </section>
        <section className='title-wrapper'>
            <h1>Financial Facts</h1>
            <h2>Your Gateway to Undervalued Stocks!</h2>
        </section>
      </header>
    )
  }
  
  export default Header