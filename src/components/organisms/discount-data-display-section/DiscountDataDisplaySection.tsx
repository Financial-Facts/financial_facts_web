import { useEffect, useState } from "react";
import ZeroState from '../../atoms/zero-state/ZeroState';
import ButtonOptionSideNav from "../../molecules/button-option-side-nav/ButtonOptionSideNav";
import './DiscountDataDisplaySection.scss';
import { DcfPeriodicDataKeys, SpPeriodicDataKeys, Valuation } from './DiscountDataDisplaySection.typings';
import ResizeObserverService from "../../../services/resize-observer-service/resize-observer.service";
import { Discount } from "../../../types/discount.typings";
import { initRef } from "../../../utilities";
import { useSelector } from "react-redux";
import DiscountSingularData from "../../atoms/discount-singular-data/discount-singular-data";
import { MobileState } from "../../../store/mobile/mobile.slice";
import { CONSTANTS } from "../../../constants/constants";
import PeriodicDataVisualization from "../../molecules/periodic-data-visualization/PeriodicDataVisualization";
import ValuationPrice from "../../atoms/valuation-price/ValuationPrice";
import ArrowKeyNavigator from "../../molecules/arrow-key-navigator/ArrowKeyNavigator";

export interface DiscountDataDisplaySectionProps {
    discount: Discount
}

function DiscountDataDisplaySection({ discount }: DiscountDataDisplaySectionProps) {

    const [ valuationKey, setValuationKey ] = useState<Valuation | undefined>(undefined);
    const [ periodicDataKey, setPeriodicDataKey ] = useState<string | undefined>(undefined);
    const [ chartWrapperRef, setChartWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ optionsWrapperRef, setOptionsWrapperRef ] = useState<HTMLDivElement | null>(null);
    const [ keyOptions, setKeyOptions ] = useState<string[]>([]);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const allSideConfigItems = [{
        label: 'Valuation',
        keys: ['stickerPrice', 'benchmarkRatioPrice', 'discountedCashFlowPrice'],
        selectedKey: valuationKey,
        selectedKeySetter: setValuationKey
    }, {
        label: 'Periodic Data',
        keys: keyOptions,
        selectedKey: periodicDataKey,
        selectedKeySetter: setPeriodicDataKey,
        isScrollable: true,
        deselectable: true
    }];
    const [ sideConfigItems, setSideConfigItems ] = useState<any[]>(allSideConfigItems);

    const valuationHasPeriodicData = () => keyOptions.length > 0;

    useEffect(() => {
        setPeriodicDataKey(undefined);
        
        if (valuationKey) {
            setKeyOptions(Object
                .keys(discount[valuationKey].input)
                .filter(key => 
                    SpPeriodicDataKeys.includes(key) || DcfPeriodicDataKeys.includes(key)
                ));
        } else {
            setKeyOptions([]);
        }
    }, [ valuationKey ]);

    useEffect(() => {
        setSideConfigItems(mobile.mobile ? allSideConfigItems.slice(0, 1) : [...allSideConfigItems]);
    }, [ mobile, valuationKey, periodicDataKey, keyOptions ]);

    useEffect(() => {
        if (!mobile.mobile && chartWrapperRef && optionsWrapperRef) {
            const observerId = ResizeObserverService.matchHeight(chartWrapperRef, optionsWrapperRef);
            return (() => {
                ResizeObserverService.disconnectObserver(observerId);
            });
        } else if (optionsWrapperRef) {
            optionsWrapperRef.style.height = CONSTANTS.EMPTY;
        }
    }, [ chartWrapperRef, mobile ]);

    return (
        <section className="discount-data-display-section">
            <ButtonOptionSideNav
                buttonOptionSideNavConfig={sideConfigItems}
                orientation={mobile.mobile ? 'horizontal' : 'vertical'}
                refSetter={setOptionsWrapperRef}/>
            <div className='data-container'  ref={(ref) => initRef(ref, setChartWrapperRef)}>
                { 
                    valuationKey ?
                        <>
                            <ValuationPrice price={discount[valuationKey].price} lastUpdated={new Date(discount.lastUpdated)}/>
                            <DiscountSingularData valuation={discount[valuationKey]}/>
                        </> :
                        <ZeroState message={'Select a Valuation'} supportText={'View the calculated valuation data'}/>
                }
                {   
                    !mobile.mobile ? 
                        valuationKey && !periodicDataKey && valuationHasPeriodicData() &&
                            <ZeroState message='Select periodic data' supportText="Select option to see time series data"/> 
                        : valuationKey && valuationHasPeriodicData() &&
                            <div className="periodic-data-arrow-nav">
                                <ArrowKeyNavigator keySetter={setPeriodicDataKey} keyOptions={keyOptions}/>
                            </div>
                }
                {
                    valuationKey && periodicDataKey &&
                        <PeriodicDataVisualization cik={discount.cik} periodicDataKey={periodicDataKey} data={discount[valuationKey].input}/>
                }
            </div>
        </section>
    )
  }
  
  export default DiscountDataDisplaySection;