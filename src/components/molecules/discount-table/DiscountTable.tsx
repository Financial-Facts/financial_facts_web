import './DiscountTable.scss';
import { Order, SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings'
import ZeroState from '../../atoms/zero-state/ZeroState'
import { cleanKey } from '../../../utilities';
import FormatService from '../../../services/format/format.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { Option } from '../../atoms/multi-select/MultiSelect';

export interface DiscountTableProps {
    discounts: SimpleDiscount[],
    fieldOptions: MultiValue<Option>
}

function DiscountTable({ discounts, fieldOptions }: DiscountTableProps) {

    const navigate = useNavigate();
    const [ sortByKey, setSortByKey ] = useState<keyof SimpleDiscount>('lastUpdated');
    const [ sortOrder, setSortOrder ] = useState<Order>('ASC');

    const currencyKeys = new Set<string>([
        'marketPrice', 'stickerPrice', 'discountedCashFlowPrice', 'benchmarkRatioPrice'
    ]);

    useEffect(() => {
        if (fieldOptions.length > 0 && fieldOptions.every(option => option.value !== sortByKey)) {
            setSortByKey(fieldOptions[0].value as keyof SimpleDiscount)
        }
    }, [ fieldOptions ]);

    const displayedFields = useMemo(() =>
            discounts.length > 0 ? 
            Object
                .keys(discounts[0])
                .filter(key => fieldOptions.some(option => option.value === key)
        ) : [], [ fieldOptions ])

    const compare = (a: string | number | boolean, b: string | number | boolean) => 
        sortOrder === 'ASC' ? 
            a < b ? 1 : -1 :
            a > b ? 1 : -1;

    const getSortFunction = (
        sortByKey: keyof SimpleDiscount
    ): (a: SimpleDiscount, b: SimpleDiscount) => number => {
        switch(sortByKey) {
            case 'lastUpdated': {
                return (a, b) => compare(new Date(a.lastUpdated).valueOf(), new Date(b.lastUpdated).valueOf());
            }
            default: {
                return (a, b) => compare(a[sortByKey], b[sortByKey]);
            }
        }
    }

    const renderTableHeader = () =>
        <thead>
            <tr>
                {
                    displayedFields
                        .map(key =>
                            <th key={key}
                                onClick={() => sortByKey === key ?
                                        setSortOrder(current => current === 'ASC' ? 'DESC' : 'ASC') :
                                        setSortByKey(key as keyof SimpleDiscount)}>
                                <span className='header-text'>{ cleanKey(key) }</span>
                                { 
                                    sortByKey === key &&
                                        <img src='/assets/sort-arrows-icon.svg'
                                            className={`sortArrow`}/>
                                }
                            </th>) 
                }
            </tr>
        </thead>

    const renderTableData = () => 
        <tbody>
            {
                [...discounts]
                    .sort(getSortFunction(sortByKey))
                    .map(discount => 
                        <tr key={discount.cik}
                            onClick={() => navigate(`/discount/${discount.cik}`)}>
                            {
                                displayedFields
                                    .map(key => {
                                        let value = discount[key as keyof SimpleDiscount]; 
                                        if (currencyKeys.has(key)) {
                                            value = FormatService.formatToDollarValue(value as number);
                                        }
                                        return <td key={`${discount.cik}-${key}`} className={`${key}-flex`}>{ String(value) }</td>
                                    })
                            }
                        </tr>)
            }
        </tbody>

    return (
        <div className='discount-table-wrapper'>
            <table className='discount-table'>
                { renderTableHeader() }
                { discounts.length > 0 && displayedFields.length > 0 && renderTableData() }
            </table>
            { 
                (discounts.length === 0 || displayedFields.length === 0) &&
                    <ZeroState message={'There are no discounts that match this criteria'} supportText={''}/>
            }
        </div>
    )
  }
  
  export default DiscountTable;