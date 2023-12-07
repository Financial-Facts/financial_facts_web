import './MainPage.scss'
import Header from '../../components/header/Header'
import About from '../../components/about/About'
import { useEffect, useState } from 'react'
import BulkEntitiesService from '../../services/BulkEntitiesService';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';


function MainPage() {
    const [bulkEntities, setBulkEntities] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      setLoading(true);
      BulkEntitiesService.fetchBulkIdentitiesAndDiscounts({
        startIndex: 0,
        limit: 100,
        sortBy: 'CIK',
        order: 'ASC'
      }).then(bulkEntityResponse => {
        console.log(bulkEntityResponse);
        setBulkEntities(bulkEntityResponse);
        setLoading(false);
      });
    };

    return (
      <>
      { loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className='main-page'>
          <Header></Header>
          <About></About>
        </div>
      )}
      </>
    )
}
  
export default MainPage