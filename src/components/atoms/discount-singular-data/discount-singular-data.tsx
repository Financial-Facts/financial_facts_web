import { StickerPrice, BenchmarkRatioPrice, DiscountedCashFlowPrice, StickerPriceInput, BenchmarkRatioPriceInput, DiscountedCashFlowInput, Discount } from '../../../types/discount.typings';
import './discount-singular-data.scss';
import { cleanKey } from '../../../utilities';
import InformationIcon from '../../molecules/information-icon/InformationIcon';
import { messaging } from '../../../constants/messaging';
import { SpSingularDataKeys, SpSingularDataKeyOption, DcfSingularDataKeys, DcfSingularDataKeyOption, BrpSingularDataKeys, BrpSingularDataKeyOption, PercentageKeys, CurrencyKeys, DiscountCurrencyKeys } from './discount-singular-data.typings';
import FormatService from '../../../services/format/format.service';

export interface DiscountSingularDataProps {
    title: string
    valuation?: StickerPrice | BenchmarkRatioPrice | DiscountedCashFlowPrice,
    discountData?: {
        discount: Discount,
        discountKeys: (keyof Discount)[]
    }
}

function DiscountSingularData({ title, valuation, discountData }: DiscountSingularDataProps) {

    const singularData = 
        valuation ? 
            Object.keys(valuation.input).reduce<Record<string, string>>((acc, key) => {
                if (SpSingularDataKeys.includes(key as SpSingularDataKeyOption) ||
                    DcfSingularDataKeys.includes(key  as DcfSingularDataKeyOption) ||
                    BrpSingularDataKeys.includes(key as BrpSingularDataKeyOption)) {
                    acc[key] = valuation.input[key as keyof (StickerPriceInput | BenchmarkRatioPriceInput | DiscountedCashFlowInput)];
                }
                return acc;
            }, {}) :
        discountData ?
            discountData.discountKeys.reduce<Record<string, string>>((acc, key) => {
                if (DiscountCurrencyKeys.includes(key)) {
                    acc[key] = FormatService.formatToDollarValue(Number(discountData.discount[key]));
                } else {
                    acc[key] = String(discountData.discount[key]);
                }
                return acc;
            }, {}) :
        undefined;

    const renderDataListItem = (
        key: DcfSingularDataKeyOption | SpSingularDataKeyOption | BrpSingularDataKeyOption,
        value: number | string
    ) =>
        (<li className='data-list-item' key={key}>
            <span className='text'>
                { cleanKey(key) }
                { key === 'debtYears' && <InformationIcon message={messaging.debtYears} alignPopup='center'/>}
            </span>
            <span className='text'>
                { 
                    PercentageKeys.includes(key) ? `${ FormatService.roundToDollarValue(Number(value)) }%` : 
                    CurrencyKeys.includes(key) ? FormatService.formatToDollarValue(Number(value)) :
                    value
                }
            </span>
        </li>);

    const renderDataList = (singularData: Record<string, string>) =>
        Object.keys(singularData).map(key => {
            const cast = key as DcfSingularDataKeyOption | SpSingularDataKeyOption | BrpSingularDataKeyOption;
            return renderDataListItem(cast, singularData[key])
        })

    
    return (
        <>
            <h2>{ title }</h2>
            { 
                singularData && 
                    <ul className={`data-list`}>
                        { renderDataList(singularData) }
                    </ul> 

            }
        </>
    )
  }
  
  export default DiscountSingularData;