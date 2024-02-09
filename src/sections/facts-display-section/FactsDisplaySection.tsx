import { useEffect, useState } from 'react';
import './FactsDisplaySection.scss'
import FactsService from '../../services/facts/facts.service';
import { Facts, Taxonomy, UnitPeriod } from '../../services/facts/facts.typings';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import FactsDisplay from '../../components/FactsDisplay/FactsDisplay';
import { CONSTANTS } from '../../components/constants';
import { PeriodicData } from '../../services/discount/discount.typings';
import { TableData } from '../../components/periodic-data-chart/PeriodicDataChart.typings';
import PeriodicDataChart from '../../components/periodic-data-chart/PeriodicDataChart';
import PeriodicDataTable from '../../components/periodic-data-table/PeriodicDataTable';
import SearchFormToggle from '../../components/search-form-toggle/SearchFormToggle';

export type SPAN = 'ALL' | 'TTM' | 'TFY' | 'TTY';

function FactsDisplaySection({ cik }: { cik: string | undefined }) {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ facts, setFacts ] = useState(undefined as Facts | undefined);
    const [ taxonomy, setTaxonomy ] = useState(CONSTANTS.EMPTY as Taxonomy);
    const [ selectedKey, setKey ] = useState(CONSTANTS.EMPTY);
    const [ span, setSpan ] = useState('ALL' as SPAN);

    useEffect(() => {
        if (cik) {
            setTaxonomy(CONSTANTS.EMPTY as Taxonomy);
            setIsLoading(true);
            const subscription = FactsService.getFacts(cik).subscribe(facts => {
                setFacts(facts);
            });
            return () => {
                subscription.unsubscribe();
            }
        }
    }, [ cik ]);

    useEffect(() => {
        if (facts) {
            setIsLoading(false);
        }
    }, [ facts ]);

    useEffect(() => {
        setKey(CONSTANTS.EMPTY);
    }, [ taxonomy ]);

    const getTaxonomyKeys = (): Taxonomy[] => {
        if (facts) {
            const reports = facts.data.taxonomyReports;
            return Object.keys(reports).reduce((acc, key) => {
                const taxonomy = key as Taxonomy;
                if (reports[taxonomy] && Object.keys(reports[taxonomy]).length > 0) {
                    acc.push(taxonomy);
                }
                return acc;
            }, [] as Taxonomy[]);
        }
        return [];
    }

    const renderUnitDataElements = () => {
        if (facts && taxonomy) {
            const taxonomyData = facts.data.taxonomyReports[taxonomy];
            if (taxonomyData) {
                return <FactsDisplay <string>
                    keys={Object.keys(taxonomyData)}
                    setter={setKey}
                    selectedKey={selectedKey}
                    orientation='vertical'
                    scrollable={true}/>
            }
        }
        return [];
    }

    const buildUnitsToDataMap = (units: Record<string, UnitPeriod[]>): Record<string, PeriodicData[]> => {
        return Object.keys(units).reduce((acc, key) => {
            const periods = units[key];
            if (periods.length > 0) {
                acc[key] = buildPeriodicData(periods);
            }
            return acc;
        }, {} as Record<string, PeriodicData[]>);
    }

    const buildPeriodicData = (periods: UnitPeriod[]): PeriodicData[] => {
        if (cik) {
            return periods ?
                periods.reduce((acc, period) => {
                    if (!acc.some(val => val.announcedDate.valueOf() === period.end.valueOf())) {
                        acc.push({
                            cik: cik,
                            announcedDate: period.end,
                            period: period.fp,
                            value: period.val
                        })
                    }
                    return acc;
                }, [] as PeriodicData[]) : []
        }
        return [];
    }

    const buildTableData = (): TableData[] => {
        if (facts && taxonomy && selectedKey) {
            const taxonomyReport = facts.data.taxonomyReports[taxonomy];
            const item = taxonomyReport ? taxonomyReport[selectedKey] : undefined;
            if (item) {
                const unitMap = buildUnitsToDataMap(item?.units);
                return Object.keys(unitMap).map(unit => ({
                    label: `${item.label} (${unit})`,
                    periodicData: unitMap[unit]
                }));
            }
        }
        return [];
    }

    return (
        <>
            {
                isLoading ? 
                <LoadingSpinner size='LARGE' color='PURPLE'/> :
                <section className='facts-display-section'>
                    <div className='facts-wrapper'>
                        <span className='divider-text'>Taxonomy</span>
                        <FactsDisplay <Taxonomy> keys={getTaxonomyKeys()}
                            setter={setTaxonomy}
                            selectedKey={taxonomy}
                            orientation='vertical'/>
                        {
                            taxonomy ? <>
                                <span className='divider-text'>Data</span>
                                <div className='data-selection-box'>
                                    { renderUnitDataElements() }
                                </div>
                            </> : undefined
                        }
                    </div>
                    <div className='chart-wrapper'>
                        {
                            facts && taxonomy && selectedKey ? 
                                <>
                                    <SearchFormToggle <SPAN>
                                        name={'SpanToggle'}
                                        label={''}
                                        defaultId={'All'}
                                        options={[{
                                            id: 'All',
                                            input: 'ALL'
                                        }, {
                                            id: '1 year',
                                            input: 'TTM'
                                        }, {
                                            id: '5 years',
                                            input: 'TFY'
                                        }, {
                                            id: '10 years',
                                            input: 'TTY'
                                        }]} 
                                        setter={setSpan}/>
                                    <PeriodicDataTable tableDataList={ buildTableData() } span={span}/>
                                    <PeriodicDataChart tableData={ buildTableData() } span={span}/>
                                </> :
                                undefined
                        }
                    </div>
                </section>
            }
        </>
    )
  }
  
  export default FactsDisplaySection;