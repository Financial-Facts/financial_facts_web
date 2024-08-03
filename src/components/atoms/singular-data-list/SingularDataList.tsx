import './SingularDataList.scss';
import { cleanKey } from '../../../utilities';
import InformationIcon from '../../molecules/information-icon/InformationIcon';
import { messaging } from '../../../constants/messaging';

export interface SingularDataListProps {
    title: string
    singularData: Record<string, string>
}

function SingularDataList({ title, singularData }: SingularDataListProps) {

    const renderDataListItem = (
        key: string,
        value: string
    ) => <li className='data-list-item' key={key}>
            <span className='text'>
                { cleanKey(key) }
                { key === 'debtYears' && <InformationIcon message={messaging.debtYears} alignPopup='center'/>}
            </span>
            <span className='text'>
                { value }
            </span>
        </li>;

    const renderDataList = (singularData: Record<string, string>) =>
        Object.keys(singularData).map(key => renderDataListItem(key, singularData[key]))

    return (
        <>
            <h2>{ title }</h2>
            { 
                singularData && 
                    <ul className={`data-list`}>
                        { renderDataList(singularData) }
                    </ul> 

            }
        </>
    )
  }
  
  export default SingularDataList;