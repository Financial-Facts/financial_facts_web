import DefinitionListItem from '../definition-list-item/DefinitionListItem';
import './DefinitionsSection.scss';

function DefinitionsSection() {

    return (
        <section className='definitions-section'>
            <h2>Definitions</h2>
            <ul className='definitions-list'>
                <DefinitionListItem
                    word={'Facts'}
                    expandedHeight={105}
                    definitionElement={
                        <span> 
                            Raw filings data spanning multiple taxonomies that contains a
                            wide range of valuable financial data for examination and analysis.
                        </span>
                    }/>
                <DefinitionListItem
                    word={'Discounts'}
                    expandedHeight={250}
                    definitionElement={
                        <div className='discounts-definition'>
                            <span>
                                Companies whose historical growth meets our criteria going back 10 years and have had their 
                                valuations calculated successfully. Strict minimum financial requirements must be met before 
                                our calculations are performed to assure the the public entity is a viable value investment.
                            </span>
                            <span className='criteria-list-header'>Minimum Criteria</span>
                            <ul>
                                <li>10% growth</li>
                            </ul>
                        </div>
                    }/>
            </ul>
        </section>
    )
}

export default DefinitionsSection;