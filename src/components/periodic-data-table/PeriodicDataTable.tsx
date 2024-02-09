import { SPAN } from '../../sections/facts-display-section/FactsDisplaySection';
import { filterBySpan } from '../../utilities';
import { TableData } from '../periodic-data-chart/PeriodicDataChart.typings';
import './PeriodicDataTable.scss';


function PeriodicDataTable({ tableDataList, span }: { tableDataList: TableData[], span: SPAN }) {

    const renderDataRows = (tableData: TableData, tableNumber: number) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData => periodicData.value);
        let key = 0;
        return <tbody>
            <tr>
                { columns.map(col => <td key={`tableNumber-${tableNumber}-col-${key++}`}> { col ? col.toString() : '' } </td>)}
            </tr>
        </tbody>
    }

    const renderHeaderRows = (tableData: TableData, tableNumber: number) => {
        const columns = filterBySpan(tableData.periodicData, span).map(periodicData => periodicData.announcedDate);
        let key = 0;
        return <thead>
            <tr>
                { columns.map(col => <th key={`table-${tableNumber}-col-${key++}`}> { col.toString() } </th>)}
            </tr>
        </thead>
    }

    const renderTables = () => tableDataList.map((tableData, index) =>
        <div className='table-wrapper' key={tableData.label}>
            <div className='table-title'> {tableData.label} </div>
            <table key={`table-${index}`} className='periodic-data-table'>
                { renderHeaderRows(tableData, index) }
                { renderDataRows(tableData, index) }
            </table>
        </div>
    );

    return renderTables()

}
  
export default PeriodicDataTable;