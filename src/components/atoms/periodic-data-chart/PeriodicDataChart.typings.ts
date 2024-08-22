import { PeriodicData } from "../../../types/discount.typings";

export type TableDataType = 'CURRENCY' | 'PERCENT' | 'RATIO';

export interface TableData { index: number, label: string, periodicData: PeriodicData[], dataType?: TableDataType }