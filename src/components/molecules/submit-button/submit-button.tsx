import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import './submit-button.scss';
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
                    <img src={`/assets/${outcome === 'isSuccess' ? 'check' : 'x'}.svg`}/> :
                    'Send' 
        }</button>
    )
  }
  
  export default SubmitButton;