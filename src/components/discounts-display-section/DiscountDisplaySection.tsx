import { BulkDiscountsWrapper } from "../../services/bulk-entities/bulk-entities.typings"
import DiscountCard from "../discount-card/DiscountCard"
import "./DiscountDisplaySection.scss"

function DiscountDisplaySection({ discounts }: BulkDiscountsWrapper ) {

    const renderDiscountCards = () => {
      return discounts.map(discount => {
        return <DiscountCard key={discount.cik} discount={ discount }></DiscountCard>
      })
    }

    return (
      <ul className="discount-display-section">
        { renderDiscountCards() }
      </ul>
    )
  }
  
  export default DiscountDisplaySection