import { messaging } from "../../../constants/messaging";

function DiscountedCashFlowDefinitionBlock() {

    return <div className='definition-block-contents' id='discountedCashFlowPrice'>
        <span>{ messaging.descriptions.discountedCashFlowPrice }</span>
        <label className='list-title'>Required Data</label>
        <ol className='list'>
            <li>Revenue</li>
            <li>Operating Cash Flow</li>
            <li>Capital Expenditure</li>
            <li>Free Cash Flow</li>
            <li>Weighted Average Cost of Capital (WACC)</li>
            <li>Enterprise Value</li>
            <li>Net Debt</li>
            <li>Equity Value</li>
            <li>Diluted Shares Outstanding</li>
        </ol>
    </div>
}

export default DiscountedCashFlowDefinitionBlock;