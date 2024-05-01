import { Size } from "../../atoms/loading-spinner/loading-spinner.typings";
import SymbolIcon from "../../atoms/symbol-icon/symbol-icon";
import StickyMenu from "../sticky-menu/StickyMenu";
import "./Header.scss";

export interface HeaderProps {
  text: string,
  subtext?: string,
  symbol?: string,
  size?: Size
}

function Header({ text, subtext, symbol, size = 'LARGE' }: HeaderProps) {

    return (
      <header className={`header`}>
        <div className="logo-wrapper">
            <img src="/assets/logo.svg" className="logo"/>
        </div>
        <div className={`title-wrapper`}>
            { symbol && <SymbolIcon symbol={symbol} size={"LARGE"}/> }
            <div className={`text-wrapper ${size}`}>
              <h1>{ text }</h1>
              { subtext ? <h2>{ subtext }</h2> : undefined }
            </div>
        </div>
        <section className="logo-wrapper"></section>
        <StickyMenu/>
      </header>
    )
  }
  
  export default Header;