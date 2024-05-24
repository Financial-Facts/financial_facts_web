import { useEffect, useMemo, useState } from "react";
import ZeroState from '../../atoms/zero-state/ZeroState';
import ButtonOptionSideNav from "../../molecules/button-option-side-nav/ButtonOptionSideNav";
import './DiscountDataDisplaySection.scss';
import { DcfPeriodicDataKeys, SpPeriodicDataKeys, Valuation } from './DiscountDataDisplaySection.typings';
import { Discount } from "../../../types/discount.typings";
import { useSelector } from "react-redux";
import DiscountSingularData from "../../atoms/discount-singular-data/discount-singular-data";
import { MobileState } from "../../../store/mobile/mobile.slice";
import PeriodicDataVisualization from "../../molecules/periodic-data-visualization/PeriodicDataVisualization";
import ValuationPrice from "../../atoms/valuation-price/ValuationPrice";
import ArrowKeyNavigator from "../../molecules/arrow-key-navigator/ArrowKeyNavigator";
import LoadingSpinner from "../../atoms/loading-spinner/loading-spinner";

export interface DiscountDataDisplaySectionProps {
    discount: Discount | null,
    loading: boolean,
    error: boolean
}

function DiscountDataDisplaySection({ discount, loading, error }: DiscountDataDisplaySectionProps) {

    const [ valuationKey, setValuationKey ] = useState<Valuation | undefined>(undefined);
    const [ periodicDataKey, setPeriodicDataKey ] = useState<string | undefined>(undefined);
    const [ keyOptions, setKeyOptions ] = useState<string[]>([]);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const valuationHasPeriodiceData = useMemo(() => keyOptions.length > 0, [ keyOptions ]);
    const buttonOptionSideNav = useMemo(() => {
        const fullConfig = [{
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
        }]
        return mobile.mobile ? 
            <ButtonOptionSideNav
                buttonOptionSideNavConfig={fullConfig.slice(0, 1)}
                orientation={'horizontal'}/> :
            <ButtonOptionSideNav
                buttonOptionSideNavConfig={fullConfig}
                orientation={'vertical'}/> 
    }, [ mobile, valuationKey, periodicDataKey, keyOptions ]);

    useEffect(() => {
        setPeriodicDataKey(undefined);
        
        if (discount && valuationKey) {
            setKeyOptions(Object
                .keys(discount[valuationKey].input)
                .filter(key => 
                    SpPeriodicDataKeys.includes(key) || DcfPeriodicDataKeys.includes(key)
                ));
        } else {
            setKeyOptions([]);
        }
    }, [ valuationKey ]);

    const renderSelectValuationKey = () => 
        loading ?
            <LoadingSpinner size={'LARGE'} color={'PURPLE'} minHeight={200}/> :
        error ?
            <ZeroState message={'Error'}
                supportText={'An error occurred while collecting discount details'}/> :
        discount && valuationKey ?
            <>
                <ValuationPrice price={discount[valuationKey].price} lastUpdated={new Date(discount.lastUpdated)}/>
                <DiscountSingularData valuation={discount[valuationKey]}/>
            </> :
        <ZeroState message={'Select a Valuation'} supportText={'View the calculated valuation data'}/>

    const renderSelectPeriodicData = () => 
        mobile.mobile ?
            valuationHasPeriodiceData &&
                <div className="periodic-data-arrow-nav">
                    <ArrowKeyNavigator keySetter={setPeriodicDataKey} keyOptions={keyOptions}/>
                </div> :
            valuationKey && !periodicDataKey && valuationHasPeriodiceData &&
                <ZeroState message='Select periodic data' supportText="Select option to see time series data"/>

    return (
        <section className="discount-data-display-section">
            { buttonOptionSideNav }
            <div className='data-container'>
                { renderSelectValuationKey() }
                { !!valuationKey && renderSelectPeriodicData() }
                {
                    discount && valuationKey && periodicDataKey &&
                        <PeriodicDataVisualization
                            cik={discount.cik}
                            periodicDataKey={periodicDataKey}
                            data={discount[valuationKey].input}/>
                }
            </div>
        </section>
    )
  }
  
  export default DiscountDataDisplaySection;