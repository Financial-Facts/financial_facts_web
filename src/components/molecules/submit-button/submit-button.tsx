import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import './submit-button.scss';
import { Outcome } from './submit-button.typings';

export interface SubmitButtonProps {
    text?: string,
    outcome: Outcome,
    loading: boolean
    onClick?: () => void
}

function SubmitButton({ outcome, loading, text = 'Send', onClick }: SubmitButtonProps) {

    return (
        <button type='submit'
            className={`submit-button ${outcome}`}
            onClick={() => !!onClick && onClick()}>{ 
            loading ? 
                <LoadingSpinner size='SMALL' color='BLACK'/> : 
                outcome !== 'neutral' ?
                    <img src={`/assets/${outcome === 'isSuccess' ? 'check' : 'x'}.svg`}/> :
                    <span className='send-text'>{ text }</span>
        }</button>
    )
  }
  
  export default SubmitButton;