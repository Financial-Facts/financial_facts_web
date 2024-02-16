import './ZeroState.scss';

export interface ToggleOption <T> {
    id: string,
    input: T
}

function ZeroState({ message, supportText }: { message: string, supportText: string }) {

    return (
        <div className='zero-state'>  
            <span className='message'>{ message }</span>
            <span className='support'>{ supportText }</span>
        </div>
    )
  }
  
  export default ZeroState;