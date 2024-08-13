import { Link } from 'react-router-dom';
import { Discount } from '../../../types/discount.typings';
import DefinitionListItem from '../../atoms/definition-list-item/DefinitionListItem';
import SingularDataList from '../../atoms/singular-data-list/SingularDataList';
import DropdownInformationList from '../../atoms/dropdown-information-list/DropdownInformationList';
import './DiscountProfile.scss';
import FormatService from '../../../services/format/format.service';
import DiscountQualifiers from '../discount-qualifiers/DiscountQualifiers';

export interface DiscountProfileProps {
    discount: Discount
}

function DiscountProfile({ discount }: DiscountProfileProps) {
    
    return (
        <section className='discount-profile-section'>
            <DropdownInformationList
                listItem={<>
                    <DefinitionListItem
                        word={discount.name}
                        expandedHeight={100}
                        definitionElement={
                            <div className='description-container'>
                                <p className='discount-description'>{ discount.description }</p>
                                <span>Read more: <Link to={discount.website} target="_blank">{discount.website}</Link></span>
                            </div>
                        }/>
                    </>}/>
            <div className='discount-overall-details'>
                <div className='company-information-wrapper'>
                    <SingularDataList 
                        title='Company Profile'
                        singularData={{
                            ceo: discount.ceo,
                            location: discount.location,
                            exchange: discount.exchange,
                            industry: discount.industry,
                            annualDividend: FormatService.formatToDollarValue(discount.annualDividend),
                            averageVolume: String(discount.averageVolume),
                            ttmInsiderPurchases: String(discount.ttmInsiderPurchases)
                        }
                    }/>
                </div>
                <DiscountQualifiers qualifiers={discount.qualifiers}/>
            </div>
        </section>
    )
}

export default DiscountProfile;