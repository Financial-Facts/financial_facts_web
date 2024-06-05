import AdjacentNavigationArrows, { AdjacentNavigationState } from "../../molecules/adjacent-navigation-arrows/AdjacentNavigationArrows";
import { Size } from "../../atoms/loading-spinner/loading-spinner.typings";
import SymbolIcon from "../../atoms/symbol-icon/symbol-icon";
import StickyMenu from "../sticky-menu/StickyMenu";
import "./Header.scss";


export interface HeaderProps {
  text: string,
  subtext?: string,
  symbol?: string,
  size?: Size,
  adjacentNavigationState?: AdjacentNavigationState
}

function Header({ text, subtext, symbol, size = 'LARGE', adjacentNavigationState }: HeaderProps) {
    return (
      <header className={`header`}>
        <div className="primary-content-wrapper">
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
          <div className="logo-wrapper"></div>
        </div>
        <StickyMenu/>
        {
          !!adjacentNavigationState &&
            <AdjacentNavigationArrows adjacentNavigationState={adjacentNavigationState}/>
        }
      </header>
    )
  }
  
  export default Header;