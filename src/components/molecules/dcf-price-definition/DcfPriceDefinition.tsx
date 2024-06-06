import { Link } from "react-router-dom";
import { environment } from "../../../environment";
import DefinitionListItem from "../../atoms/definition-list-item/DefinitionListItem";

function DcfPriceDefinition() {

    return (
        <DefinitionListItem
            word={'Discounted Cash Flow Price'}
            expandedHeight={100}
            definitionElement={
                <div className='valuation-definition'>
                    <p>
                        Levered discounted cash flow valuation is a technique for determining the intrinsic value of a stock by focusing on the company's
                        cash flows available to equity holders after accounting for debt payments. This method involves projecting the company’s
                        future free cash flows, which are then discounted back to their present value using the cost of equity as the discount rate.
                        By summing these present values, investors can calculate the total equity value of the company. Comparing this intrinsic value
                        to the current market price helps identify undervalued stocks with a significant margin of safety.
                    </p>
                    <span>Read more about it here: <Link to={environment.financialModelingPrepDCFLink} target="_blank"> Financial Modeling Prep DCF</Link></span>
                </div>
            }/>
    )
}

export default DcfPriceDefinition;