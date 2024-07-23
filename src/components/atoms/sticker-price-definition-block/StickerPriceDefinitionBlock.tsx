import { messaging } from "../../../constants/messaging";

function StickerPriceDefinitionBlock() {

    return <div className='definition-block-contents' id='stickerPrice'>
        <span className="valuation-description">{ messaging.descriptions.stickerPrice }</span>
        <label className='list-title'>Required Data</label>
        <ol className="list"> 
            <li>Current EPS (Earnings per Share)</li>
            <li>Estimated EPS Growth Rate</li>
            <li>Estimated Future PE (Price/Earnings Ratio)</li>
            <li>Minimum Acceptable Rate of Return</li>
        </ol>
        <label className="list-title">High Level Steps</label>
        <ol className="list">
            <li>Calculate the future EPS by growing the current EPS by the average growth rate</li>
            <li>Multiply the future EPS by the estimated future PE ratio</li>
            <li>Discount the minimum acceptable rate of return from the calculate future price</li>
        </ol>
    </div>
}

export default StickerPriceDefinitionBlock;