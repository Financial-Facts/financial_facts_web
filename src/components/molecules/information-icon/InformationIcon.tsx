import { useEffect, useRef, useState } from "react";
import SvgIcon from "../../atoms/svg-icon/SvgIcon";
import { handleEnterKeyEvent } from "../../../utilities";
import './InformationIcon.scss';
import listenForWindowClick from "../../../hooks/listenForWindowClick";

export interface InformationIconProps {
    message: string,
    color?: string,
    height?: string,
    width?: string,
    alignPopup?: 'center' | 'flex-start',
    screenSide?: 'left' | 'right'
}

function InformationIcon({ 
    message,
    color,
    height = '16px',
    width = '16px',
    alignPopup = 'flex-start',
    screenSide = 'left'
}: InformationIconProps) {

    const [ showDialog, setShowDialog ] = useState<boolean>(false);

    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const infoIconRef = useRef<HTMLDivElement | null>(null);

    listenForWindowClick(() => {
        setShowDialog(false);
    }, infoIconRef.current);

    useEffect(() => {
        const currentDialogRef = dialogRef.current;
        if (!currentDialogRef) {
            return;
        }

        if (showDialog) {
            currentDialogRef.show();
        } else {
            currentDialogRef.close();
        }
    }, [ showDialog ]);

    return (
        <>
            <SvgIcon
                src={"/assets/info-icon.svg"}
                height={height}
                width={width}
                isButton={true}
                color={color}
                onClick={() => setShowDialog(current => !current)}
                setExternalRef={infoIconRef}/>
            <div className={`popup-wrapper ${alignPopup} ${screenSide}`}>
                <dialog ref={dialogRef}
                    className="message-dialog"
                    onClick={() => setShowDialog(current => !current)}
                    onKeyDown={(e) => handleEnterKeyEvent(e, () => setShowDialog(current => !current))}>
                    { message }
                </dialog>
            </div>
        </>
    )
}

export default InformationIcon;