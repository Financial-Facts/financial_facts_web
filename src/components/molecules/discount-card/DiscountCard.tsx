import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SymbolIcon from "../../atoms/symbol-icon/symbol-icon";
import "./DiscountCard.scss";
import { CONSTANTS } from "../../../constants/constants";
import { DiscountWrapper } from "../../../services/bulk-entities/bulk-entities.typings";
import FormatService from "../../../services/format/format.service";
import { useSelector } from "react-redux";
import { MobileState } from "../../../store/mobile/mobile.slice";

function DiscountCard({ discount }: DiscountWrapper ) {

    const navigate = useNavigate();
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const [ displayData, setDisplayData ] = useState(false);
    const [ imageNotFound, setImageNotFound ] = useState(false);

    const handleClick = () => {
        if (!displayData) {
            setDisplayData(true);
        } else {
            navigate(`/discount/${ discount.cik }`);
        }
    }

    return (
        <li className={`discount-card ${mobile.mobile && displayData ? 'mobile-clicked' : CONSTANTS.EMPTY}`}
            onClick={handleClick}
            onMouseOver={() => !mobile.mobile && setDisplayData(true)}
            onMouseLeave={() => !mobile.mobile && setDisplayData(false)}>
            <div className="company-info">
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
                            <span className="click-for-more">Click for more details!</span>
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
                                        <img src='/assets/check.svg' height={20} width={15}/>
                                    </div> :
                                    undefined }
                            </span>
                        </>
                }
            </div>
        </li>
    )
  }
  
  export default DiscountCard;