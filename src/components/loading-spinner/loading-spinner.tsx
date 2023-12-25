import { useEffect, useState } from "react";
import "./loading-spinner.scss"
import { Color, Size } from "./loading-spinner.typings";

function LoadingSpinner({ size, color }: { size: Size, color: Color }) {

    const [colorClass, setColorClass] = useState('PURPLE');
    
    useEffect(() => {
        setColorClass(`${color.toLowerCase()}`);
    }, [color]);

    return (
        <section className={`loader-wrapper`}>
            <div className={`lds-ellipsis ${ size.toLowerCase() }`}>
                <div className={colorClass}></div>
                <div className={colorClass}></div>
                <div className={colorClass}></div>
                <div className={colorClass}></div>
            </div>
        </section>
    )
  }
  
  export default LoadingSpinner;