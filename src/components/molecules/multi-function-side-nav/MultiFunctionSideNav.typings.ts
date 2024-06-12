import { MultiValue } from "react-select"
import { Bounds } from "../../atoms/price-range/PriceRange"
import { ToggleOption } from "../../atoms/search-form-toggle/SearchFormToggle"
import { Option } from '../../atoms/multi-select/MultiSelect';

export interface Title {
    type: 'TITLE',
    label: string
}

export interface MultiSelect<T extends string> {
    type: 'MULTI_SELECT',
    label: string,
    options: Option<T>[],
    value: MultiValue<Option<T>>,
    selectionSetter: (_: MultiValue<Option<T>>) => void
}

export interface PriceRange {
    type: 'PRICE_RANGE'
    label: string
    minimum: number,
    maximum: number,
    value: number[]
    boundSetter: (bounds: Bounds) => void
}

export interface Toggle<T extends string> {
    type: 'TOGGLE'
    label: string
    selectedId: T
    options: ToggleOption<T>[]
    selectionSetter: (_: T) => void,
    showToggleLabel?: boolean
}

export interface ToggleGroup<T extends string> {
    type: 'TOGGLE_GROUP',
    label: string
    toggles: Toggle<T>[]
}

export interface KeywordSearch {
    type: 'SEARCH',
    label: string,
    value: string,
    keywordSetter: (_: string) => void
}

export type SideNavItemType = "MULTI_SELECT" | "PRICE_RANGE" | "TOGGLE" | "SEARCH" | "TITLE" | "TOGGLE_GROUP";
export type SideNavItem<T extends string, J extends string> = MultiSelect<T> | PriceRange | Toggle<J> | KeywordSearch | Title | ToggleGroup<J>;
