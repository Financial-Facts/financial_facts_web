import './PeriodicDataTable.scss';
import { Line } from 'react-chartjs-2';
import { PeriodicData } from '../../services/discount/discount.typings';
import { ChartDataset } from 'chart.js';
import { TableData } from './PeriodicDataTable.typings';
import { normalizeYearOverYear, generateColor } from './PeriodicDataTable.utils';


function PeriodicDataTable({ tableData }: { tableData: TableData[] }) {

    const buildDataSet = (label: string, periodicData: PeriodicData[]): ChartDataset<"line", any> => ({
      label: label,
      data: normalizeYearOverYear(periodicData.map(periodData => periodData.value)),
      borderWidth: 1,
      borderColor: generateColor(),
      backgroundColor: generateColor()
    });

    const renderTable = () => {
        if (tableData.length > 0) {
            const labels = tableData[0].periodicData.map(periodData => periodData.announcedDate).slice(1);
            return <Line data={{
              labels: labels,
              datasets: tableData.map(data => buildDataSet(data.label, data.periodicData))
            }}/>
        }
    }

    return renderTable();
}
  
export default PeriodicDataTable;