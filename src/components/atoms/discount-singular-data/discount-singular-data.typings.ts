import { Discount } from "../../../types/discount.typings";

export type SingularDataKeyOption = SpSingularDataKeyOption | DcfSingularDataKeyOption | BrpSingularDataKeyOption;

export type DcfSingularDataKeyOption = 
    'cik' |
    'dilutedSharesOutstanding' |
    'enterpriseValue' |
    'freeCashFlowT1' |
    'longTermGrowthRate' |
    'marketPrice' |
    'netDebt' |
    'symbol' |
    'terminalValue' |
    'wacc';

export type SpSingularDataKeyOption = 
    'cik' |
    'debtYears';

export type BrpSingularDataKeyOption = 
    'cik' |
    'industry' |
    'ttmRevenue' |
    'sharesOutstanding' |
    'psBenchmarkRatio';

export const PercentageKeys: (DcfSingularDataKeyOption | SpSingularDataKeyOption | BrpSingularDataKeyOption)[] = [
    'longTermGrowthRate',
    'wacc'
];

export const CurrencyKeys: (DcfSingularDataKeyOption | SpSingularDataKeyOption | BrpSingularDataKeyOption)[] = [
    'enterpriseValue',
    'freeCashFlowT1',
    'marketPrice',
    'netDebt',
    'terminalValue',
    'ttmRevenue'
];

export const DiscountCurrencyKeys: (keyof Discount)[] = [
    'annualDividend',
    'marketPrice'
]

export const DcfSingularDataKeys: DcfSingularDataKeyOption[] = [
    'cik',
    'dilutedSharesOutstanding',
    'enterpriseValue',
    'freeCashFlowT1',
    'longTermGrowthRate',
    'marketPrice',
    'netDebt',
    'symbol',
    'terminalValue',
    'wacc'
];

export const SpSingularDataKeys: SpSingularDataKeyOption[] = [
    'cik',
    'debtYears'
];

export const BrpSingularDataKeys: BrpSingularDataKeyOption[] = [
    'cik',
    'industry',
    'psBenchmarkRatio',
    'ttmRevenue',
    'sharesOutstanding'
]