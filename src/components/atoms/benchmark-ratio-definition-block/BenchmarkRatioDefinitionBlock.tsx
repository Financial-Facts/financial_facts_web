import './BenchmarkRatioDefinitionBlock.scss';
import { messaging } from '../../../constants/messaging';

function BenchmarkRatioDefinitionBlock() {

    return <div className='definition-block-contents' id='benchmarkRatioPrice'>
        <span>{ messaging.descriptions.benchmarkRatioPrice }</span>
    </div>
}

export default BenchmarkRatioDefinitionBlock;