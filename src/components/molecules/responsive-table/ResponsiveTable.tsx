import './ResponsiveTable.scss';
import ZeroState from '../../atoms/zero-state/ZeroState';

export interface ResponsiveTableProps {
    className: string,
    renderTableHeader: () => JSX.Element,
    renderTableBody: () => JSX.Element,
    zeroStateCondition: boolean,
    wrapperRefSetter: React.MutableRefObject<HTMLDivElement | null>
}

function ResponsiveTable({
    className,
    renderTableHeader,
    renderTableBody,
    zeroStateCondition,
    wrapperRefSetter
}: ResponsiveTableProps) {
    
    return (
        <div className={`responsive-table-wrapper ${className}`} ref={wrapperRefSetter}>  
            <table>
                { renderTableHeader() }
                { !zeroStateCondition && renderTableBody() }
            </table>
            {
                zeroStateCondition &&
                    <ZeroState message={'Please try again'} supportText={'No results match the provided criteria'}/>
            }
        </div>
    )
  }
  
  export default ResponsiveTable;