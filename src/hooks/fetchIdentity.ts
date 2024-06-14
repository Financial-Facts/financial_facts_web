import { useEffect, useState } from 'react';
import ApiResponseError from '../errors/ApiResponseError';
import { supabaseService } from '../services/supabase/supabase.service';
import { Identity } from '../services/bulk-entities/bulk-entities.typings';


const fetchIdentity = (cik: string | undefined, fetchCondition: boolean = true) => {

    const [ identity, setIdentity ] = useState<Identity | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    
    useEffect(() => {
        if (cik && fetchCondition) {
            setLoading(true);
            setError(false);
            supabaseService.fetchIdentity(cik)
                .then(response => setIdentity(response))
                .catch((_: ApiResponseError) => setError(true))
                .finally(() => setLoading(false));
        }
    }, [ cik ]);

    return { identity, loading, error };
}
  
  export default fetchIdentity;