import { CONSTANTS } from '../../../constants/constants';
import FormatService from '../../../services/format/format.service';
import { Qualifier } from '../../../types/discount.typings';
import InformationIcon from '../information-icon/InformationIcon';
import ResponsiveTable from '../responsive-table/ResponsiveTable';
import './DiscountQualifiers.scss';

export interface DiscountQualifiersProps {
    qualifiers: Qualifier[]
}

const typeTitleMap: Record<string, string> = {
    annualROIC: 'Average ROIC',
    annualRevenue: 'Revenue CAGR',
    annualEPS: 'EPS CAGR',
    annualEquity: 'Equity CAGR',
    annualOperatingCashFlow: 'Operating Cash Flow CAGR'
};

function DiscountQualifiers({ qualifiers }: DiscountQualifiersProps) {

    const periodMap = qualifiers.reduce<Record<string, Record<number, number>>>((acc, qualifier) => {
        const { type } = qualifier;
        if (!acc[type]) {
            acc[type] = {};
        }
        acc[type][qualifier.periods] = qualifier.value;
        return acc;
    }, {});

    const renderTableHeader = () => <thead>
        <tr>
            <th className='side-text'></th>
            {
                Object.keys(periodMap).map(header => 
                    <th colSpan={Object.keys(periodMap[header]).length} 
                        className='qualifier-header key-header'
                        key={header}>{ `${typeTitleMap[header]}` }
                    </th>)
            }
        </tr>
        <tr>
            <th className='side-text'>
                <span className='row-header years'>Years</span>
            </th>
            {
                Object.keys(periodMap).reduce<JSX.Element[]>((acc, qualifierType, periodsIndex) => {
                    const periods = periodMap[qualifierType];
                    const isLastPeriodSet = periodsIndex === Object.values(periodMap).length - 1;
                    const periodKeys = Object.keys(periods).sort((a, b) => Number(a) - Number(b));
                    periodKeys.forEach((period, index) => {
                        const isLastPeriod = index === periodKeys.length - 1;
                        acc.push(
                            <th className={`qualifier-header ${ 
                                !isLastPeriodSet && isLastPeriod ? 'border-right' : CONSTANTS.EMPTY}`}
                                key={`${qualifierType}-${period}`}>
                                { period }
                            </th>)
                    })
                    return acc;
                }, [])
            }
        </tr>
    </thead>;

    const renderTableBody = () => <tbody>
        <tr>
            <td className='side-text'></td>
            {
                Object.keys(periodMap).map(qualifierType => 
                    Object.keys(periodMap[qualifierType]).map(numPeriods => 
                        <td className='qualifier-data'
                            key={`$${qualifierType}-${numPeriods}`}>
                                { FormatService.formatToPercentValue(periodMap[qualifierType][Number(numPeriods)]) }
                        </td>
                    ))
            }
        </tr>
    </tbody>;

    return <section className='discount-qualifiers-section'>
        <div className='title'>
            <h2>Qualifying Data</h2>
            <InformationIcon
                message={'CAGR (Compound Annual Growth Rate) is a measurement of the average annual growth rate over a given period of time'}/>
        </div>
        <div className='qualifiers-display'>
            <ResponsiveTable 
                className={'qualifiers-table'} 
                renderTableHeader={renderTableHeader}
                renderTableBody={renderTableBody }
                zeroStateCondition={false}/>
        </div>
    </section>

}

export default DiscountQualifiers;