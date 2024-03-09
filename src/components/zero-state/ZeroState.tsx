import './ZeroState.scss';

export interface ZeroStateProps {
    message: string,
    supportText: string
}

function ZeroState({ message, supportText }: ZeroStateProps) {

    return (
        <div className='zero-state'>  
            <span className='message'>{ message }</span>
            <span className='support'>{ supportText }</span>
        </div>
    )
  }
  
  export default ZeroState;