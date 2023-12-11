import { SimpleDiscount } from "../../services/bulk-entities/bulk-entities.typings"
import DiscountCard from "../discount-card/DiscountCard"
import LoadingSpinner from "../loading-spinner/loading-spinner"
import "./DiscountDisplaySection.scss"
import NavCircleList from "../nav-circle-list/NavCircleList"
import { useRef } from "react"

export interface DiscountDisplayParams {
  discounts: SimpleDiscount[],
  loading: boolean
}

function DiscountDisplaySection({ discounts, loading }: DiscountDisplayParams ) {

    const discountList = useRef<HTMLUListElement>();

    const renderDiscountCards = () => {
      return discounts
        .sort((a, b) => a.active ? -1 : b.active ? 1 : a.ttySalePrice - b.ttySalePrice)
        .map(discount => <DiscountCard key={discount.cik} discount={ discount }></DiscountCard>);
    }

    const scrollToIndex = (index: number) => {
      const element = discountList.current;
      if (element) {
        element.scrollTo({
          left: (840 * index),
          behavior: 'smooth'
        });
      }
    }

    return (
      <section className="discount-display-section">
        <h2>Current Discounts</h2>
        <h3>See existing discounts and their <span>sale price</span></h3>
        { loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <>
            <ul ref={discountList as React.LegacyRef<HTMLUListElement>} className="discounts">
              { renderDiscountCards() }
            </ul>
            <NavCircleList
              numOfCircles={ discounts.length > 4 ? discounts.length / 4 : 0 }
              scrollToIndex={ scrollToIndex }></NavCircleList>
          </>
        )}
      </section>
    )
  }
  
  export default DiscountDisplaySection