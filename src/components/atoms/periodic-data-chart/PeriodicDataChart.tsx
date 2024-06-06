import { ChartDataset } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SPAN } from '../../organisms/facts-display-section/FactsDisplaySection';
import './PeriodicDataChart.scss';
import { TableData } from './PeriodicDataChart.typings';
import { normalizeYearOverYear } from './PeriodicDataChart.utils';
import { PeriodicData } from '../../../types/discount.typings';
import { filterBySpan } from '../../../utilities';

export interface PeriodicDataChartProps {
    tableDataList: TableData[],
    span: SPAN,
    normalize?: boolean
}

const indexColorMap: Record<number, string> = {
    0: '#8C19D3',
    1: '#228B22'
}

function PeriodicDataChart({ tableDataList, normalize, span }: PeriodicDataChartProps) {

    const collectLabels = () => tableDataList.reduce<Set<string>>((acc, tableData) => {
        filterBySpan(tableData.periodicData, span).forEach(period => acc.add(new Date(period.announcedDate).toLocaleDateString()));
        return acc;
    }, new Set<string>())

    const buildDataSet = (
        index: number,
        label: string,
        periodicData: PeriodicData[]
    ): ChartDataset<"line", any> => ({
        label: label,
        data: normalize ?
            normalizeYearOverYear(periodicData.map(periodData => periodData.value)) :
            periodicData.map(periodData => ({
                x: new Date(periodData.announcedDate).toLocaleDateString(),
                y: periodData.value
            })),
        borderWidth: 1,
        borderColor: indexColorMap[index],
        backgroundColor: indexColorMap[index]
    });

    return <Line data={{
        labels: Array.from(collectLabels()),
        datasets: tableDataList.map((tableData, index) =>
            buildDataSet(index, tableData.label, filterBySpan(tableData.periodicData, span)))
    }}/>
}
  
export default PeriodicDataChart;