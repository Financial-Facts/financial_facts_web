import { Period } from "../../types/discount.typings";

export interface Facts {
    cik: string
    entityName: string
    facts: TaxonomyReports
}

export interface TaxonomyReports {
    gaap: Record<string, UnitData>;
    ifrs: Record<string, UnitData>;
    dei: Record<string, UnitData>;
}

export interface UnitData {
    label: string
    description: string
    units: Record<string, UnitPeriod[]>
}

export interface UnitPeriod {
    fp: Period
    fy: number
    end: Date
    val: number
    filed: Date
    start: Date
    frame: string
}

export type Taxonomy = 'dei' | 'gaap' | 'ifrs';