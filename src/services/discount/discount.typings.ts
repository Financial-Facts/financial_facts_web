export interface Discount {
    cik: string
    symbol: string
    name: string
    lastUpdated: Date
    active: boolean
    stickerPrice: StickerPrice
    benchmarkRatioPrice: BenchmarkRatioPrice
}

export interface StickerPrice {
    cik: string
    ttmPriceData: TrailingPriceData
    tfyPriceData: TrailingPriceData
    ttyPriceData: TrailingPriceData
    input: StickerPriceInput
}

export interface TrailingPriceData {
    cik: string;
    stickerPrice: number;
    salePrice: number;
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

export type Period = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY';

export interface PeriodicData {
    cik: string
    announcedDate: Date
    period: Period
    value: number
}

export type BenchmarkRatioPrice = {
    cik: string
    ratioPrice: number
    input: BenchmarkPriceInput
}

export interface BenchmarkPriceInput {
    cik: string
    industry: string
    ttmRevenue: number
    sharesOutstanding: number
    psBenchmarkRatio: number
}
