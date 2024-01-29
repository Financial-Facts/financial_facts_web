import { useState } from 'react';
import './expandable-search.scss';

function ExpandableSearch() {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleKeyEvent = (e: React.KeyboardEvent<HTMLDivElement>, val: boolean): void => {
        if (e.code === 'Enter') {
            setIsExpanded(val);
        }
    }

    return (
        <div className={`sticky-menu-option search ${ isExpanded ? 'search-field' : 'search-button' }`}
            aria-expanded={ isExpanded}>
            <img src='/assets/icons/magnifying-glass.svg'
                role={ isExpanded ? 'img' : 'button' }
                className={`search-icon ${isExpanded ? 'expanded-search-icon' : ''}`}
                tabIndex={ isExpanded ? -1 : 0}
                onClick={() => setIsExpanded(true)}
                onKeyDown={(e) => handleKeyEvent(e, true)}/>
            {
                isExpanded ? 
                    <>
                        <input type='text'
                            className='search-bar'
                            placeholder='Search...'>    
                        </input>
                        <img role='button'
                            className='exit-button'
                            tabIndex={0}
                            src={`/assets/icons/x.svg`}
                            onClick={() => setIsExpanded(false)}
                            onKeyDown={(e) => handleKeyEvent(e, false)}/>
                    </> : undefined
            }
        </div>
    )
  }
  
  export default ExpandableSearch;