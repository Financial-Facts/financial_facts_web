import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SymbolIcon from "../../atoms/symbol-icon/symbol-icon";
import "./DiscountCard.scss";
import { CONSTANTS } from "../../../constants/constants";
import { DiscountWrapper } from "../../../services/bulk-entities/bulk-entities.typings";
import FormatService from "../../../services/format/format.service";

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
                                <span className="date"><b>Updated: </b>{ discount.lastUpdated }</span>
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
                                <span className={`symbol ${ discount.active ? 'active' : CONSTANTS.EMPTY }`}>
                                    { discount.symbol }
                                    { discount.active ?
                                        <div className="active-icon-wrapper">
                                            <img src='/assets/icons/check.svg' height={20} width={15}/>
                                        </div> :
                                        undefined }
                                </span>
                            </>
                    }
                </>
            </div>
        </li>
    )
  }
  
  export default DiscountCard;