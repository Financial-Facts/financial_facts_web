import { Valuation } from "../../components/organisms/discount-data-display-section/DiscountDataDisplaySection.typings";
import { Order, SimpleDiscount } from "../../services/bulk-entities/bulk-entities.typings";
import { DiscountFilter } from "./discounts.slice";


export const compare = (a: string | number | boolean, b: string | number | boolean, sortOrder: Order) => 
    sortOrder === 'ASC' ? 
        a > b ? 1 : -1 :
        a < b ? 1 : -1;
  

export const getSortFunction = (
    sortByKey: keyof SimpleDiscount,
    sortOrder: Order
): (a: SimpleDiscount, b: SimpleDiscount) => number => {
    switch(sortByKey) {
        case 'lastUpdated': {
            return (a, b) => compare(new Date(a.lastUpdated).valueOf(), new Date(b.lastUpdated).valueOf(), sortOrder);
        }
        default: {
            return (a, b) => compare(a[sortByKey], b[sortByKey], sortOrder);
        }
    }
}
  

export const filterForValuation = (
    discounts: SimpleDiscount[],
    valuationKey: Valuation
): SimpleDiscount[] => discounts.filter(discount => discount.marketPrice < discount[valuationKey]);

export const filterExpired = (
    discounts: SimpleDiscount[]
): SimpleDiscount[] => discounts.filter(simpleDiscount => simpleDiscount.isDeleted === 'N');

export const filterDiscountState = (discounts: SimpleDiscount[], filter: DiscountFilter) => {
    if (filter.hideValuesAbove.benchmarkRatioPrice) {
        discounts = filterForValuation(discounts, 'benchmarkRatioPrice');
    }

    if (filter.hideValuesAbove.discountedCashFlowPrice) {
        discounts = filterForValuation(discounts, 'discountedCashFlowPrice');
    }

    if (filter.hideValuesAbove.stickerPrice) {
        discounts = filterForValuation(discounts, 'stickerPrice');
    }

    if (!filter.showExpired) {
        discounts = filterExpired(discounts);
    }

    if (!!filter.keyword) {
        discounts = discounts.filter(discount => {
        const lowerKeyword = filter.keyword.toLowerCase();
            return discount.cik.toLowerCase().includes(lowerKeyword) ||
                discount.symbol.toLowerCase().includes(lowerKeyword) || 
                discount.name.toLowerCase().includes(lowerKeyword);
        });
    }

    if (filter.priceBounds.lowerBound !== 0 && filter.priceBounds.upperBound !== 0) {
        discounts = discounts.filter(discount =>
        discount.marketPrice >= filter.priceBounds.lowerBound &&
        discount.marketPrice <= filter.priceBounds.upperBound);
    }

    return discounts;
}