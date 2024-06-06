import { PeriodicDataKey } from "../../../types/discount.typings";

export type Valuation = 'stickerPrice' | 'discountedCashFlowPrice' | 'benchmarkRatioPrice';

export const SpPeriodicDataKeys: PeriodicDataKey[]  = [
    'annualBVPS',
    'annualPE',
    'annualROIC',
    'annualEPS',
    'annualEquity',
    'annualRevenue',
    'annualOperatingCashFlow'
];

export const DcfPeriodicDataKeys: PeriodicDataKey[] = [
    'historicalRevenue', 
    'projectedRevenue', 
    'historicalOperatingCashFlow', 
    'projectedOperatingCashFlow', 
    'historicalCapitalExpenditure', 
    'projectedCapitalExpenditure', 
    'historicalFreeCashFlow', 
    'projectedFreeCashFlow',
];
