import { CONSTANTS } from "../../../../constants/constants";
import { IdentityRequest, Order, SearchBy, SortBy } from "../../../../services/bulk-entities/bulk-entities.typings";

export type IdentityListActionType =
    'reset' | 'set_start_and_limit' | 'set_search_by' |
    'set_sort_by' | 'set_order' | 'set_keyword';


export interface Reset {
    type: 'reset'
}

export interface SetStartAndLimitAction {
    type: 'set_start_and_limit'
    payload: {
        startIndex: number
        limit: number
    }
}

export interface SetSearchBy {
    type: 'set_search_by',
    payload: SearchBy
}

export interface SetSortBy {
    type: 'set_sort_by',
    payload: SortBy
}

export interface SetOrder {
    type: 'set_order',
    payload: Order
}

export interface SetKeyword {
    type: 'set_keyword',
    payload: string | undefined
}

export type IdentityRequestAction =
    Reset | SetStartAndLimitAction | SetSearchBy | 
    SetSortBy | SetOrder | SetKeyword;

export function identityRequestReducer(state: IdentityRequest, action: IdentityRequestAction): IdentityRequest {
    switch (action.type) {
        case ('reset'): {
            return {
                startIndex: 0,
                limit: CONSTANTS.IDENTITY_BATCH_SIZE,
                searchBy: 'SYMBOL',
                sortBy: 'SYMBOL',
                order: 'ASC',
                keyword: CONSTANTS.EMPTY
            };
        }
        case ('set_start_and_limit'): {
            const payload = action.payload;
            return {
                ...state,
                ...payload
            }
        }
        case ('set_search_by'): {
            const payload = action.payload;
            return { ...state, ...{
                searchBy: payload,
                sortBy: payload
            }}
        }
        case ('set_sort_by'): {
            const payload = action.payload;
            return { ...state, ...{
                sortBy: payload
            }}
        }
        case ('set_order'): {
            const payload = action.payload;
            return { ...state, ...{
                order: payload
            }}
        }
        case ('set_keyword'): {
            const payload = action.payload;
            return { ...state, ...{
                keyword: payload
            }}
        }
    }
}