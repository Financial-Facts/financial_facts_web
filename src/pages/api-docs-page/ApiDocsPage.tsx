import SwaggerUI from 'swagger-ui-react';
import { environment } from '../../environment';
import "swagger-ui-react/swagger-ui.css";
import './ApiDocsPage.scss';
import PageLayout from '../../components/PageLayout/page-layout';
import Header from '../../sections/header/Header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { useEffect } from 'react';
import { setActivePage } from '../../state/page/page.slice';

function ApiDocsPage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setActivePage('API Docs'));
    }, []);

    return (
        <PageLayout sections={[
            <Header key={'api-docs-header'} text='API Documentation' subtext='API endpoints that make our mission possible'/>,
            <div className='swagger-container' key={'api-docs-body'}>
                <SwaggerUI url={`${environment.ffsRestUrl}/api-docs.yaml`}/>
            </div>
        ]}/>
    )
}
  
export default ApiDocsPage;