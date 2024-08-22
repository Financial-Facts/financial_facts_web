import FormatService from '../../../services/format/format.service';
import { filterBySpan } from '../../../utilities';
import { SPAN } from '../../organisms/facts-display-section/FactsDisplaySection';
import { TableData, TableDataType } from '../periodic-data-chart/PeriodicDataChart.typings';
import './PeriodicDataTable.scss';

export interface PeriodicDataTableProps {
    tableData: TableData,
    span: SPAN,
    dataType?: TableDataType
};

function PeriodicDataTable({ tableData, span, dataType }: PeriodicDataTableProps) {

    const renderDataRows = (tableData: TableData) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData =>
            dataType === 'CURRENCY' ?
                FormatService.formatToDollarValue(periodicData.value):
                periodicData.value);
            
        let key = 0;
        return <tbody key={ `${tableData.label}-table-body` }>
            <tr>
                { columns.map(col => <td key={`col-${key++}`}> { col } </td>)}
            </tr>
        </tbody>
    }

    const renderHeaderRows = (tableData: TableData) => {
        const columns = filterBySpan(tableData.periodicData, span)
            .map(periodicData => new Date(periodicData.announcedDate).toLocaleDateString());
        let key = 0;
        return <thead key={ `${tableData.label}-table-header` }>
            <tr>
                { columns.map(col => <th key={`col-${key++}`}> { col } </th>)}
            </tr>
        </thead>
    }

    const renderTables = () => 
        (<div className='table-wrapper'>
            <div className='table-title' title={tableData.label}> {tableData.label} </div>
            <table className='periodic-data-table'>
                { renderHeaderRows(tableData) }
                { renderDataRows(tableData) }
            </table>
        </div>)

    return renderTables()

}
  
export default PeriodicDataTable;