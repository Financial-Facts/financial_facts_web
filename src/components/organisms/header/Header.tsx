import { CONSTANTS } from "../../../constants/constants";
import StickyMenu from "../sticky-menu/StickyMenu";
import "./Header.scss";

function Header({ text, subtext }: { text: string, subtext?: string }) {

    return (
      <header className={`header ${subtext ? 'fixed-header-height' : CONSTANTS.EMPTY}`}>
        <div className="logo-wrapper">
            <img src="/assets/logo.svg" className="logo"/>
        </div>
        <div className='title-wrapper'>
            <h1>{ text }</h1>
            { subtext ? <h2>{ subtext }</h2> : undefined }
        </div>
        <section className="logo-wrapper"></section>
        <StickyMenu/>
      </header>
    )
  }
  
  export default Header;