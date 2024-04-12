import { SPAN } from '../../organisms/facts-display-section/FactsDisplaySection';
import { filterBySpan } from '../../utilities';
import { TableData } from '../periodic-data-chart/PeriodicDataChart.typings';
import './PeriodicDataTable.scss';

export interface PeriodicDataTableProps {
    tableData: TableData,
    span: SPAN
};

function PeriodicDataTable({ tableData, span }: PeriodicDataTableProps) {

    const renderDataRows = (tableData: TableData) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData => periodicData.value);
        let key = 0;
        return <tbody key={ `${tableData.label}-table-body` }>
            <tr>
                { columns.map(col => <td key={`col-${key++}`}> { col } </td>)}
            </tr>
        </tbody>
    }

    const renderHeaderRows = (tableData: TableData) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData => periodicData.announcedDate.toLocaleDateString());
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