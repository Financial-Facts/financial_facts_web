import { BulkEntitiesResponse, IdentityRequest } from "./bulk-entities.typings";

const BulkEntitiesService = {

    fetchBulkIdentities: (identityRequest: IdentityRequest) => {
        return getBulkEntities(identityRequest, false);
    },

    fetchBulkIdentitiesAndDiscounts: (identityRequest: IdentityRequest) => {
        return getBulkEntities(identityRequest, true);
    }
}

async function getBulkEntities(
    identityRequest: IdentityRequest,
    includeDiscounts: boolean
): Promise<BulkEntitiesResponse> {
    return fetch(`https://financial-facts.net/v1/identity/bulk?includeDiscounts=${includeDiscounts}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(identityRequest)
      }).then(response => response.json())
      .catch(err => { throw err });
}

export default BulkEntitiesService;