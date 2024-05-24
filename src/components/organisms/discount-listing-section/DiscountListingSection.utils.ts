import { SimpleDiscount } from "../../../services/bulk-entities/bulk-entities.typings";

export const getExtreme = (discounts: SimpleDiscount[], extreme: 'MAX' | 'MIN') => 
    discounts.reduce<number>((currentExtreme, discount) => {
        if (extreme === 'MAX' && discount.marketPrice > currentExtreme) {
            return discount.marketPrice;
        }
        
        if (extreme === 'MIN' && discount.marketPrice < currentExtreme) {
            return discount.marketPrice;
        }

        return currentExtreme;
    }, discounts.length > 0 ? discounts[0].marketPrice : 0);