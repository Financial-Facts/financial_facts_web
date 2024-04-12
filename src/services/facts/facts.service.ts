import { environment } from "../../environment";
import ApiResponseError from "../../errors/ApiResponseError";
import { Facts } from "./facts.typings";

const FactsService = {

    getFacts: (cik: string): Promise<Facts> => fetchFacts(cik)
    
}

async function fetchFacts(cik: string): Promise<Facts> {
    return fetch(`${environment.factsGatewayUrl}/${cik}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (response.status === 200) {
            return response.json();
        }
        const text = await response.text();
        throw new ApiResponseError(text, response.status);
    });
}

export default FactsService;