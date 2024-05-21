import { useEffect, useState } from 'react';
import { Identity, IdentityRequest } from '../services/bulk-entities/bulk-entities.typings';
import { supabaseService } from '../services/supabase/supabase.service';
import { Subject, catchError, map, switchMap, tap } from 'rxjs';


const fetchIdentities = (identityRequest: IdentityRequest | null, useSwitchMap = true) => {

    const [ identities, setIdentities ] = useState<Identity[]>([]);
    const [ loading, setLoading ] = useState(!!identityRequest);
    const [ error, setError ] = useState(false);
    
    const fetchBulkIdentities$ = new Subject<IdentityRequest>();
    const fetchBulkIdentitiesWithSwitchMap$ = new Subject<IdentityRequest>();

    fetchBulkIdentitiesWithSwitchMap$
        .pipe(
            tap(() => {
                setError(false);
                setLoading(true)
            }),
            switchMap(identityRequest => supabaseService.fetchBulkIdentities(identityRequest)),
            catchError(err => {
                setError(true);
                throw err;
            }),
            tap(() => setLoading(false)))
        .subscribe(identities => setIdentities(identities));

    fetchBulkIdentities$
        .pipe(
            tap(() => {
                setError(false);
                setLoading(true)
            }),
            map(identityRequest => supabaseService.fetchBulkIdentities(identityRequest)),
            catchError(err => {
                setError(true);
                throw err;
            }),
            tap(() => setLoading(false)))
        .subscribe(async identities => setIdentities(await identities));

    useEffect(() => {
        if (!!identityRequest) {
            if (useSwitchMap) {
                fetchBulkIdentitiesWithSwitchMap$.next(identityRequest);
            } else {
                fetchBulkIdentities$.next(identityRequest);
            }
        }
    }, [ identityRequest, useSwitchMap ]);

    return { identities, loading, error };
}
  
  export default fetchIdentities;