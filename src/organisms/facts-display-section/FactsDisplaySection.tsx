import { useEffect, useState } from 'react';
import './FactsDisplaySection.scss'
import { Taxonomy } from '../../services/facts/facts.typings';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import { CONSTANTS } from '../../constants/constants';
import PeriodicDataChart from '../../atoms/periodic-data-chart/PeriodicDataChart';
import PeriodicDataTable from '../../atoms/periodic-data-table/PeriodicDataTable';
import SearchFormToggle from '../../atoms/search-form-toggle/SearchFormToggle';
import { buildTableData, cleanKey, initRef } from '../../utilities';
import ZeroState from '../../atoms/zero-state/ZeroState';
import ResizeObserverService from '../../services/resize-observer-service/resize-observer.service';
import fetchFacts from '../../hooks/fetchFacts';
import ButtonOptionSideNav from '../../molecules/button-option-side-nav/ButtonOptionSideNav';

export interface FactsDisplaySectionProps {
    cik: string

}
export type SPAN = 'ALL' | 'TTM' | 'T3Y' | 'TFY' | 'TTY';

function FactsDisplaySection({ cik }: FactsDisplaySectionProps) {

    const [ taxonomy, setTaxonomy ] = useState<Taxonomy | undefined>(undefined);
    const [ selectedDataKey, setDataKey ] = useState(CONSTANTS.EMPTY);
    const [ span, setSpan ] = useState<SPAN>('ALL');
    const [ chartWrapperRef, setChartWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ factsWrapperRef, setFactsWrapperRef ] = useState<HTMLDivElement | null>(null);
    const { facts, loading, error, notFound } = fetchFacts(cik);

    useEffect(() => {
        setDataKey(CONSTANTS.EMPTY);
    }, [ taxonomy ]);

    useEffect(() => {
        if (chartWrapperRef && factsWrapperRef) {
            const observerId = ResizeObserverService.matchHeight(chartWrapperRef, factsWrapperRef);
            return (() => {
                ResizeObserverService.disconnectObserver(observerId);
            });
        }
    }, [ chartWrapperRef ]);

    const getTaxonomyKeys = (): Taxonomy[] => {
        if (facts) {
            const reports = facts.facts;
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
            const taxonomyReport = facts.facts[taxonomy];
            const item = taxonomyReport ? taxonomyReport[selectedDataKey] : undefined;
            if (!!item && !item.label) {
                item.label = cleanKey(selectedDataKey);
            }
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
        <section className={`facts-display-section
            ${loading || error ? 'text-container-height' : CONSTANTS.EMPTY}`}>
            {
                loading ? <LoadingSpinner size='LARGE' color='PURPLE'/> :
                error ? <ZeroState message={'Error'}
                    supportText={`${ notFound ?
                        `Facts for ${cik} not found` :
                        'Failed to collect financial facts'}`}/> :
                    <>
                        {
                            facts ? 
                                <ButtonOptionSideNav buttonOptionSideNavConfig={[{
                                        label: 'Taxonomy',
                                        keys: getTaxonomyKeys(),
                                        selectedKey: taxonomy,
                                        selectedKeySetter: setTaxonomy
                                    }, {
                                        label: 'Data',
                                        keys: facts && taxonomy && facts.facts[taxonomy] ?
                                            Object.keys(facts.facts[taxonomy]) : [],
                                        selectedKey: selectedDataKey,
                                        selectedKeySetter: setDataKey,
                                        includeSearch: true,
                                        isScrollable: true
                                    }]} refSetter={setFactsWrapperRef}/> :
                                undefined
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
                                renderZeroState()
                        }
                    </>
            }
        </section>
    )
  }
  
  export default FactsDisplaySection;