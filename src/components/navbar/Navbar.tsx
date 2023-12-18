import { useNavigate } from "react-router-dom";
import "./Navbar.scss"

function Navbar() {

    const navigate = useNavigate();

    const navigateTo = (url: string) => {
        navigate(url);
    }

    return (
      <section className="navbar">
        <div className="nav-options">
            <div className="nav-option" onClick={ () => navigateTo('/') }>Home</div>
            <div className="nav-option" onClick={ () => navigateTo('/discount') }>Discounts</div>
            <div className="nav-option">Facts</div>
            <div className="nav-option">About</div>
        </div>
      </section>
    )
  }
  
  export default Navbar;