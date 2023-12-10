import { SimpleDiscount } from "../../services/bulk-entities/bulk-entities.typings"
import DiscountCard from "../discount-card/DiscountCard"
import LoadingSpinner from "../loading-spinner/loading-spinner"
import "./DiscountDisplaySection.scss"

export interface DiscountDisplayParams {
  discounts: SimpleDiscount[],
  loading: boolean
}

function DiscountDisplaySection({ discounts, loading }: DiscountDisplayParams ) {

    const renderDiscountCards = () => {
      return discounts
        .sort((a, b) => a.active ? -1 : b.active ? 1 : a.ttySalePrice - b.ttySalePrice)
        .map(discount => <DiscountCard key={discount.cik} discount={ discount }></DiscountCard>);
    }

    return (
      <section className="discount-display-section">
        <h2>Current Discounts</h2>
        <h3>See existing discounts and their sale price</h3>
        { loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <ul className="discounts">
            { renderDiscountCards() }
          </ul>        
        )}
      </section>
    )
  }
  
  export default DiscountDisplaySection