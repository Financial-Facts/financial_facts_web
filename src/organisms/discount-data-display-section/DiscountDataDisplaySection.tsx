import './DiscountDataDisplaySection.scss';
import { useEffect, useState } from "react";
import ButtonOptionSideNav from "../../molecules/button-option-side-nav/ButtonOptionSideNav"
import SearchFormToggle from '../../atoms/search-form-toggle/SearchFormToggle';
import { SPAN } from '../facts-display-section/FactsDisplaySection';
import PeriodicDataChart from '../../atoms/periodic-data-chart/PeriodicDataChart';
import PeriodicDataTable from '../../atoms/periodic-data-table/PeriodicDataTable';
import { TableData } from '../../atoms/periodic-data-chart/PeriodicDataChart.typings';
import { DcfPeriodicDataKeys, SpPeriodicDataKeys, Valuation } from './DiscountDataDisplaySection.typings';
import { cleanKey, initRef } from '../../utilities';
import ResizeObserverService from '../../services/resize-observer-service/resize-observer.service';
import ZeroState from '../../atoms/zero-state/ZeroState';
import { Discount, PeriodicData } from '../../types/discount.typings';

export interface DiscountDataDisplaySectionProps {
    discount: Discount
}

function DiscountDataDisplaySection({ discount }: DiscountDataDisplaySectionProps) {

    const [ valuationKey, setValuationKey ] = useState<Valuation | undefined>(undefined);
    const [ periodicDataKey, setPeriodicDataKey ] = useState<string | undefined>(undefined);
    const [ selectedSpan, setSelectedSpan ] = useState<SPAN>('ALL');
    const [ chartWrapperRef, setChartWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ optionsWrapperRef, setOptionsWrapperRef ] = useState<HTMLDivElement | null>(null);

    const sideConfigItems = [{
        label: 'Valuation',
        keys: ['stickerPrice', 'benchmarkRatioPrice', 'discountedCashFlowPrice'],
        selectedKey: valuationKey,
        selectedKeySetter: setValuationKey
    }, {
        label: 'Periodic Data',
        keys: valuationKey ? 
            Object.keys(discount[valuationKey].input).filter(key => 
                SpPeriodicDataKeys.includes(key) || DcfPeriodicDataKeys.includes(key)
            ) :
            [],
        selectedKey: periodicDataKey,
        selectedKeySetter: setPeriodicDataKey,
        isScrollable: true,
        deselectable: true
    }];

    useEffect(() => {
        if (chartWrapperRef && optionsWrapperRef) {
            const observerId = ResizeObserverService.matchHeight(chartWrapperRef, optionsWrapperRef);
            return (() => {
                ResizeObserverService.disconnectObserver(observerId);
            });
        }
    }, [ chartWrapperRef ]);

    useEffect(() => {
        setPeriodicDataKey(undefined);
    }, [ valuationKey ]);
    
    const buildVisualizations = (tableData: TableData) => 
        <div key={`${valuationKey}-visualization`} className='visualizations-container'>
            <PeriodicDataTable tableData={ tableData } span={selectedSpan}/>
            <PeriodicDataChart tableData={ tableData } span={selectedSpan}/>
        </div>

    const renderPeriodicData = () => {
        if (!!valuationKey && !!periodicDataKey) {
            const valuationInput: Record<string, PeriodicData[] | any> = discount[valuationKey].input;
            if (periodicDataKey in valuationInput) {
                return buildVisualizations({
                    label: cleanKey(periodicDataKey),
                    periodicData: valuationInput[periodicDataKey]
                });
            }
        }   
    }

    return (
        <section className="discount-data-display-section">
            <ButtonOptionSideNav buttonOptionSideNavConfig={sideConfigItems}
            refSetter={setOptionsWrapperRef}/>
            <div className='data-container'>
                {
                    valuationKey && periodicDataKey ? 
                        <div className='periodic-data-container' ref={(ref) => initRef(ref, setChartWrapperRef)}>
                            <SearchFormToggle <SPAN>
                                name={'SpanToggle'}
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
                                setter={setSelectedSpan}/>
                            {
                                renderPeriodicData()
                            }
                        </div> :
                    !valuationKey ? 
                        <ZeroState message={'Select a Valuation'} supportText={'View the calculated valuation data'}/> :
                        undefined
                }
            </div>
        </section>
    )
  }
  
  export default DiscountDataDisplaySection;