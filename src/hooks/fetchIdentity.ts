import { useEffect, useState } from 'react';
import ApiResponseError from '../errors/ApiResponseError';
import { supabaseService } from '../services/supabase/supabase.service';
import { Identity } from '../services/bulk-entities/bulk-entities.typings';
import { useLocation } from 'react-router-dom';


const fetchIdentity = (cik: string | undefined) => {

    const [ identity, setIdentity ] = useState<Identity | null>(null);
    const [ loadingIdentity, setLoading ] = useState(true);
    const [ identityError, setError ] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (cik) {
            const passedCik = cik;
            if (!!location.state) {
                const { cik, name, symbol } = location.state;
                if (cik === passedCik && !!name && !!symbol) {
                    setIdentity(location.state as Identity);
                    setLoading(false);
                    setError(false);
                    return;
                }
            }
            setLoading(true);
            setError(false);
            supabaseService.fetchIdentity(cik)
                .then(response => setIdentity(response))
                .catch((_: ApiResponseError) => setError(true))
                .finally(() => setLoading(false));
        }
    }, [ cik ]);

    return { identity, loadingIdentity, identityError };
}
  
  export default fetchIdentity;