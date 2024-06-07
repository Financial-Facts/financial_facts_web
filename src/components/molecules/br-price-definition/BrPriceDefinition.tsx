import { Link } from "react-router-dom";
import { environment } from "../../../environment";
import DefinitionListItem from "../../atoms/definition-list-item/DefinitionListItem";
import SvgIcon from "../../atoms/svg-icon/SvgIcon";
import './BrPriceDefinition.scss';

function BrPriceDefinition() {

    return (
        <DefinitionListItem
            word={'Benchmark Ratio Price'}
            expandedHeight={100}
            definitionElement={
                <div className='valuation-definition'>
                    <p>
                        The benchmark-ratio price (or the Price-to-Sales (P/S) Ratio) valuation technique is a straightforward and effective 
                        approach to determining the fair value of a stock based on its sales. This method involves three main steps:
                    </p>
                    <ol className='brp-steps-list'>
                        <li>
                            <h4 className='subheader'>Determine Sales per Share</h4>
                            <div className='brp-step-content'>
                                <label htmlFor='data-to-collect'>Required Data</label>
                                <ul id='data-to-collect'>
                                    <li>Total Revenue (TTM)</li>
                                    <li>Number of common shares outstanding</li>
                                </ul>
                            </div>
                            <SvgIcon
                                src={'/assets/sales_per_share_equation.svg'}
                                height={'50px'}
                                width={'min(300px, 100%)'}
                                wrapperPadding='24px 16px 16px 0'/>
                        </li>
                        <li>
                            <h4 className='subheader'>Identify industry benchmark P/S ratio</h4>
                            <div className='brp-step-content'>
                                <ul>
                                    <li>Identify the average price-per-share ratio for the industry the company being evaluated is associated with</li>
                                    <li>Ratios for all industries can be found here: <Link to={environment.benchmarkRatioLink} target="_blank">Average P/S Ratio by Industry</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h4 className='subheader'>Multiply Sales per Share by the Industry's P/S Ratio</h4>
                            <SvgIcon 
                                src={'/assets/benchmark_ratio_price_equation.svg'}
                                height={'25px'}
                                width={'min(350px, 100%)'}
                                wrapperPadding='24px 16px 16px 0'/>
                        </li>
                    </ol>
                    <p>
                        This method is particularly useful for evaluating companies with stable and predictable sales, providing a
                        simple yet effective way to assess the intrinsic value of a stock.
                    </p>
                </div>
            }/>
    )
}

export default BrPriceDefinition;