import { useNavigate } from 'react-router-dom';
import './HomeButton.scss';
import SvgIcon from '../svg-icon/SvgIcon';


function HomeButton() {

    const navigate = useNavigate();

    return (
        <div className='sticky-menu-option home-button'>
            <SvgIcon
                src={'/assets/logo.svg'}
                height={'calc(var(--sticky-menu-height) - 8px)'}
                width={'calc(var(--sticky-menu-height) - 8px)'}
                wrapperPadding='0'
                isButton={true}
                onClick={() => navigate('/')}/>
        </div>
    )
  }
  
  export default HomeButton;