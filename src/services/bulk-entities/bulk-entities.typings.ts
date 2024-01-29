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
    active: boolean,
    stickerPrice: number,
    discountedCashFlowPrice: number,
    benchmarkRatioPrice: number,
}

export interface BulkIdentitiesWrapper {
    identities: Identity[]
}

export interface Identity {
    cik: string,
    symbol: string,
    name: string
}

export interface IdentityRequest {
    startIndex: number,
    limit: number,
    sortBy: string,
    order: string
  }