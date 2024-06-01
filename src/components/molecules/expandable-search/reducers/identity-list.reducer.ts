import { Identity } from "../../../../services/bulk-entities/bulk-entities.typings";
import { IdentityListAction } from "../expandable-search.typings";

export function identityListReducer(state: Identity[], action: IdentityListAction): Identity[] {
    switch (action.type) {
        case ('reset'): {
            return [];
        }
        case ('set_list'): {
            if (action.payload) {
                return action.payload;
            }
            return state;
        }
        case ('update_list'): {
            if (action.payload) {
                return [...state, ...action.payload];
            }
            return state;
        }
    }
}