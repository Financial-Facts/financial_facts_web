import { useEffect, useState } from 'react';
import { handleEnterKeyEvent, initRef } from '../../../utilities';
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
    setExternalRef?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
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

    const [ iconWrapperRef, setIconWrapperRef ] = useState<HTMLDivElement | null>(null);

    const setPropertyIfExists = (ref: HTMLElement, variableName: string, property: string | undefined): void => {
        if (!!property) {
            ref.style.setProperty(variableName, property);
        }
    }

    useEffect(() => {
        if (iconWrapperRef) {
            iconWrapperRef.style.setProperty('--svg-height', height);
            iconWrapperRef.style.setProperty('--svg-width', width);

            setPropertyIfExists(iconWrapperRef, '--svg-wrapper-padding', isButton ? '4px' : wrapperPadding);
            setPropertyIfExists(iconWrapperRef, '--svg-color', color);
        }
    }, [ iconWrapperRef ]);

    return (
        <div className={`svg-icon-wrapper ${isButton ? 'svg-button-wrapper' : CONSTANTS.EMPTY}`}
            title={tooltipMessage}
            role={ isButton ? 'button' : 'img' }
            tabIndex={ isButton ? 0 : -1 }
            ref={(ref) => initRef(ref, (ref) => {
                if (!!setExternalRef) {
                    setExternalRef(ref);
                }
                setIconWrapperRef(ref);
            })}
            onClick={() => !!onClick && onClick()}
            onKeyDown={(e) => !!onClick && handleEnterKeyEvent(e, onClick)}>
            <ReactSVG src={src} className='svg-component'/>
        </div>
    )
}

export default SvgIcon;  