import { CONSTANTS } from "./components/constants";
import { SPAN } from "./sections/facts-display-section/FactsDisplaySection";
import { PeriodicData } from "./services/discount/discount.typings";

export const handleEnterKeyEvent = (e: React.KeyboardEvent<HTMLDivElement>, handler: () => void): void => {
    if (e.code === 'Enter') {
        handler();
    }
}

export function days_since(date: Date): number {
    const d1 = new Date(date);
    const d2 = new Date();
    const diff = Math.abs(d1.getTime() - d2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
}

export const filterBySpan = (periodicData: PeriodicData[], span: SPAN): PeriodicData[] => {
    return periodicData.filter(period => {
        const daysSince = days_since(period.announcedDate);
        if (span === 'ALL') {
            return true;
        }
        return daysSince < CONSTANTS.SPAN_YEARS[span];
    });
}