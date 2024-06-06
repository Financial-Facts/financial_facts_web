import { useNavigate } from 'react-router-dom';
import './HomeButton.scss';
import SvgIcon from '../svg-icon/SvgIcon';


function HomeButton() {

    const navigate = useNavigate();

    return (
        <div className='sticky-menu-option home-button'>
            <SvgIcon
                src={'/assets/home.svg'}
                height={'48px'}
                width={'48px'}
                isButton={true}
                onClick={() => navigate('/')}/>
        </div>
    )
  }
  
  export default HomeButton;