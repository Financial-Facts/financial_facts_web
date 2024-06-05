import './ValuationSection.scss';
import { Link } from 'react-router-dom';
import { environment } from '../../../environment';
import DefinitionListItem from '../../atoms/definition-list-item/DefinitionListItem';
import DropdownInformationList from '../../atoms/dropdown-information-list/DropdownInformationList';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';

function ValuationsSection() {

    return (
        <DropdownInformationList
            title={'Valuations'}
            listItem={<>
                <DefinitionListItem
                    word={'Sticker Price'}
                    expandedHeight={100}
                    definitionElement={
                        <div className='valuation-definition'>
                            <p>
                                Sticker price valution is a comprehensive method for determining the intrinsic value of a stock detailed in the book Rule #1. 
                                This method involves analyzing a company's historical growth rates, projecting future earnings, estimating 
                                future stock prices, and discounting these values to their present worth. By comparing this intrinsic value, 
                                or "sticker price," to the current market price, investors can identify undervalued stocks with a significant margin of safety.
                            </p>
                            <span>Read more about it here: <Link to={environment.ruleNumberOneLink} target="_blank"> Official Rule #1 Website </Link></span>
                        </div>
                    }/>
                <DefinitionListItem
                    word={'Discounted Cash Flow Price'}
                    expandedHeight={100}
                    definitionElement={
                        <div className='valuation-definition'>
                            <p>
                                Levered discounted cash flow valuation is a technique for determining the intrinsic value of a stock by focusing on the company's
                                cash flows available to equity holders after accounting for debt payments. This method involves projecting the company’s
                                future free cash flows, which are then discounted back to their present value using the cost of equity as the discount rate.
                                By summing these present values, investors can calculate the total equity value of the company. Comparing this intrinsic value
                                to the current market price helps identify undervalued stocks with a significant margin of safety.
                            </p>
                            <span>Read more about it here: <Link to={environment.financialModelingPrepDCFLink} target="_blank"> Financial Modeling Prep DCF</Link></span>
                        </div>
                    }/>
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
            </>}/>
    )
}

export default ValuationsSection;