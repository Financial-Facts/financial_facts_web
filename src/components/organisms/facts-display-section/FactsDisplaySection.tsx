import { useEffect, useState } from 'react';
import LoadingSpinner from '../../atoms/loading-spinner/loading-spinner';
import ZeroState from '../../atoms/zero-state/ZeroState';
import ButtonOptionSideNav from '../../molecules/button-option-side-nav/ButtonOptionSideNav';
import './FactsDisplaySection.scss';
import { CONSTANTS } from '../../../constants/constants';
import fetchFacts from '../../../hooks/fetchFacts';
import { Facts, Taxonomy } from '../../../services/facts/facts.typings';
import ResizeObserverService from '../../../services/resize-observer-service/resize-observer.service';
import { initRef } from '../../../utilities';
import { useSelector } from 'react-redux';
import { MobileState } from '../../../store/mobile/mobile.slice';
import PeriodicDataVisualization from '../../molecules/periodic-data-visualization/PeriodicDataVisualization';
import FactsIdentity from '../../atoms/facts-identity/FactsIdentity';
import { useLocation } from 'react-router-dom';
import fetchIdentity from '../../../hooks/fetchIdentity';

export interface FactsDisplaySectionProps {
    cik: string

}
export type SPAN = 'ALL' | 'TTM' | 'T3Y' | 'TFY' | 'TTY';

function FactsDisplaySection({ cik }: FactsDisplaySectionProps) {

    const location = useLocation();
    const [ taxonomy, setTaxonomy ] = useState<Taxonomy | undefined>(undefined);
    const [ selectedDataKey, setDataKey ] = useState<string | undefined>(CONSTANTS.EMPTY);
    const [ chartWrapperRef, setChartWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ factsWrapperRef, setFactsWrapperRef ] = useState<HTMLDivElement | null>(null);
    const { facts, loading, error, notFound } = fetchFacts(cik);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const { identity } = !!location.state ? { identity: location.state } : fetchIdentity(cik);

    useEffect(() => {
        if (!mobile.mobile && chartWrapperRef && factsWrapperRef) {
            const observerId = ResizeObserverService.matchHeight(chartWrapperRef, factsWrapperRef);
            return (() => {
                ResizeObserverService.disconnectObserver(observerId);
            });
        } else if (factsWrapperRef) {
            factsWrapperRef.style.height = CONSTANTS.EMPTY;
        }
    }, [ chartWrapperRef, mobile ]);

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

    const getPeriodicDataMap = (
        facts: Facts,
        taxonomyKey: Taxonomy,
        selectedDataKey: string
    ) => {
        const taxonomyData = facts.facts[taxonomyKey];
        if (selectedDataKey in taxonomyData) {
            return {
                [selectedDataKey]: facts.facts[taxonomyKey][selectedDataKey]
            }
        }
        return {};
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
                                <ButtonOptionSideNav
                                    orientation={ mobile.mobile ? 'horizontal' : 'vertical' }
                                    refSetter={setFactsWrapperRef}
                                    buttonOptionSideNavConfig={[{
                                        label: 'Taxonomy',
                                        keys: getTaxonomyKeys(),
                                        selectedKey: taxonomy,
                                        selectedKeySetter: (taxonomy) => {
                                            setDataKey(CONSTANTS.EMPTY);
                                            setTaxonomy(taxonomy);
                                        },
                                        isFoldable: true
                                    }, {
                                        label: 'Data',
                                        keys: facts && taxonomy && facts.facts[taxonomy] ?
                                            Object.keys(facts.facts[taxonomy]) : [],
                                        selectedKey: selectedDataKey,
                                        selectedKeySetter: setDataKey,
                                        includeSearch: true,
                                        isScrollable: true
                                    }]}/> :
                                undefined
                        }
                        <div className='main-content' ref={(ref) => initRef(ref, setChartWrapperRef)}>
                            { 
                                identity &&
                                    <FactsIdentity identity={identity}/>
                            }
                            {
                                facts && taxonomy && selectedDataKey ?
                                    <div className='chart-wrapper'>
                                        <PeriodicDataVisualization
                                            cik={cik}
                                            periodicDataMap={getPeriodicDataMap(facts, taxonomy, selectedDataKey)}/>
                                    </div> :
                                    renderZeroState()
                            }
                        </div>
                    </>
            }
        </section>
    )
  }
  
  export default FactsDisplaySection;