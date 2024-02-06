import { SearchBy, SortBy, Order, Identity } from "../../services/bulk-entities/bulk-entities.typings";

export interface SearchCriteria {
    searchBy: SearchBy,
    sortBy: SortBy,
    order: Order,
    keyword?: string
}

export type SearchCriteriaUpdateType = 'set_search_by' | 'set_sort_by' | 'set_order' | 'set_keyword' | 'reset_all';

export interface SearchCriteriaAction {
    type: SearchCriteriaUpdateType,
    payload?: SearchBy | SortBy | Order | string
}

export type IdentityListUpdateType = 'reset' | 'update_list' | 'set_list';

export interface IdentityListAction {
    type: IdentityListUpdateType,
    payload?: Identity[]
}