import { useState } from "react";
import { environment } from "../../environment";
import { Size } from "../loading-spinner/loading-spinner.typings";
import "./symbol-icon.scss";
import { CONSTANTS } from "../constants";

export interface SymbolIconProps {
    symbol: string,
    size: Size,
    setImageNotFound?: (imageNotFound: boolean) => void
};

function SymbolIcon({ symbol, size, setImageNotFound }: SymbolIconProps) {
    const [ isError, setIsError ] = useState(false);

    const getIconEndpoint = (symbol: string): string => {
        return `${environment.symbolIconSourceUrl}/${symbol}.png`;
    }

    const handleUrlResponse = (isSuccess: boolean): void => {
        setIsError(!isSuccess);
        if (setImageNotFound) {
            setImageNotFound(!isSuccess);
        }
    }

    return (
        <div key={ `${symbol}-icon-wrapper`}
            className={`symbol-icon-wrapper
                ${size.toLowerCase()}
                ${ isError ? 'hide' : CONSTANTS.EMPTY }`}>
            {
                !isError ? 
                    <img className='symbol-icon'
                        key={ `${symbol}-icon`}
                        loading='eager'
                        src={ getIconEndpoint(symbol) }
                        onLoad={() => handleUrlResponse(true)}
                        onError={() => handleUrlResponse(false)}/> :
                undefined
            }
        </div>
    )
  }
  
  export default SymbolIcon;