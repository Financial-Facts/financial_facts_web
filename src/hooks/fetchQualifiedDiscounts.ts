import { useEffect, useState } from 'react';
import { supabaseService } from '../services/supabase/supabase.service';
import { SimpleDiscount } from '../services/bulk-entities/bulk-entities.typings';
import { catchError } from 'rxjs';


const fetchQualifiedDiscounts = () => {

    const [ qualifiedDiscounts, setQualifiedDiscounts ] = useState<SimpleDiscount[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setError(false);
        const subscription = supabaseService.qualifiedDiscounts$
            .pipe(
                catchError(error => {
                    setError(true);
                    throw error;
                })
            )
            .subscribe(response => {
                setQualifiedDiscounts(response);
                setLoading(false);
            });
        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return { qualifiedDiscounts, loading, error };
}
  
  export default fetchQualifiedDiscounts;