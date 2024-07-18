import './StickyTextButton.scss';
import { useNavigate } from "react-router-dom";

export interface StickyTextButtonProps {
    text: string
    url: string
}

function StickyTextButton({ text, url }: StickyTextButtonProps) {
    
    const navigate = useNavigate();

    return (
        <div className='sticky-menu-option sticky-text-button'>
            <button className="league-spartan text-button"
                onClick={() => navigate(url)}>
                { text }
            </button>
        </div>
    )
}

export default StickyTextButton;