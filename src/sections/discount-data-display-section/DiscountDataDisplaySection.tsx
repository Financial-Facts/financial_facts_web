import { useState } from "react";
import ButtonOptionSideNav, { ButtonSideNavConfigItem } from "../../components/ButtonOptionSideNav/ButtonOptionSideNav"
import { Discount } from "../../services/discount/discount.typings"

export interface DiscountDataDisplaySectionProps {
    discount: Discount
}

type Valuation = 'stickerPrice' | 'benchmarkRatioPrice' | 'discountedCashFlowPrice'

function DiscountDataDisplaySection({ discount }: DiscountDataDisplaySectionProps) {

    const [ selectedValuation, setSelectedValuation ] = useState<Valuation | undefined>(undefined);

    const sideNavConfig: ButtonSideNavConfigItem<Valuation>[] = [{
        label: 'Valuation',
        keys: ['stickerPrice', 'benchmarkRatioPrice', 'discountedCashFlowPrice'],
        selectedKey: selectedValuation,
        selectedKeySetter: setSelectedValuation
    }]

    return (
        <ButtonOptionSideNav buttonOptionSideNavConfig={sideNavConfig}/>
    )
  }
  
  export default DiscountDataDisplaySection;