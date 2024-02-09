import './FactsDisplay.scss'

const cleanKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').trim();
}

function FactsDisplay<T extends string>({ keys, setter, selectedKey, orientation, scrollable }: {
    keys: T[],
    setter: (v: T) => void,
    selectedKey?: T,
    orientation?: 'vertical',
    scrollable?: boolean
}) {

    const renderKeys = () => {
        return keys.map(key => 
            <div key={key}
                className={`key ${ key === selectedKey ? 'active' : ''}`}
                onClick={() => setter(key)}>
                { cleanKey(key) }
            </div>
        );
    }

    return (
    <div className={`key-group
        ${orientation ? orientation : ''}
        ${scrollable ? 'scrollable' : ''}`}>
        { renderKeys() }
    </div>
    )
  }
  
  export default FactsDisplay;