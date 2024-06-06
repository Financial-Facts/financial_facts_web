import './DropdownInformationList.scss';

export interface DropdownInformationListProps {
    title?: string;
    listItem: JSX.Element
}

function DropdownInformationList({ title, listItem }: DropdownInformationListProps) {

    return (
        <section className='definitions-section'>
            { title && <h3>{ title }</h3> }
            <ul className='definitions-list'>
                { listItem }
            </ul>
        </section>
    )
}

export default DropdownInformationList;