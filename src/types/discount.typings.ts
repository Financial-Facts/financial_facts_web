
export interface Valuation<T> {
    cik: string,
    price: number,
    input: T
}

export type Period = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY';

export interface PeriodicData {
    cik: string
    announcedDate: Date
    period?: Period
    value: number
}

export interface StickerPriceInput {
    cik: string
    debtYears: number,
    annualBVPS: PeriodicData[]
    annualPE: PeriodicData[]
    annualROIC: PeriodicData[]
    annualEPS: PeriodicData[]
    annualEquity: PeriodicData[]
    annualRevenue: PeriodicData[]
    annualOperatingCashFlow: PeriodicData[]
}

export interface BenchmarkRatioPriceInput {
    cik: string
    industry: string
    ttmRevenue: number
    sharesOutstanding: number
    psBenchmarkRatio: number
}

export type DiscountedCashFlowInput = DiscountedCashFlowIdentity & DiscountedCashFlowPeriodicData & {
    wacc: number
    longTermGrowthRate: number
    terminalValue: number
    freeCashFlowT1: number
    enterpriseValue: number
    netDebt: number
    dilutedSharesOutstanding: number
    marketPrice: number
};

export interface DiscountedCashFlowIdentity {
    cik: string
    symbol: string
}

export interface DiscountedCashFlowPeriodicData {
    historicalRevenue: PeriodicData[]
    projectedRevenue: PeriodicData[]
    historicalOperatingCashFlow: PeriodicData[]
    projectedOperatingCashFlow: PeriodicData[]
    historicalCapitalExpenditure: PeriodicData[]
    projectedCapitalExpenditure: PeriodicData[]
    historicalFreeCashFlow: PeriodicData[]
    projectedFreeCashFlow: PeriodicData[]
}

export type StickerPrice = Valuation<StickerPriceInput>;

export type BenchmarkRatioPrice = Valuation<BenchmarkRatioPriceInput>;

export type DiscountedCashFlowPrice = Valuation<DiscountedCashFlowInput>;

export interface Discount {
    cik: string
    symbol: string
    name: string
    lastUpdated: Date
    active: boolean
    marketPrice: number
    stickerPrice: StickerPrice
    benchmarkRatioPrice: BenchmarkRatioPrice
    discountedCashFlowPrice: DiscountedCashFlowPrice
}

  