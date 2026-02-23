import { messaging } from "../../../constants/messaging";

function StickerPriceDefinitionBlock() {

    return <div className='definition-block-contents' id='stickerPrice'>
        <span className="valuation-description">{ messaging.descriptions.stickerPrice }</span>
    </div>
}

export default StickerPriceDefinitionBlock;