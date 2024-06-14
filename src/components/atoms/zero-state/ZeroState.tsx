import SvgIcon from '../svg-icon/SvgIcon';
import './ZeroState.scss';

export interface ZeroStateProps {
    message: string,
    supportText: string,
    iconSource?: string
}

function ZeroState({ message, supportText, iconSource }: ZeroStateProps) {

    return (
        <div className='zero-state'>
            { !!iconSource && <SvgIcon src={iconSource} height={'50px'} width={'50px'}/> }
            <span className='message'>{ message }</span>
            <span className='support'>{ supportText }</span>
        </div>
    )
  }
  
  export default ZeroState;