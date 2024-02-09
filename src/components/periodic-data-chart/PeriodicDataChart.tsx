import './PeriodicDataChart.scss';
import { Line } from 'react-chartjs-2';
import { PeriodicData } from '../../services/discount/discount.typings';
import { ChartDataset } from 'chart.js';
import { TableData } from './PeriodicDataChart.typings';
import { normalizeYearOverYear, generateColor } from './PeriodicDataChart.utils';
import { filterBySpan } from '../../utilities';
import { SPAN } from '../../sections/facts-display-section/FactsDisplaySection';


function PeriodicDataChart({ tableData, normalize, span }: {
    tableData: TableData[],
    span: SPAN,
    normalize?: boolean
}) {

    const buildDataSet = (label: string, periodicData: PeriodicData[]): ChartDataset<"line", any> => ({
      label: label,
      data: normalize ?
          normalizeYearOverYear(periodicData.map(periodData => periodData.value)) :
          periodicData.map(periodData => periodData.value),
      borderWidth: 1,
      borderColor: generateColor(),
      backgroundColor: generateColor()
    });

    const renderTable = () => {
        if (tableData.length > 0) {
            const labels = filterBySpan(tableData[0].periodicData, span).map(periodData => periodData.announcedDate);
            return <Line data={{
              labels: labels,
              datasets: tableData.map(data => buildDataSet(data.label, filterBySpan(data.periodicData, span)))
            }}/>
        }
    }

    return renderTable();
}
  
export default PeriodicDataChart;