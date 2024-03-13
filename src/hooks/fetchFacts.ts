import { useEffect, useState } from 'react';
import FactsService from '../services/facts/facts.service';
import { Facts } from '../services/facts/facts.typings';
import ApiResponseError from '../errors/ApiResponseError';


const fetchFacts = (cik: string) => {

    const [ facts, setFacts ] = useState<Facts | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ notFound, setNotFound ] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        FactsService.getFacts(cik)
            .then(response => setFacts(response))
            .catch((error: ApiResponseError) => {
                if (error.status === 404) {
                    setNotFound(true);
                }
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [ cik ]);

    return { facts, loading, error, notFound };
}
  
  export default fetchFacts;