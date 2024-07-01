export interface BulkDiscountsWrapper {
    discounts: SimpleDiscount[]
}

export interface DiscountWrapper {
    discount: SimpleDiscount
}

export interface BulkEntitiesResponse {
    discounts?: SimpleDiscount[]
    identities: Identity[]
}

export interface SimpleDiscount {
    cik: string,
    name: string,
    symbol: string,
    lastUpdated: string,
    active: boolean,
    stickerPrice: number,
    discountedCashFlowPrice: number,
    benchmarkRatioPrice: number,
    marketPrice: number,
    annualDividend: number,
    averageVolume: number
}

export interface BulkIdentitiesWrapper {
    identities: Identity[]
}

export interface Identity {
    cik: string,
    symbol: string,
    name: string
}

export type SortBy = 'CIK' | 'NAME' | 'SYMBOL';

export type SearchBy = 'CIK' | 'NAME' | 'SYMBOL';

export type Order = 'ASC' | 'DESC';

export interface IdentityRequest {
    startIndex: number,
    limit: number,
    keyword?: string,
    searchBy: SearchBy,
    sortBy: SortBy,
    order: Order
}