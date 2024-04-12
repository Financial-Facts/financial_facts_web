import './PeriodicDataChart.scss';
import { Line } from 'react-chartjs-2';
import { ChartDataset } from 'chart.js';
import { TableData } from './PeriodicDataChart.typings';
import { normalizeYearOverYear } from './PeriodicDataChart.utils';
import { filterBySpan } from '../../utilities';
import { SPAN } from '../../organisms/facts-display-section/FactsDisplaySection';
import { PeriodicData } from '../../types/discount.typings';

export interface PeriodicDataChartProps {
    tableData: TableData,
    span: SPAN,
    normalize?: boolean
}

function PeriodicDataChart({ tableData, normalize, span }: PeriodicDataChartProps) {

    const buildDataSet = (label: string, periodicData: PeriodicData[]): ChartDataset<"line", any> => ({
        label: label,
        data: normalize ?
            normalizeYearOverYear(periodicData.map(periodData => periodData.value)) :
            periodicData.map(periodData => periodData.value),
        borderWidth: 1,
        borderColor: 'rgb(140, 25, 211)',
        backgroundColor: 'rgb(247, 238, 253)'
    });

    const renderTable = () => {
        const labels = filterBySpan(tableData.periodicData, span).map(periodData => periodData.announcedDate.toLocaleDateString());
        return <Line data={{
            labels: labels,
            datasets: [buildDataSet(tableData.label, filterBySpan(tableData.periodicData, span))]
        }}/>
    }

    return renderTable();
}
  
export default PeriodicDataChart;