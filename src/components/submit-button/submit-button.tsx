import './submit-button.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { Outcome } from './submit-button.typings';


function SubmitButton({ outcome, loading }: { outcome: Outcome, loading: boolean }) {

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