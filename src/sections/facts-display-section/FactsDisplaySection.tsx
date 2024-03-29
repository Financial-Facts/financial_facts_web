import { useEffect, useState } from 'react';
import './FactsDisplaySection.scss'
import FactsService from '../../services/facts/facts.service';
import { Facts, Taxonomy } from '../../services/facts/facts.typings';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { CONSTANTS } from '../../components/constants';
import PeriodicDataChart from '../../components/periodic-data-chart/PeriodicDataChart';
import PeriodicDataTable from '../../components/periodic-data-table/PeriodicDataTable';
import SearchFormToggle from '../../components/search-form-toggle/SearchFormToggle';
import { buildTableData, initRef } from '../../utilities';
import ZeroState from '../../components/zero-state/ZeroState';
import ButtonOptionList from '../../components/ButtonOptionList/ButtonOptionList';
import ResizeObserverService from '../../services/resize-observer-service/resize-observer.service';

export interface FactsDisplaySectionProps {
    cik: string

}
export type SPAN = 'ALL' | 'TTM' | 'TFY' | 'TTY';

function FactsDisplaySection({ cik }: FactsDisplaySectionProps) {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ facts, setFacts ] = useState<Facts | null>(null);
    const [ taxonomy, setTaxonomy ] = useState<Taxonomy | undefined>(undefined);
    const [ selectedDataKey, setDataKey ] = useState(CONSTANTS.EMPTY);
    const [ span, setSpan ] = useState<SPAN>('ALL');
    const [ chartWrapperRef, setChartWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ factsWrapperRef, setFactsWrapperRef ] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        setTaxonomy(undefined);
        const subscription = FactsService.getFacts(cik).subscribe(facts => {
            setFacts(facts);
            setIsLoading(false);
        });
        return () => {
            subscription.unsubscribe();
        }
    }, [ cik ]);

    useEffect(() => {
        setDataKey(CONSTANTS.EMPTY);
    }, [ taxonomy ]);

    useEffect(() => {
        if (chartWrapperRef && factsWrapperRef) {
            const observerId = ResizeObserverService.matchHeight(chartWrapperRef, factsWrapperRef);
            return (() => {
                ResizeObserverService.disconnectObserver(observerId);
            })
        }
    }, [ chartWrapperRef]);

    const getTaxonomyKeys = (): Taxonomy[] => {
        if (facts) {
            const reports = facts.data.taxonomyReports;
            const taxonomies = Object.keys(reports) as Taxonomy[];
            return taxonomies.reduce<Taxonomy[]>((acc, taxonomy) => {
                if (reports[taxonomy] && Object.keys(reports[taxonomy]).length > 0) {
                    acc.push(taxonomy);
                }
                return acc;
            }, []);
        }
        return [];
    }

    const renderZeroState = () => {
        let message = CONSTANTS.EMPTY;
        let support = CONSTANTS.EMPTY;
        if (facts && taxonomy) {
            message = 'Select a Dataset';
            support = 'View historical data for selected taxonomy';
        } else {
            message = 'Select a Taxonomy';
            support = 'View information filed using a specific taxonomy';
        }
        return <ZeroState message={message} supportText={support}/>
    }

    const renderDataVisualizations = () => {
        if (facts && taxonomy && selectedDataKey) {
            const taxonomyReport = facts.data.taxonomyReports[taxonomy];
            const item = taxonomyReport ? taxonomyReport[selectedDataKey] : undefined;
            const tableData = buildTableData(cik, item);
            return tableData.map((data, index) => {
                data.index = index;
                return <div key={`${cik}-facts-visualization`} className='visualizations-container'>
                    <PeriodicDataTable tableData={ data } span={span}/>
                    <PeriodicDataChart tableData={ data } span={span}/>
                </div>
            });
        }   
    }

    return (
        <section className='facts-display-section'>
            {
                isLoading ?
                    <LoadingSpinner size='LARGE' color='PURPLE'/> :
                    <>
                        {
                            facts ? 
                                <div className={`facts-wrapper
                                    ${ !taxonomy || !selectedDataKey ? 'missing-visualizations' : CONSTANTS.EMPTY}`}
                                    ref={(ref) => initRef(ref, setFactsWrapperRef)}>
                                    <div className='taxonomy-options-wrapper'>
                                        <span className='divider-text'>Taxonomy</span>
                                        <ButtonOptionList <Taxonomy> keys={getTaxonomyKeys()}
                                            setter={setTaxonomy}
                                            selectedKey={taxonomy}
                                            orientation='vertical'/>
                                    </div>
                                    {
                                        facts && taxonomy && facts.data.taxonomyReports[taxonomy] ? <>
                                            <span className='divider-text'>Data</span>
                                            <div className='data-selection-box'>
                                                <ButtonOptionList <string>
                                                    key={taxonomy}
                                                    keys={ Object.keys(facts.data.taxonomyReports[taxonomy]) }
                                                    setter={setDataKey}
                                                    selectedKey={selectedDataKey}
                                                    orientation='vertical'
                                                    includeSearch={true}/>
                                            </div>
                                        </> : undefined
                                    }
                                </div> : undefined
                        }
                        {
                            facts && taxonomy && selectedDataKey ?
                                <div className='chart-wrapper' ref={(ref) => initRef(ref, setChartWrapperRef)}>
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
                                    {
                                        renderDataVisualizations()
                                    }
                                </div> :
                                <>
                                    { renderZeroState() }
                                </> 
                        }
                    </>
            }
        </section>
    )
  }
  
  export default FactsDisplaySection;