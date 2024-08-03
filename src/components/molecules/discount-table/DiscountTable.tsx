import './DiscountTable.scss';
import { SimpleDiscount } from '../../../services/bulk-entities/bulk-entities.typings'
import { cleanKey } from '../../../utilities';
import FormatService from '../../../services/format/format.service';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Option } from '../../atoms/multi-select/MultiSelect';
import ResponsiveTable from '../responsive-table/ResponsiveTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { DiscountSort, DiscountState, sortDiscounts } from '../../../store/discounts/discounts.slice';
import InformationIcon from '../information-icon/InformationIcon';
import { messaging } from '../../../constants/messaging';
import { CONSTANTS } from '../../../constants/constants';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';

export interface DiscountTableProps {
    discounts: SimpleDiscount[],
    fieldOptions: Option<keyof SimpleDiscount>[]
}

function DiscountTable({ discounts, fieldOptions }: DiscountTableProps) {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const { sortBy, sortOrder } = useSelector< { discounts: DiscountState }, DiscountSort>((state) => state.discounts.filteredSort );
    
    const currencyKeys = new Set<keyof SimpleDiscount>([
        'marketPrice', 'stickerPrice', 'discountedCashFlowPrice', 'benchmarkRatioPrice', 'annualDividend'
    ]);

    const percentKeys = new Set<keyof SimpleDiscount>([
        'discountFromStickerPrice'
    ]);

    const displayedFields = useMemo(() =>
        fieldOptions.map(option => option.id)
    , [ fieldOptions ]);

    const updateSortByKey = (key: keyof SimpleDiscount) => {
        sortBy === key ?
            dispatch(sortDiscounts({
                sortBy: sortBy,
                sortOrder: sortOrder === 'ASC' ? 'DESC' : 'ASC'
            })) :
            dispatch(sortDiscounts({
                sortBy: key,
                sortOrder: 'ASC'
            }))
    }

    const handleHeaderClicked = (
        e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
        headerKey: keyof SimpleDiscount
    ): void => {
        if (headerKey === 'active') {
            const target = e.target as HTMLElement;
            const isSvg = target.classList.contains('svg-icon-wrapper');
            const isInfoElement = target.tagName === CONSTANTS.TAG_NAME.PATH;
            const isDialog = target.tagName === CONSTANTS.TAG_NAME.DIALOG;
            if (!isSvg && !isInfoElement && !isDialog) {
                updateSortByKey(headerKey);
            }
        } else {
            updateSortByKey(headerKey);
        }
    }

    const renderTableHeader = () =>
        <thead>
            <tr>
                {
                    displayedFields
                        .map(key =>
                            <th key={key}
                                onClick={(e) => handleHeaderClicked(e, key)}>
                                <div className='table-header-content'>
                                    <span className='header-text'>
                                        { cleanKey(key) }
                                        { 
                                            key === 'active' &&
                                                <InformationIcon
                                                    message={messaging.active}
                                                    color='currentColor'/>
                                        }
                                    </span>
                                    { 
                                        sortBy === key &&
                                            <SvgIcon
                                                src={'/assets/sort-arrows-icon.svg'}
                                                height={'15px'}
                                                width={'15px'}/>
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
                        onClick={() => navigate(`/discounts/${discount.cik}`, {
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
                                    if (percentKeys.has(key)) {
                                        value = FormatService.formatToPercentValue(value as number);
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