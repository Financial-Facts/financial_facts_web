import { useMemo, useState } from "react";
import ZeroState from '../../atoms/zero-state/ZeroState';
import ButtonOptionSideNav, { ButtonSideNavConfigItem } from "../../molecules/button-option-side-nav/ButtonOptionSideNav";
import './DiscountDataDisplaySection.scss';
import { DcfPeriodicDataKeys, PeriodicDataKeyOption, SpPeriodicDataKeys, Valuation } from './DiscountDataDisplaySection.typings';
import { useSelector } from "react-redux";
import SingularDataList from "../../atoms/singular-data-list/SingularDataList";
import { MobileState } from "../../../store/mobile/mobile.slice";
import PeriodicDataVisualization from "../../molecules/periodic-data-visualization/PeriodicDataVisualization";
import ValuationPrice from "../../atoms/valuation-price/ValuationPrice";
import ArrowKeyNavigator from "../../molecules/arrow-key-navigator/ArrowKeyNavigator";
import LoadingSpinner from "../../atoms/loading-spinner/loading-spinner";
import DropdownInformationList from "../../atoms/dropdown-information-list/DropdownInformationList";
import { buildPeriodicDataMap } from "./DiscountDataDisplaySection.utils";
import { Discount } from "../../../types/discount.typings";
import ValuationPriceDefinitionDropdownItem from "../../molecules/valuation-price-definition-dropdown-item/ValuationPriceDefinitionDropdownItem";
import { cleanKey } from "../../../utilities";
import { messaging } from "../../../constants/messaging";
import FormatService from "../../../services/format/format.service";

export interface DiscountDataDisplaySectionProps {
    discount: Discount | null,
    loading: boolean,
    error: boolean
}

function DiscountDataDisplaySection({ discount, loading, error }: DiscountDataDisplaySectionProps) {

    const [ valuationKey, setValuationKey ] = useState<Valuation | undefined>(undefined);
    const [ periodicDataKey, setPeriodicDataKey ] = useState<PeriodicDataKeyOption | undefined>();
    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);

    const getKeyOptions = (key: Valuation | undefined): PeriodicDataKeyOption[] => 
        key === 'stickerPrice' ? SpPeriodicDataKeys :
        key === 'discountedCashFlowPrice' ? DcfPeriodicDataKeys : 
        [];

    const keyOptions: PeriodicDataKeyOption[] = useMemo(() => getKeyOptions(valuationKey), [ valuationKey ]);
    const valuationHasPeriodicData = keyOptions.length > 0;
    const discountDefinition = valuationKey ? 
        <DropdownInformationList
            listItem={
                <ValuationPriceDefinitionDropdownItem
                    word={cleanKey(valuationKey)}
                    messaging={messaging.descriptions[valuationKey]}
                    elementId={valuationKey}/>
            }/> : undefined;

    const buttonOptionSideNav = useMemo(() => {
        const fullConfig: ButtonSideNavConfigItem<any>[] = [{
            label: 'Valuation',
            keys: ['stickerPrice', 'benchmarkRatioPrice', 'discountedCashFlowPrice'],
            selectedKey: valuationKey,
            selectedKeySetter: (key) => {
                setValuationKey(key);
                if (mobile.mobile) {
                    const options = getKeyOptions(key);
                    setPeriodicDataKey(options.length > 0 ? options[0] : undefined);
                } else {
                    setPeriodicDataKey(undefined);
                }
            },
            isFoldable: true,
            onFoldedElement: mobile.mobile ? discountDefinition : undefined
        }, {
            label: 'Periodic Data',
            keys: keyOptions,
            selectedKey: periodicDataKey,
            selectedKeySetter: setPeriodicDataKey,
            isScrollable: true,
            deselectable: true
        }];
        
        return !discount ? undefined : 
            mobile.mobile ? 
                <ButtonOptionSideNav
                    buttonOptionSideNavConfig={fullConfig.slice(0, 1)}
                    orientation={'horizontal'}/> :
                <ButtonOptionSideNav
                    buttonOptionSideNavConfig={fullConfig}
                    orientation={'vertical'}/> 
    }, [ discount, mobile, valuationKey, periodicDataKey, keyOptions ]);

    const buildDiscountSingularData = (discount: Discount, valuationKey: Valuation): Record<string, string>  => {
        switch(valuationKey) {
            case 'stickerPrice': {
                const valuationInput = discount[valuationKey].input;
                return {
                    debtYears: String(valuationInput.debtYears),
                    FiveYearAnalystAvgGrowthEstimate: FormatService.formatToPercentValue(valuationInput.ffyEstimatedEpsGrowthRate)
                }
            }
            case 'benchmarkRatioPrice': {
                const valuationInput = discount[valuationKey].input;
                return {
                    industry: valuationInput.industry,
                    psBenchmarkRatio: FormatService.formatToDecimalValue(valuationInput.psBenchmarkRatio),
                    ttmRevenue: FormatService.formatToDollarValue(valuationInput.ttmRevenue),
                    sharesOutstanding: String(valuationInput.sharesOutstanding)
                }

            }
            case 'discountedCashFlowPrice': {
                const valuationInput = discount[valuationKey].input;
                return {
                    dilutedSharesOutstanding: String(valuationInput.dilutedSharesOutstanding),
                    enterpriseValue: FormatService.formatToDollarValue(valuationInput.enterpriseValue),
                    freeCashFlowT1: FormatService.formatToDollarValue(valuationInput.freeCashFlowT1),
                    longTermGrowthRate: FormatService.formatToPercentValue(valuationInput.longTermGrowthRate),
                    marketPrice: FormatService.formatToDollarValue(valuationInput.marketPrice),
                    netDebt: FormatService.formatToDollarValue(valuationInput.netDebt),
                    terminalValue: FormatService.formatToDollarValue(valuationInput.terminalValue),
                    wacc: FormatService.formatToPercentValue(valuationInput.wacc)
                }
            }
        }
    }

    const renderSelectValuationKey = () => 
        loading ?
            <LoadingSpinner size={'LARGE'} color={'PURPLE'} minHeight={200}/> :
        error ?
            <ZeroState message={'Error'}
                supportText={'An error occurred while collecting discount details'}/> :
        !discount ?
            <ZeroState message={'Discount not found'} supportText={'Discount not found for provided CIK'}/> :
        discount && valuationKey ?
            <>
                { !mobile.mobile && discountDefinition }
                <ValuationPrice price={discount[valuationKey].price} lastUpdated={discount.lastUpdated}/>
                <SingularDataList
                    title={'Valuation Inputs'}
                    singularData={buildDiscountSingularData(discount, valuationKey)}/>
            </> :
        <ZeroState message={'Select a Valuation'} supportText={'View the calculated valuation data'}/>

    const renderSelectPeriodicData = () => 
        mobile.mobile ?
            valuationHasPeriodicData &&
                <div className="periodic-data-arrow-nav">
                    <ArrowKeyNavigator<PeriodicDataKeyOption> keySetter={setPeriodicDataKey} keyOptions={keyOptions}/>
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