import { useEffect, useState } from "react";
import SvgIcon from "../../atoms/svg-icon/SvgIcon";
import { handleEnterKeyEvent, initRef } from "../../../utilities";
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

    const [ dialogRef, setDialogRef ] = useState<HTMLDialogElement | null>(null);
    const [ showDialog, setShowDialog ] = useState<boolean>(false);
    const [ infoIconRef, setInfoIconRef ] = useState<HTMLDivElement | null>(null);

    listenForWindowClick(() => {
        setShowDialog(false);
    }, infoIconRef);

    useEffect(() => {
        if (!dialogRef) {
            return;
        }

        if (showDialog) {
            dialogRef.show();
        } else {
            dialogRef.close();
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
                setExternalRef={setInfoIconRef}/>
            <div className={`popup-wrapper ${alignPopup} ${screenSide}`}>
                <dialog ref={(ref) => initRef(ref, setDialogRef)}
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