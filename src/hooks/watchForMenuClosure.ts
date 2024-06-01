import { useEffect } from 'react';
import { Subject } from 'rxjs';
import { ClosurePayload } from '../components/organisms/sticky-menu/StickyMenu';


const watchForMenuClosure = (
    $closeDropdowns: Subject<ClosurePayload[]>,
    action: (payload: ClosurePayload[]) => void
) => {
    useEffect(() => {
        const watchForClosure = $closeDropdowns
            .subscribe((payload: ClosurePayload[]) => action(payload));
        return () => {
            watchForClosure.unsubscribe();
        }
    }, []);
}
  
export default watchForMenuClosure;