import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';
import './submit-button.scss';
import { Outcome } from './submit-button.typings';

export interface SubmitButtonProps {
    text?: string,
    outcome: Outcome,
    loading: boolean
    onClick?: () => void,
    iconSource?: string
}

function SubmitButton({
    outcome,
    loading,
    text = 'Send',
    onClick,
    iconSource
}: SubmitButtonProps) {

    return (
        <button type='submit'
            className={`submit-button ${outcome}`}
            onClick={() => !!onClick && onClick()}>{ 
            loading ? 
                <LoadingSpinner size='SMALL' color='BLACK'/> : 
                outcome !== 'neutral' ?
                    <img src={`/assets/${outcome === 'isSuccess' ? 'check' : 'x'}.svg`}/> :
                    <>
                        <span className='send-text'>{ text }</span>
                        { iconSource && <SvgIcon src={iconSource} height={'25px'} width={'25px'}/> }
                    </>
                
        }</button>
    )
  }
  
  export default SubmitButton;