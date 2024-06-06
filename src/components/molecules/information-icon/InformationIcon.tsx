import { useEffect, useState } from "react";
import SvgIcon from "../../atoms/svg-icon/SvgIcon";
import { initRef } from "../../../utilities";
import './InformationIcon.scss';

export interface InformationIconProps {
    message: string,
    color?: string,
    height?: string,
    width?: string,
    alignPopup?: 'center' | 'flex-start'
}

function InformationIcon({ 
    message,
    color,
    height = '16px',
    width = '16px',
    alignPopup = 'flex-start'
}: InformationIconProps) {

    const [ dialogRef, setDialogRef ] = useState<HTMLDialogElement | null>(null);
    const [ showDialog, setShowDialog ] = useState<boolean>(false);
    
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
                onClick={() => setShowDialog(current => !current)}/>
            <div className={`popup-wrapper ${alignPopup}`}>
                <dialog ref={(ref) => initRef(ref, setDialogRef)}
                    className="message-dialog"
                    onClick={() => setShowDialog(current => !current)}>
                    { message }
                </dialog>
            </div>
        </>
    )
}

export default InformationIcon;