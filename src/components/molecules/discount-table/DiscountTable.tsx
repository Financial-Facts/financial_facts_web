import './DiscountTable.scss';
import { Order, SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings'
import { cleanKey } from '../../../utilities';
import FormatService from '../../../services/format/format.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { Option } from '../../atoms/multi-select/MultiSelect';
import ResponsiveTable from '../responsive-table/ResponsiveTable';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { sortDiscounts } from '../../../store/discounts/discounts.slice';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';

export interface DiscountTableProps {
    discounts: SimpleDiscount[],
    fieldOptions: MultiValue<Option>
}

function DiscountTable({ discounts, fieldOptions }: DiscountTableProps) {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [ sortByKey, setSortByKey ] = useState<keyof SimpleDiscount>('name');
    const [ sortOrder, setSortOrder ] = useState<Order>('ASC');

    const currencyKeys = new Set<string>([
        'marketPrice', 'stickerPrice', 'discountedCashFlowPrice', 'benchmarkRatioPrice'
    ]);

    useEffect(() => {
        if (fieldOptions.length > 0 && fieldOptions.every(option => option.value !== sortByKey)) {
            setSortByKey(fieldOptions[0].value as keyof SimpleDiscount)
        }
    }, [ fieldOptions ]);

    useEffect(() => {
        dispatch(sortDiscounts({
            sortBy: sortByKey,
            sortOrder: sortOrder
        }));
    }, [ sortByKey, sortOrder ]);

    const displayedFields = useMemo(() =>
            discounts.length > 0 ? 
            Object
                .keys(discounts[0])
                .filter(key => fieldOptions.some(option => option.value === key)
        ) : [], [ fieldOptions ])

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
                                <div className='table-header-content'>
                                    <span className='header-text'>
                                        { cleanKey(key) }
                                        { 
                                            key === 'active' &&
                                                <SvgIcon
                                                    src='/assets/info-icon.svg'
                                                    height='16px'
                                                    width='16px'
                                                    color='#F5F5F5'
                                                    tooltipMessage='A discount is considered active when the market price is below all valuation prices'/>
                                        }
                                    </span>
                                    { 
                                        sortByKey === key &&
                                            <img src='/assets/sort-arrows-icon.svg'
                                                className={`sortArrow`}/>
                                    }
                                </div>
                            </th>) 
                }
            </tr>
        </thead>

    const renderTableBody = () => 
        <tbody>
            {
                discounts.map(discount => 
                    <tr key={discount.cik}
                        onClick={() => navigate(`/discount/${discount.cik}`, {
                            state: {
                                useFilteredDiscounts: true
                            }
                        })}>
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
        <ResponsiveTable
            className='discount-table'
            renderTableHeader={renderTableHeader}
            renderTableBody={renderTableBody}
            zeroStateCondition={discounts.length === 0 || displayedFields.length === 0}/>
    )
  }
  
  export default DiscountTable;