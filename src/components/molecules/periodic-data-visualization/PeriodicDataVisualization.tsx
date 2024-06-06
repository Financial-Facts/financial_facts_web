import './PeriodicDataVisualization.scss';
import { useMemo, useState } from "react";
import { PeriodicData } from "../../../types/discount.typings";
import PeriodicDataChart from "../../atoms/periodic-data-chart/PeriodicDataChart";
import { TableData } from "../../atoms/periodic-data-chart/PeriodicDataChart.typings";
import PeriodicDataTable from "../../atoms/periodic-data-table/PeriodicDataTable";
import SearchFormToggle from "../../atoms/search-form-toggle/SearchFormToggle";
import { SPAN } from "../../organisms/facts-display-section/FactsDisplaySection";
import { UnitData, UnitPeriod } from "../../../services/facts/facts.typings";
import { cleanKey } from '../../../utilities';

export interface PeriodicDataVisualizationProps {
    cik: string,
    periodicDataMap: Record<string, PeriodicData[] | UnitData>
}

function PeriodicDataVisualization({
    cik,
    periodicDataMap
}: PeriodicDataVisualizationProps ) {

    const [ span, setSpan ] = useState<SPAN>('ALL');
    const periodicDataKeys = useMemo(() => Object.keys(periodicDataMap), [periodicDataMap]);

    const buildPeriodicData = (cik: string, periods: UnitPeriod[]): PeriodicData[] => {
        return periods ?
            periods.reduce<PeriodicData[]>((acc, period) => {
                if (!acc.some(val => val.announcedDate.valueOf() === period.end.valueOf())) {
                    acc.push({
                        cik: cik,
                        announcedDate: new Date(period.end),
                        period: period.fp,
                        value: period.val
                    })
                }
                return acc;
            }, []) : []
    }

    const buildUnitsToDataMap = (cik: string, units: Record<string, UnitPeriod[]>): Record<string, PeriodicData[]> => {
        return Object.keys(units).reduce<Record<string, PeriodicData[]>>((acc, key) => {
            const periods = units[key];
            if (periods.length > 0) {
                acc[key] = buildPeriodicData(cik, periods);
            }
            return acc;
        }, {});
    }

    const buildTableData = (cik: string, item: UnitData): TableData[] => {
        const unitMap = buildUnitsToDataMap(cik, item.units);
        return Object.keys(unitMap).map((unit, index) => ({
            index: index,
            label: `${item.label} (${unit})`,
            periodicData: unitMap[unit]
        }));
    }

    const buildVisualizations = (tableDataList: TableData[]) =>
        <div className='visualizations-container'>
            {
                tableDataList.map(tableData =>
                    <PeriodicDataTable
                        key={`${tableData.label}-table`}
                        tableData={ tableData }
                        span={span}/>)
            }
            <PeriodicDataChart tableDataList={ tableDataList } span={span}/>
        </div>

    const renderPeriodicData = () => {
        const unitMap = Object.values(periodicDataMap).find(dataset => !!dataset && 'units' in dataset) as UnitData;
        if (!!unitMap) {
            return buildVisualizations(buildTableData(cik, unitMap))
        } else {
            return buildVisualizations(periodicDataKeys.reduce<TableData[]>((acc, key) => {
                if (key in periodicDataMap) {
                    acc.push({
                        label: cleanKey(key),
                        periodicData: periodicDataMap[key] as PeriodicData[],
                        index: 0
                    });
                }
                return acc;
            }, []));
        }
    }
    
    return (
        <div className='periodic-data-container'>
            <SearchFormToggle <SPAN>
                name={`${periodicDataKeys}-SpanToggle`}
                label={''}
                defaultId={'All'}
                options={[{
                    id: 'All',
                    input: 'ALL'
                }, {
                    id: '3 years',
                    input: 'T3Y'
                }, {
                    id: '5 years',
                    input: 'TFY'
                }, {
                    id: '10 years',
                    input: 'TTY'
                }]} 
                setter={setSpan}
            />
            {
                renderPeriodicData()
            }
        </div>)
  }
  
  export default PeriodicDataVisualization;