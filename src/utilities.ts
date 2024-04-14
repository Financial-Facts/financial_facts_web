import { TableData } from "./components/atoms/periodic-data-chart/PeriodicDataChart.typings";
import { SPAN } from "./components/organisms/facts-display-section/FactsDisplaySection";
import { CONSTANTS } from "./constants/constants";
import { UnitData, UnitPeriod } from "./services/facts/facts.typings";
import { PeriodicData } from "./types/discount.typings";

export const handleEnterKeyEvent = (e: React.KeyboardEvent<HTMLDivElement>, handler: () => void): void => {
    if (e.code === 'Enter') {
        handler();
    }
}

export const initRef = <T> (ref: T | null, setter?: (_: T) => void) => {
    if (ref && setter) {
        setter(ref);
    }
};

export const fetchChildren = (element: Element): Element[] => {
    let result: Element[] = [];
    const children = Array.from(element.children);
    children.forEach(child => {
        result = [...result, ...fetchChildren(child)];
    });
    return [...result, element];
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

export const buildPeriodicData = (cik: string, periods: UnitPeriod[]): PeriodicData[] => {
    return periods ?
        periods.reduce<PeriodicData[]>((acc, period) => {
            if (!acc.some(val => val.announcedDate.valueOf() === period.end.valueOf())) {
                acc.push({
                    cik: cik,
                    announcedDate: new Date(period.end),
                    period: period.fp,
                    value: period.val
                })
            }
            return acc;
        }, []) : []
}

export const buildUnitsToDataMap = (cik: string, units: Record<string, UnitPeriod[]>): Record<string, PeriodicData[]> => {
    return Object.keys(units).reduce<Record<string, PeriodicData[]>>((acc, key) => {
        const periods = units[key];
        if (periods.length > 0) {
            acc[key] = buildPeriodicData(cik, periods);
        }
        return acc;
    }, {});
}

export const buildTableData = (cik: string, item: UnitData | undefined, index?: number): TableData[] => {
    if (item) {
        const unitMap = buildUnitsToDataMap(cik, item?.units);
        return Object.keys(unitMap).map(unit => ({
            index: index,
            label: `${item.label} (${unit})`,
            periodicData: unitMap[unit]
        }));
    }
    return [];
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