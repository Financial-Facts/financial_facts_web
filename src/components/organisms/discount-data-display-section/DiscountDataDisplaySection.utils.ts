import { Discount, PeriodicDataKey, PeriodicData } from "../../../types/discount.typings";
import { Valuation } from "./DiscountDataDisplaySection.typings";

export const buildPeriodicDataMap = (
    discount: Discount,
    valuationKey: Valuation,
    periodicDataKey: PeriodicDataKey
) => valuationKey !== 'discountedCashFlowPrice' ? 
    {
        [periodicDataKey]: getPeriodicData(discount, valuationKey, periodicDataKey)
    } :
    buildDcfPeriodicDataMap(discount, valuationKey, periodicDataKey)

const getPeriodicData = (
    discount: Discount,
    valuationKey: Valuation,
    periodicDataKey: PeriodicDataKey
): PeriodicData[] => {
    const input = discount[valuationKey].input as any;
    if (periodicDataKey in input) {
        return input[periodicDataKey];
    }
    return [];
}

const buildDcfPeriodicDataMap = (
    discount: Discount,
    valuationKey: Valuation,
    periodicDataKey: PeriodicDataKey
) => {
    let historicalDataKey: PeriodicDataKey = 'historicalCapitalExpenditure';
    let projectedDataKey: PeriodicDataKey = 'projectedCapitalExpenditure';

    if (periodicDataKey.includes('FreeCashFlow')) {
        historicalDataKey = 'historicalFreeCashFlow';
        projectedDataKey = 'projectedFreeCashFlow';
    }

    if (periodicDataKey.includes('Revenue')) {
        historicalDataKey = 'historicalRevenue';
        projectedDataKey = 'projectedRevenue';
    }

    if (periodicDataKey.includes('OperatingCashFlow')) {
        historicalDataKey = 'historicalOperatingCashFlow';
        projectedDataKey = 'projectedOperatingCashFlow';
    }

    return {
        [historicalDataKey]: getPeriodicData(discount, valuationKey, historicalDataKey),
        [projectedDataKey]: [
            ...getPeriodicData(discount, valuationKey, historicalDataKey).slice(-1),
            ...getPeriodicData(discount, valuationKey, projectedDataKey)
        ]
    }
}