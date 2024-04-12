import { useEffect, useState } from 'react';
import ApiResponseError from '../errors/ApiResponseError';
import { Discount } from '../types/discount.typings';
import { supabaseService } from '../services/supabase/supabase.service';


const fetchDiscount = (cik: string | undefined) => {

    const [ discount, setDiscount ] = useState<Discount | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    
    useEffect(() => {
        if (cik) {
            setLoading(true);
            supabaseService.fetchDiscount(cik)
                .then(response => setDiscount(response))
                .catch((_: ApiResponseError) => setError(true))
                .finally(() => setLoading(false));
        }
    }, [ cik ]);

    return { discount, loading, error };
}
  
  export default fetchDiscount;