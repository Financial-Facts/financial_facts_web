import { SPAN } from "./components/organisms/facts-display-section/FactsDisplaySection";
import { CONSTANTS } from "./constants/constants";
import { PeriodicData } from "./types/discount.typings";

export const handleEnterKeyEvent = <T> (e: React.KeyboardEvent<T>, handler: () => void): void => {
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

export const cleanKey = (key: string): string => {
    const wordRegex = /[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g;
    const keywords = key.trim().match(wordRegex)?.map(word => {
        word = word.trim();
        if (word === word.toUpperCase()) {
            return word.trim();
        } 
        return (word[0].toUpperCase() + word.slice(1).toLowerCase()).trim();
    }) || [];
    return keywords.join(CONSTANTS.SPACE);
}