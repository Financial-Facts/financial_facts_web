import { map } from "rxjs/operators";
import { BulkEntitiesResponse, IdentityRequest, SimpleDiscount } from "./bulk-entities.typings";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { Subscriber } from "rxjs/internal/Subscriber";


const discounts = new BehaviorSubject<SimpleDiscount[]>([]);

const BulkEntitiesService = {
    
    fetchBulkIdentities: (identityRequest: IdentityRequest): Observable<BulkEntitiesResponse> => {
        return getBulkEntities(identityRequest, false);
    },

    fetchBulkDiscounts: (): Observable<BulkEntitiesResponse> => {
        return new Observable(observer => {
            getBulkEntities({
                    startIndex: 0,
                    limit: 0,
                    sortBy: 'CIK',
                    order: 'ASC'
                }, true)
            .subscribe(bulkEntitiesResponse => {
                observer.next(bulkEntitiesResponse);
                observer.unsubscribe();
            })});
    },

    fetchBulkIdentitiesAndDiscounts: (identityRequest: IdentityRequest): Observable<BulkEntitiesResponse> => {
        return new Observable(observer => {
            getBulkEntities(identityRequest, true).subscribe(val => {
                observer.next(val);
                observer.unsubscribe();
            })
        })
    }
}

function getBulkEntities(
    identityRequest: IdentityRequest,
    includeDiscounts: boolean
): Observable<BulkEntitiesResponse> {
    const storedDiscounts = discounts.value;
    const needFetchDiscounts = includeDiscounts && storedDiscounts.length === 0;
    const needFetchIdentities = identityRequest.startIndex !== identityRequest.limit;
    
    return new Observable(observer => {
        if (!needFetchIdentities && !needFetchDiscounts && includeDiscounts) {
            observer.next({
                discounts: storedDiscounts,
                identities: []
            })
            observer.unsubscribe();
        } else {
            fetchBulkEntitiesFromFFS(identityRequest, needFetchDiscounts)
                .then(bulkEntitiesResponse => {
                    if (bulkEntitiesResponse.discounts) {
                        discounts.next(bulkEntitiesResponse.discounts);
                    } else if (includeDiscounts && !needFetchDiscounts) {
                        bulkEntitiesResponse.discounts = storedDiscounts;
                    }
                    observer.next(bulkEntitiesResponse);
                    observer.unsubscribe();
                })
        }
    });
}

async function fetchBulkEntitiesFromFFS(
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