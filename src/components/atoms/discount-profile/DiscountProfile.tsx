import { Link } from 'react-router-dom';
import { Discount } from '../../../types/discount.typings';
import DefinitionListItem from '../definition-list-item/DefinitionListItem';
import DiscountSingularData from '../discount-singular-data/discount-singular-data';
import DropdownInformationList from '../dropdown-information-list/DropdownInformationList';
import './DiscountProfile.scss';

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
            <div className='company-information-wrapper'>
                <DiscountSingularData 
                    title='Company Profile'
                    discountData={{
                    discount: discount,
                    discountKeys: [
                        'ceo',
                        'location',
                        'exchange',
                        'industry',
                        'annualDividend',
                        'averageVolume',
                        'ttmInsiderPurchases'
                    ]
                }}/>
            </div>
        </section>
    )
}

export default DiscountProfile;