import { SPAN } from '../../sections/facts-display-section/FactsDisplaySection';
import { filterBySpan } from '../../utilities';
import { TableData } from '../periodic-data-chart/PeriodicDataChart.typings';
import './PeriodicDataTable.scss';


function PeriodicDataTable({ tableData, span }: { tableData: TableData, span: SPAN }) {

    const renderDataRows = (tableData: TableData) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData => periodicData.value);
        let key = 0;
        return <tbody key={`table-${tableData.index}-body`}>
            <tr>
                { columns.map(col => <td key={`col-${key++}`}> { col } </td>)}
            </tr>
        </tbody>
    }

    const renderHeaderRows = (tableData: TableData) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData => periodicData.announcedDate);
        let key = 0;
        return <thead key={`table-${tableData.index}-header`}>
            <tr>
                { columns.map(col => <th key={`col-${key++}`}> { col.toString() } </th>)}
            </tr>
        </thead>
    }

    const renderTables = () => 
        (<div className='table-wrapper'>
            <div className='table-title'> {tableData.label} </div>
            <table className='periodic-data-table'>
                { renderHeaderRows(tableData) }
                { renderDataRows(tableData) }
            </table>
        </div>)

    return renderTables()

}
  
export default PeriodicDataTable;