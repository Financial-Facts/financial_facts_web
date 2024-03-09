import { useNavigate } from "react-router-dom";
import { DiscountWrapper } from "../../services/bulk-entities/bulk-entities.typings"
import "./DiscountCard.scss"
import SymbolIcon from "../SymbolIcon/symbol-icon";
import { useState } from "react";
import FormatService from "../../services/format/format.service";

function DiscountCard({ discount }: DiscountWrapper ) {

    const navigate = useNavigate();
    const [ displayData, setDisplayData ] = useState(false);
    const [ imageNotFound, setImageNotFound ] = useState(false);

    return (
        <li className={`discount-card`}
            onClick={ () => navigate(`/discount/${ discount.cik }`) }
            onMouseOver={() => setDisplayData(true)}
            onMouseLeave={() => setDisplayData(false)}>
            <div className="company-info">
                <>
                    {
                        displayData ?
                            <>

                                <span className="name">{ discount.name }</span>
                                <span className="date"><b>Updated: </b>{ discount.lastUpdated.toString() }</span>
                                <table className="valuation-table">
                                    <caption>Valuations</caption>
                                    <tbody>
                                        <tr>
                                            <th>Sticker</th>
                                            <td>{ FormatService.formatToDollarValue(discount.stickerPrice) }</td>
                                        </tr>
                                        <tr>
                                            <th>LDCF</th>
                                            <td>{ FormatService.formatToDollarValue(discount.discountedCashFlowPrice) }</td>
                                        </tr>
                                        <tr>
                                            <th>Benchmark</th>
                                            <td>{ FormatService.formatToDollarValue(discount.benchmarkRatioPrice) }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </> : <>
                                { 
                                    imageNotFound ?
                                        undefined :
                                        <SymbolIcon symbol={ discount.symbol }
                                            size="LARGE"
                                            setImageNotFound={ setImageNotFound }/>
                                }
                                <span className="symbol">{ discount.symbol }</span>
                            </>
                    }
                </>
            </div>
        </li>
    )
  }
  
  export default DiscountCard;