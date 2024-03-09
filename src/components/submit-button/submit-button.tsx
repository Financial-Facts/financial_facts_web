import './submit-button.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { Outcome } from './submit-button.typings';

export interface SubmitButtonProps {
    outcome: Outcome,
    loading: boolean 
}

function SubmitButton({ outcome, loading }: SubmitButtonProps) {

    return (
        <button type='submit' className={`submit-button ${outcome}`}>{ 
            loading ? 
                <LoadingSpinner size='SMALL' color='BLACK'></LoadingSpinner> : 
                outcome !== 'neutral' ?
                    <img src={`/assets/icons/${outcome === 'isSuccess' ? 'check' : 'x'}.svg`}/> :
                    'Send' 
        }</button>
    )
  }
  
  export default SubmitButton;