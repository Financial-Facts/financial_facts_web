import DefinitionListItem from '../../atoms/definition-list-item/DefinitionListItem';
import DropdownInformationList from '../../atoms/dropdown-information-list/DropdownInformationList';
import './DefinitionsSection.scss';

function DefinitionsSection() {

    return (
        <DropdownInformationList
            title={'Definitions'}
            listItem={<>
                <DefinitionListItem
                    word={'Facts'}
                    expandedHeight={100}
                    definitionElement={
                        <span> 
                            Raw filings data spanning multiple taxonomies that contains a
                            wide range of valuable financial data for examination and analysis.
                        </span>
                    }/>
                <DefinitionListItem
                    word={'Discounts'}
                    expandedHeight={200}
                    definitionElement={
                        <div className='discounts-definition'>
                            <span className='discounts-description'>
                                A publicly traded company that has historical growth meeting our criteria going back at least 10 
                                years and has been successfully evaluated. Strict minimum financial requirements must be met before 
                                our calculations are performed to assure the the public entity is a viable value investment.
                            </span>
                            <label htmlFor='criteria' className='criteria-list-header'>
                                Following values must be 10% or greater over the past 10 years
                            </label>
                            <ul id='criteria'>
                                <li>Average annual return on invested capital (ROIC)</li>
                                <li>Average annual revenue growth</li>
                                <li>Average annual earnings per share (EPS) growth</li>
                                <li>Average annual equity growth</li>
                                <li>Average annual operating cash flow growth</li>
                            </ul>
                        </div>
                    }/>
            </>}/>
    )
}

export default DefinitionsSection;