export type Valuation = 'stickerPrice' | 'discountedCashFlowPrice' | 'benchmarkRatioPrice';

export const SpPeriodicDataKeys: (string | undefined)[]  = [
    'annualBVPS',
    'annualPE',
    'annualROIC',
    'annualEPS',
    'annualEquity',
    'annualRevenue',
    'annualOperatingCashFlow'
];

export const DcfPeriodicDataKeys: (string | undefined)[] = [
    'historicalRevenue', 
    'projectedRevenue', 
    'historicalOperatingCashFlow', 
    'projectedOperatingCashFlow', 
    'historicalCapitalExpenditure', 
    'projectedCapitalExpenditure', 
    'historicalFreeCashFlow', 
    'projectedFreeCashFlow',
];