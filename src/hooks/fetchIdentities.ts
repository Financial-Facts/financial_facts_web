import { useEffect, useState } from 'react';
import { Identity, IdentityRequest } from '../services/bulk-entities/bulk-entities.typings';
import { supabaseService } from '../services/supabase/supabase.service';


const fetchIdentities = (identityRequest: IdentityRequest | null) => {

    const [ identities, setIdentities ] = useState<Identity[]>([]);
    const [ loading, setLoading ] = useState(!!identityRequest);
    const [ error, setError ] = useState(false);
    
    useEffect(() => {
        if (!!identityRequest) {
            setLoading(true);
            supabaseService.fetchBulkIdentities(identityRequest)
                .then(response => setIdentities(response))
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        }
    }, [
        identityRequest?.startIndex,
        identityRequest?.limit,
        identityRequest?.keyword,
        identityRequest?.searchBy,
        identityRequest?.sortBy,
        identityRequest?.order
    ]);

    return { identities, loading, error };
}
  
  export default fetchIdentities;