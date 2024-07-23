import './ValuationPriceDefinitionDropdownItem.scss';
import { Link } from "react-router-dom";
import DefinitionListItem from "../../atoms/definition-list-item/DefinitionListItem";

export interface ValuationPriceDefinitionDropdownItemProps {
    word: string
    messaging: string
    elementId: string
}

function ValuationPriceDefinitionDropdownItem({ word, messaging, elementId }: ValuationPriceDefinitionDropdownItemProps) {

    return (
        <DefinitionListItem
            word={word}
            expandedHeight={100}
            definitionElement={
                <div className='valuation-definition'>
                    <p>
                        { messaging }
                    </p>
                    <Link to={`/about#${elementId}`} target="_blank" >Learn more about { word }</Link>
                </div>
            }/>
    )
}

export default ValuationPriceDefinitionDropdownItem;