import { DiscountWrapper } from "../../services/bulk-entities/bulk-entities.typings"
import "./DiscountCard.scss"

function DiscountCard({ discount }: DiscountWrapper ) {

    const round = (num: number, fractionDigits: number): number => {
        return Number(num.toFixed(fractionDigits));
    }
    return (
        <li className="discount-card">
            <div className="company-info">
                <span className="symbol">{ discount.symbol }</span>
                <span className="name">{ discount.name }</span>
            </div>
            <span className="tty-price">{ round(discount.ttySalePrice, 2) }</span>
        </li>
    )
  }
  
  export default DiscountCard;