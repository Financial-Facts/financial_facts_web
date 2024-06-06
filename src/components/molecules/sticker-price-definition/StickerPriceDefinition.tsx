import { Link } from "react-router-dom";
import { environment } from "../../../environment";
import DefinitionListItem from "../../atoms/definition-list-item/DefinitionListItem";

function StickerPriceDefinition() {

    return (
        <DefinitionListItem
            word={'Sticker Price'}
            expandedHeight={100}
            definitionElement={
                <div className='valuation-definition'>
                    <p>
                        Sticker price valuation is a comprehensive method for determining the intrinsic value of a stock detailed in the book Rule #1. 
                        This method involves analyzing a company's historical growth rates, projecting future earnings, estimating 
                        future stock prices, and discounting these values to their present worth. By comparing this intrinsic value, 
                        or "sticker price," to the current market price, investors can identify undervalued stocks with a significant margin of safety.
                    </p>
                    <span>Read more about it here: <Link to={environment.ruleNumberOneLink} target="_blank"> Official Rule #1 Website </Link></span>
                </div>
            }/>
    )
}

export default StickerPriceDefinition;