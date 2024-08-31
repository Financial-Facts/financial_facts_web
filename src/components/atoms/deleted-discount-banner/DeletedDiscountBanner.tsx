import './DeletedDiscountBanner.scss';

export interface DeletedDiscountBannerProps {
    deletedReason: string
}

const annualDataKeys: Record<string, string> = {
    annualROIC: 'Annual ROIC',
    annualRevenue: 'Annual revenue',
    annualEPS: 'Annual EPS',
    annualEquity: 'Annual equity',
    annualOperatingCashFlow: 'Annual operating cash flow',
    periods: 'years'
};

function DeletedDiscountBanner({ deletedReason }: DeletedDiscountBannerProps) {

    const cleanMessage = (reason: string): string => {
        Object.keys(annualDataKeys).forEach(key => {
            reason = reason.replace(key, annualDataKeys[key]);
        });
        return reason;
    }

    return <section className="deleted-discount-banner">
        <span className='warning'>DISQUALIFIED</span>
        <span className='deleted-reason'>{ cleanMessage(deletedReason) }</span>
    </section>

}

export default DeletedDiscountBanner;