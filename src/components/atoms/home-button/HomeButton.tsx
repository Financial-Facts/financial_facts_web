import { useNavigate } from 'react-router-dom';
import './HomeButton.scss';


function HomeButton() {

    const navigate = useNavigate();

    return (
        <button className='sticky-menu-option home-button' onClick={() => navigate('/')}>
            <img src="/assets/home.svg"/>
        </button>
    )
  }
  
  export default HomeButton;