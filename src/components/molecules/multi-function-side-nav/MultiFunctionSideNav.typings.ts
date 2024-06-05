import { MultiValue } from "react-select"
import { Bounds } from "../../atoms/price-range/PriceRange"
import { ToggleOption } from "../../atoms/search-form-toggle/SearchFormToggle"
import { Option } from '../../atoms/multi-select/MultiSelect';

export interface Title {
    type: 'TITLE',
    label: string
}

export interface MultiSelect {
    type: 'MULTI_SELECT',
    label: string,
    options: Option[],
    defaultSelected: Option[],
    selectionSetter: (_: MultiValue<Option>) => void
}

export interface PriceRange {
    type: 'PRICE_RANGE'
    label: string
    minimum: number,
    maximum: number,
    defaultValues: number[]
    boundSetter: React.Dispatch<React.SetStateAction<Bounds>>
}

export interface Toggle<T> {
    type: 'TOGGLE'
    label: string
    defaultSelected: string
    options: ToggleOption<T>[]
    selectionSetter: (_: T) => void,
    showToggleLabel?: boolean
}

export interface ToggleGroup<T> {
    type: 'TOGGLE_GROUP',
    label: string
    toggles: Toggle<T>[]
}

export interface KeywordSearch {
    type: 'SEARCH',
    label: string,
    defaultValue: string,
    keywordSetter: (_: string) => void
}

export type SideNavItemType = "MULTI_SELECT" | "PRICE_RANGE" | "TOGGLE" | "SEARCH" | "TITLE" | "TOGGLE_GROUP";
export type SideNavItem = MultiSelect | PriceRange | Toggle<string> | KeywordSearch | Title | ToggleGroup<string>;
