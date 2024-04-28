import { useEffect, useState } from 'react';
import { StickerPrice, BenchmarkRatioPrice, DiscountedCashFlowPrice, StickerPriceInput, BenchmarkRatioPriceInput, DiscountedCashFlowInput } from '../../../types/discount.typings';
import './discount-singular-data.scss';
import { DcfPeriodicDataKeys, SpPeriodicDataKeys } from '../../organisms/discount-data-display-section/DiscountDataDisplaySection.typings';
import { cleanKey } from '../../../utilities';

export interface DiscountSingularDataProps {
    valuation: StickerPrice | BenchmarkRatioPrice | DiscountedCashFlowPrice
}

function DiscountSingularData({ valuation }: DiscountSingularDataProps) {

    const [ singularData, setSingularData ] = useState<Record<string, string>>({})

    useEffect(() => {
        setSingularData({});
        Object.keys(valuation.input).forEach((key) => {
            if (!SpPeriodicDataKeys.includes(key) && !DcfPeriodicDataKeys.includes(key)) {
                const value = valuation.input[key as keyof (StickerPriceInput | BenchmarkRatioPriceInput | DiscountedCashFlowInput)];
                setSingularData((current) => ({
                    ...current,
                    ...{ [key]: value }
                }));
            }
        })
    }, [ valuation ]);

    const renderDataListItem = (key: string, value: number | string) =>
        (<li className='data-list-item' key={key}>
            <span className='text'>{ cleanKey(key) }</span>
            <span className='text'>{ value }</span>
        </li>);

    const renderDataList = (record: Record<string, number | string>) =>
        <ul className={`data-list`}>
            { Object.keys(record).map(key => renderDataListItem(key, record[key])) }
        </ul>
    

    return (
        <>
            <h2>Valuation Inputs</h2>
            { renderDataList(singularData) }
        </>
    )
  }
  
  export default DiscountSingularData;