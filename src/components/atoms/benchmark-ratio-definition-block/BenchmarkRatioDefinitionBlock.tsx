import './BenchmarkRatioDefinitionBlock.scss';
import SvgIcon from "../svg-icon/SvgIcon";
import { messaging } from '../../../constants/messaging';

function BenchmarkRatioDefinitionBlock() {

    return <div className='definition-block-contents' id='benchmarkRatioPrice'>
        <span>{ messaging.descriptions.discountedCashFlowPrice }</span>
        <label className='list-title'>Required Data</label>
        <ol className='list'>
            <li>Total Revenue</li>
            <li>Number of Common Shares Outstanding</li>
            <li>Average price-per-share ratio for the Industry of the Company Being Evaluated (benchmark)</li>
        </ol>
        <label className="list-title">High Level Steps</label>
            <SvgIcon
                src={'/assets/sales_per_share_equation.svg'}
                height={'50px'}
                width={'min(300px, 100%)'}
                wrapperPadding='0'/>
        
            <SvgIcon 
                src={'/assets/benchmark_ratio_price_equation.svg'}
                height={'25px'}
                width={'min(350px, 100%)'}
                wrapperPadding='16px'/>
    </div>
}

export default BenchmarkRatioDefinitionBlock;