import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../environment";
import { Discount } from "./discount.typings";

const DiscountService = {

    getDiscount: (cik: string): Observable<Discount> => {
        return new Observable<Discount>(observer => {
            fetchDiscount(cik).then(discount => {
                observer.next(discount);
                observer.unsubscribe();
            })
        })
    }
}

async function fetchDiscount(cik: string): Promise<Discount> {
    return fetch(`${environment.ffsRestUrl}/v1/discount/${cik}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .catch(err => { throw err });
}

export default DiscountService;