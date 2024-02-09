import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../environment";
import { Facts } from "./facts.typings";

const FactsService = {

    getFacts: (cik: string): Observable<Facts> => {
        return new Observable<Facts>(observer => {
            fetchDiscount(cik).then(discount => {
                observer.next(discount);
                observer.unsubscribe();
            })
        })
    }
}

async function fetchDiscount(cik: string): Promise<Facts> {
    return fetch(`${environment.ffsRestUrl}/v1/facts/${cik}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .catch(err => { throw err });
}

export default FactsService;