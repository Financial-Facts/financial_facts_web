import { useEffect, useMemo, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import fetchIdentity from '../../../hooks/fetchIdentity';

export interface FactsDisplaySectionProps {
    cik: string
    taxonomy: Taxonomy | undefined,
    selectedDataKey: string | undefined
}

export type SPAN = 'ALL' | 'TTM' | 'T3Y' | 'TFY' | 'TTY';

function FactsDisplaySection({ cik, taxonomy, selectedDataKey }: FactsDisplaySectionProps) {

    const navigate = useNavigate();
    const [ chartWrapperRef, setChartWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ factsWrapperRef, setFactsWrapperRef ] = useState<HTMLDivElement | null>(null);
    const { facts, loading, error, notFound } = fetchFacts(cik);
    const { identity, loadingIdentity, identityError } = fetchIdentity(cik);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);

    const isLoading = useMemo(() => loading || loadingIdentity, [ loading, loadingIdentity ]);
    const isError = useMemo(() => identityError || error, [ identityError, error]);
    
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
        if (facts && taxonomy && taxonomy in facts.facts) {
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


    const buildUri = (
        taxonomy: Taxonomy | undefined,
        dataKey: string | undefined
    ): string => {
        if (taxonomy && dataKey) {
            return `/facts/${cik}/${encodeURIComponent(taxonomy)}/${encodeURIComponent(dataKey)}`;
        }
        if (taxonomy) {
            return `/facts/${cik}/${encodeURIComponent(taxonomy)}`;
        }
        return `/facts/${cik}`;
    }

    return (
        <section className={`facts-display-section
            ${(isLoading || isError) ? 'text-container-height' : CONSTANTS.EMPTY}`}>
            {
                isLoading ? <LoadingSpinner size='LARGE' color='PURPLE' minHeight={750}/> :
                isError ? <ZeroState message={'Error'}
                    supportText={`${ notFound ?
                        `Facts for ${cik} not found` :
                        'Failed to collect financial facts'}`}/> :
                    <>
                        { 
                            mobile.mobile && <FactsIdentity identity={identity}/>
                        }
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
                                            navigate(buildUri(taxonomy, undefined));
                                        },
                                        isFoldable: true
                                    }, {
                                        label: 'Data',
                                        keys: facts && taxonomy && facts.facts[taxonomy] ?
                                            Object.keys(facts.facts[taxonomy]) : [],
                                        selectedKey: selectedDataKey,
                                        selectedKeySetter: (dataKey) => {
                                            navigate(buildUri(taxonomy, dataKey))
                                        },
                                        includeSearch: true,
                                        isScrollable: true
                                    }]}/> :
                                undefined
                        }
                        <div className='main-content' ref={(ref) => initRef(ref, setChartWrapperRef)}>
                            { 
                                !mobile.mobile && <FactsIdentity identity={identity}/>
                            }
                            {
                                facts && taxonomy && selectedDataKey && selectedDataKey in facts.facts[taxonomy] ?
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