import { StickerPrice, BenchmarkRatioPrice, DiscountedCashFlowPrice, StickerPriceInput, BenchmarkRatioPriceInput, DiscountedCashFlowInput } from '../../../types/discount.typings';
import './discount-singular-data.scss';
import { cleanKey } from '../../../utilities';
import InformationIcon from '../../molecules/information-icon/InformationIcon';
import { messaging } from '../../../constants/messaging';
import { SpSingularDataKeys, SpSingularDataKeyOption, DcfSingularDataKeys, DcfSingularDataKeyOption, BrpSingularDataKeys, BrpSingularDataKeyOption } from './discount-singular-data.typings';

export interface DiscountSingularDataProps {
    valuation: StickerPrice | BenchmarkRatioPrice | DiscountedCashFlowPrice
}

function DiscountSingularData({ valuation }: DiscountSingularDataProps) {

    const singularData = Object.keys(valuation.input).reduce<Record<string, string>>((acc, key) => {
        if (SpSingularDataKeys.includes(key as SpSingularDataKeyOption) ||
            DcfSingularDataKeys.includes(key  as DcfSingularDataKeyOption) ||
            BrpSingularDataKeys.includes(key as BrpSingularDataKeyOption)) {
            acc[key] = valuation.input[key as keyof (StickerPriceInput | BenchmarkRatioPriceInput | DiscountedCashFlowInput)];
        }
        return acc;
    }, {});

    const renderDataListItem = (key: string, value: number | string) =>
        (<li className='data-list-item' key={key}>
            <span className='text'>
                { cleanKey(key) }
                { key === 'debtYears' && <InformationIcon message={messaging.debtYears} alignPopup='center'/>}
            </span>
            <span className='text'>{ value }</span>
        </li>);

    const renderDataList = () =>
        <ul className={`data-list`}>
            { Object.keys(singularData).map(key => {
                return renderDataListItem(key, singularData[key])
            }) }
        </ul>
    

    return (
        <>
            <h2>Valuation Inputs</h2>
            { renderDataList() }
        </>
    )
  }
  
  export default DiscountSingularData;