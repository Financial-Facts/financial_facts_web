import { useEffect, useRef } from 'react';
import { handleEnterKeyEvent } from '../../../utilities';
import './SvgIcon.scss';
import { ReactSVG } from 'react-svg';
import { CONSTANTS } from '../../../constants/constants';

export interface InfoIconProps {
    src: string,
    height: string,
    width: string,
    color?: string,
    wrapperPadding?: string,
    tooltipMessage?: string,
    isButton?: boolean,
    onClick?: () => void,
    setExternalRef?: React.MutableRefObject<HTMLDivElement | null>
}

function SvgIcon({ 
    src,
    height,
    width,
    color,
    tooltipMessage,
    wrapperPadding,
    isButton,
    onClick,
    setExternalRef
}: InfoIconProps) {

    const iconWrapperRef = useRef<HTMLDivElement | null>(null);
    
    const setPropertyIfExists = (ref: HTMLElement, variableName: string, property: string | undefined): void => {
        if (!!property) {
            ref.style.setProperty(variableName, property);
        }
    }

    useEffect(() => {
        const currentIconWrapperRef = iconWrapperRef.current; 
        if (currentIconWrapperRef) {
            currentIconWrapperRef.style.setProperty('--svg-height', height);
            currentIconWrapperRef.style.setProperty('--svg-width', width);

            setPropertyIfExists(currentIconWrapperRef, '--svg-wrapper-padding', wrapperPadding ? wrapperPadding : isButton ? '4px' : wrapperPadding);
            setPropertyIfExists(currentIconWrapperRef, '--svg-color', color);
        }
    }, [ iconWrapperRef.current ]);

    return (
        <div className={`svg-icon-wrapper ${isButton ? 'svg-button-wrapper' : CONSTANTS.EMPTY}`}
            title={tooltipMessage}
            role={ isButton ? 'button' : 'img' }
            tabIndex={ isButton ? 0 : -1 }
            ref={(ref) => {
                if (!!setExternalRef) {
                    setExternalRef.current = ref;
                }
                iconWrapperRef.current = ref;
            }}
            onClick={() => !!onClick && onClick()}
            onKeyDown={(e) => !!onClick && handleEnterKeyEvent(e, onClick)}>
            <ReactSVG src={src} className='svg-component'/>
        </div>
    )
}

export default SvgIcon;  