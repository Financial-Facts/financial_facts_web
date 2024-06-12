import './loading-spinner.scss';
import { Color, Size } from './loading-spinner.typings';

export interface LoadingSpinnerProps {
    size: Size,
    color: Color,
    minHeight?: number
}

function LoadingSpinner({ size, color, minHeight }: LoadingSpinnerProps) {

    const colorClass = `${color.toLowerCase()}`;

    return (
        <section className={`loader-wrapper`} style={{
            minHeight: !!minHeight ? minHeight : undefined
        }}>
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