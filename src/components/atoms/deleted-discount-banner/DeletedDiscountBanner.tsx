import InformationIcon from '../../molecules/information-icon/InformationIcon';
import './DeletedDiscountBanner.scss';

export interface DeletedDiscountBannerProps {
    deletedReasons: string[]
}

function DeletedDiscountBanner({ deletedReasons }: DeletedDiscountBannerProps) {

    return <section className="deleted-discount-banner">
        <span className='warning'>DISQUALIFIED</span>
        <InformationIcon message={
            <ul className='deleted-reasons'>
                { deletedReasons.map(reason => 
                    <li key={reason}>
                        <span>{ reason }</span>
                    </li>
                )}
            </ul>
        }/>
    </section>

}

export default DeletedDiscountBanner;