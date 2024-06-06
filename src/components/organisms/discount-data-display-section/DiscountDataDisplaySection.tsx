import { useEffect, useMemo, useState } from "react";
import ZeroState from '../../atoms/zero-state/ZeroState';
import ButtonOptionSideNav, { ButtonSideNavConfigItem } from "../../molecules/button-option-side-nav/ButtonOptionSideNav";
import './DiscountDataDisplaySection.scss';
import { DcfPeriodicDataKeys, SpPeriodicDataKeys, Valuation } from './DiscountDataDisplaySection.typings';
import { Discount, PeriodicDataKey } from "../../../types/discount.typings";
import { useSelector } from "react-redux";
import DiscountSingularData from "../../atoms/discount-singular-data/discount-singular-data";
import { MobileState } from "../../../store/mobile/mobile.slice";
import PeriodicDataVisualization from "../../molecules/periodic-data-visualization/PeriodicDataVisualization";
import ValuationPrice from "../../atoms/valuation-price/ValuationPrice";
import ArrowKeyNavigator from "../../molecules/arrow-key-navigator/ArrowKeyNavigator";
import LoadingSpinner from "../../atoms/loading-spinner/loading-spinner";
import StickerPriceDefinition from "../../molecules/sticker-price-definition/StickerPriceDefinition";
import DropdownInformationList from "../../atoms/dropdown-information-list/DropdownInformationList";
import DcfPriceDefinition from "../../molecules/dcf-price-definition/DcfPriceDefinition";
import BrPriceDefinition from "../../molecules/br-price-definition/BrPriceDefinition";
import { buildPeriodicDataMap } from "./DiscountDataDisplaySection.utils";
import { CONSTANTS } from "../../../constants/constants";

export interface DiscountDataDisplaySectionProps {
    discount: Discount | null,
    loading: boolean,
    error: boolean
}

function DiscountDataDisplaySection({ discount, loading, error }: DiscountDataDisplaySectionProps) {

    const [ valuationKey, setValuationKey ] = useState<Valuation | undefined>(undefined);
    const [ periodicDataKey, setPeriodicDataKey ] = useState<PeriodicDataKey | undefined>(undefined);
    const [ keyOptions, setKeyOptions ] = useState<PeriodicDataKey[]>([]);
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);
    const valuationHasPeriodicData = useMemo(() => keyOptions.length > 0, [ keyOptions ]);
    const discountDefinition = useMemo(() => 
        <DropdownInformationList
            listItem={
                valuationKey === 'stickerPrice' ? <StickerPriceDefinition/> :
                valuationKey === 'discountedCashFlowPrice' ? <DcfPriceDefinition/> :
                <BrPriceDefinition/>
            }/>
    , [ valuationKey ]);
    const buttonOptionSideNav = useMemo(() => {
        const fullConfig: ButtonSideNavConfigItem<any>[] = [{
            label: 'Valuation',
            keys: ['stickerPrice', 'benchmarkRatioPrice', 'discountedCashFlowPrice'],
            selectedKey: valuationKey,
            selectedKeySetter: setValuationKey,
            isFoldable: true,
            onFoldedElement: mobile.mobile ? discountDefinition : undefined
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
            switch (valuationKey) {
                case 'stickerPrice': {
                    setKeyOptions(SpPeriodicDataKeys);
                    return;
                }
                case 'discountedCashFlowPrice': {
                    setKeyOptions(DcfPeriodicDataKeys
                        .filter(key => !key.includes(CONSTANTS.PROJECTED)));
                    return;
                }
            }
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
                { !mobile.mobile && discountDefinition }
                <ValuationPrice price={discount[valuationKey].price} lastUpdated={discount.lastUpdated}/>
                <DiscountSingularData valuation={discount[valuationKey]}/>
            </> :
        <ZeroState message={'Select a Valuation'} supportText={'View the calculated valuation data'}/>

    const renderSelectPeriodicData = () => 
        mobile.mobile ?
            valuationHasPeriodicData &&
                <div className="periodic-data-arrow-nav">
                    <ArrowKeyNavigator<PeriodicDataKey> keySetter={setPeriodicDataKey} keyOptions={keyOptions}/>
                </div> :
            valuationKey && !periodicDataKey && valuationHasPeriodicData &&
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
                            periodicDataMap={buildPeriodicDataMap(discount, valuationKey, periodicDataKey)}/>
                }
            </div>
        </section>
    )
  }
  
  export default DiscountDataDisplaySection;