import { CONSTANTS } from "../../../../constants/constants";
import { SearchCriteria, SearchCriteriaAction } from "../expandable-search.typings";

export function searchCriteriaReducer(state: SearchCriteria, action: SearchCriteriaAction): SearchCriteria {
    switch (action.type) {
        case ('reset_all'): {
            return {
                searchBy: 'SYMBOL',
                sortBy: 'SYMBOL',
                order: 'ASC',
                keyword: CONSTANTS.EMPTY
            }
        }
        case ('set_search_by'): {
            const payload = action.payload;
            if (payload && payload.searchBy) {
                return { ...state, ...{
                    searchBy: payload.searchBy,
                    sortBy: payload.searchBy
                }}
            }
            return state;
        }
        case ('set_sort_by'): {
            const payload = action.payload;
            if (payload && payload.sortBy) {
                return { ...state, ...{
                    sortBy: payload.sortBy
                }}
            }
            return state;
        }
        case ('set_order'): {
            const payload = action.payload;
            if (payload && payload.order) {
                return { ...state, ...{
                    order: payload.order
                }}
            }
            return state;
        }
        case ('set_keyword'): {
            const payload = action.payload;
            if (payload) {
                return { ...state, ...{
                    keyword: payload.keyword
                }}
            }
            return state;
        }
    }
}