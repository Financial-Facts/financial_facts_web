import './PeriodicDataVisualization.scss';
import { useState } from "react";
import { BenchmarkRatioPriceInput, DiscountedCashFlowInput, PeriodicData, StickerPriceInput } from "../../../types/discount.typings";
import PeriodicDataChart from "../../atoms/periodic-data-chart/PeriodicDataChart";
import { TableData } from "../../atoms/periodic-data-chart/PeriodicDataChart.typings";
import PeriodicDataTable from "../../atoms/periodic-data-table/PeriodicDataTable";
import SearchFormToggle from "../../atoms/search-form-toggle/SearchFormToggle";
import { SPAN } from "../../organisms/facts-display-section/FactsDisplaySection";
import { UnitData, UnitPeriod } from "../../../services/facts/facts.typings";
import { cleanKey } from '../../../utilities';

export interface PeriodicDataVisualizationProps {
    cik: string,
    periodicDataKey: string,
    data: StickerPriceInput | DiscountedCashFlowInput | BenchmarkRatioPriceInput | Record<string, UnitData>
}

function PeriodicDataVisualization({
    cik,
    data,
    periodicDataKey
}: PeriodicDataVisualizationProps ) {

    const [ span, setSpan ] = useState<SPAN>('ALL');

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

    const buildVisualizations = (tableData: TableData[]) =>
        tableData.map((data, index) =>
            <div key={`${cik}-facts-visualization-${index}`} className='visualizations-container'>
                <PeriodicDataTable tableData={ data } span={span}/>
                <PeriodicDataChart tableData={ data } span={span}/>
            </div>);

    const renderPeriodicData = () => {
        const valuationInput: Record<string, PeriodicData[] | any> = data;
        if (periodicDataKey in valuationInput) {
            if ('units' in valuationInput[periodicDataKey]) {
                return buildVisualizations(buildTableData(cik, valuationInput[periodicDataKey]))
            } else {
                return buildVisualizations([{
                    label: cleanKey(periodicDataKey),
                    periodicData: valuationInput[periodicDataKey],
                    index: 0
                }]);
            }
        }
    }
    
    return (
        <div className='periodic-data-container'>
            <SearchFormToggle <SPAN>
                name={`${periodicDataKey}-SpanToggle`}
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