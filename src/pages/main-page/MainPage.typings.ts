export type BulkEntitiesResponse = (BulkDiscountsWrapper & BulkIdentitiesWrapper) | BulkIdentitiesWrapper

export interface BulkDiscountsWrapper {
    discounts: SimpleDiscount[]
}

export interface SimpleDiscount {
    name: string,
    symbol: string,
    ratio_Price: number,
    ttmSalePrice: number,
    tfySalePrice: number,
    ttySalePrice: number,
    cik: string,
    active: boolean
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