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
import ExpandableSearch from '../../components/expandable-search/expandable-search';
import { Subject } from 'rxjs/internal/Subject';
import { ClosurePayload } from '../../components/sticky-menu/StickyMenu';
import ButtonOptionList from '../../components/ButtonOptionList/ButtonOptionList';
import ResizeObserverService from '../../services/resize-observer-service/resize-observer.service';

export type SPAN = 'ALL' | 'TTM' | 'TFY' | 'TTY';

function FactsDisplaySection({ cik }: { cik: string | undefined }) {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ facts, setFacts ] = useState(undefined as Facts | undefined);
    const [ taxonomy, setTaxonomy ] = useState(CONSTANTS.EMPTY as Taxonomy);
    const [ selectedDataKey, setDataKey ] = useState(CONSTANTS.EMPTY);
    const [ span, setSpan ] = useState('ALL' as SPAN);
    const [ chartWrapperRef, setChartWrapperRef ] = useState(null as HTMLDivElement | null);
    const [ factsWrapperRef, setFactsWrapperRef ] = useState(null as HTMLDivElement | null);

    useEffect(() => {
        if (cik) {
            setTaxonomy(CONSTANTS.EMPTY as Taxonomy);
            const subscription = FactsService.getFacts(cik).subscribe(facts => {
                setFacts(facts);
                setIsLoading(false);
            });
            return () => {
                subscription.unsubscribe();
            }
        } else {
            setDataKey(CONSTANTS.EMPTY);
            setIsLoading(false);
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
        if (cik && facts && taxonomy && selectedDataKey) {
            const taxonomyReport = facts.data.taxonomyReports[taxonomy];
            const item = taxonomyReport ? taxonomyReport[selectedDataKey] : undefined;
            const tableData = buildTableData(cik, item);
            return tableData.map((data, index) => {
                data.index = index;
                return <div key={`visualizations-${index}`} className='visualizations-container'>
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
                            facts ?
                                <>
                                    { renderZeroState() }
                                </> :
                                <div className='company-search-wrapper'>
                                    <div className='divider-text'>Search for Public Entities</div>
                                    <div className='search-wrapper'>
                                        <ExpandableSearch $closeDropdowns={new Subject<ClosurePayload[]>()} isStandalone={true}/>                                
                                    </div>
                                </div>
                        }
                    </>
            }
        </section>
    )
  }
  
  export default FactsDisplaySection;