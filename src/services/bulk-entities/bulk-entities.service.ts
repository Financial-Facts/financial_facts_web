import { BulkEntitiesResponse, IdentityRequest } from "./bulk-entities.typings";
import { environment } from "../../environment";


const BulkEntitiesService = {
    
    fetchBulkIdentities: async (identityRequest: IdentityRequest): Promise<BulkEntitiesResponse> => {
        return fetchBulkEntitiesFromFFS(identityRequest, false);
    },

    fetchBulkDiscounts: async (): Promise<BulkEntitiesResponse> => {
        return fetchBulkEntitiesFromFFS({
            startIndex: 0,
            limit: 0,
            sortBy: 'CIK',
            order: 'ASC'
        }, true);
    },

    fetchBulkIdentitiesAndDiscounts: async (identityRequest: IdentityRequest): Promise<BulkEntitiesResponse> => {
        return fetchBulkEntitiesFromFFS(identityRequest, true);
    }
}

async function fetchBulkEntitiesFromFFS(
    identityRequest: IdentityRequest,
    includeDiscounts: boolean
): Promise<BulkEntitiesResponse> {
    return fetch(`${environment.ffsRestUrl}/v1/identity/bulk?includeDiscounts=${includeDiscounts}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(identityRequest)
    }).then(response => response.json())
    .catch(err => { throw err });
}

export default BulkEntitiesService;