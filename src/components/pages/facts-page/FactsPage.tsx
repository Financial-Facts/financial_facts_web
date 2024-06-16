import { useParams } from 'react-router-dom';
import CompanySearchSection from '../../molecules/company-search-section/CompanySearchSection';
import FactsDisplaySection from '../../organisms/facts-display-section/FactsDisplaySection';
import Header from '../../organisms/header/Header';
import PageLayout from '../../templates/page-layout/page-layout';
import { Taxonomy } from '../../../services/facts/facts.typings';

function FactsPage() {

    const { cik, taxonomy, selectedDataKey } = useParams();
    
    const decodedTaxonomy = taxonomy ? decodeURIComponent(taxonomy) : undefined;
    const decodedSelectedDataKey = selectedDataKey ? decodeURIComponent(selectedDataKey) : undefined;
    
    return (
      <PageLayout sections={[
          <Header key={'facts-header'} text="Facts" subtext="Raw data from the latest filings"/>,
          cik ?
              <FactsDisplaySection
                  key={'facts-display-section'}
                  cik={cik}
                  taxonomy={decodedTaxonomy as Taxonomy}
                  selectedDataKey={decodedSelectedDataKey}/> :
              <CompanySearchSection key={'company-search-section'}/>
        ]}/>
    )
}
  
export default FactsPage