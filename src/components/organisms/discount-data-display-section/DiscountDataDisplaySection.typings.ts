export type Valuation = 'stickerPrice' | 'discountedCashFlowPrice' | 'benchmarkRatioPrice';

export type PeriodicDataKeyOption = SpPeriodicDataKeyOption | DcfPeriodicDataKeyOption;

export type SpPeriodicDataKeyOption = 
    'annualBVPS' |
    'annualPE' | 
    'annualROIC' |
    'annualEPS' |
    'annualEquity' |
    'annualRevenue' |
    'annualOperatingCashFlow';

export type DcfPeriodicDataKeyOption = 
    'historicalRevenue' |
    'historicalOperatingCashFlow' |
    'historicalCapitalExpenditure' |
    'historicalFreeCashFlow';

export const SpPeriodicDataKeys: SpPeriodicDataKeyOption[] = [
    'annualBVPS',
    'annualPE',
    'annualROIC',
    'annualEPS',
    'annualEquity',
    'annualRevenue',
    'annualOperatingCashFlow'
];

export const DcfPeriodicDataKeys: DcfPeriodicDataKeyOption[] = [
    'historicalRevenue', 
    'historicalOperatingCashFlow',
    'historicalCapitalExpenditure',
    'historicalFreeCashFlow',
];
