import "./Header.scss"

function Header({ text, subtext }: { text: string, subtext?: string }) {

    return (
      <>
        <header className={`header ${subtext ? 'fixed-header-height' : ''}`}>
          <section className="logo-wrapper">
              <img src="/assets/logo.svg" className="logo"/>
          </section>
          <section className='title-wrapper'>
              <h1>{ text }</h1>
              { subtext ? <h2>{ subtext }</h2> : undefined }
          </section>
          <section className="logo-wrapper"></section>
        </header>
      </>
    )
  }
  
  export default Header;