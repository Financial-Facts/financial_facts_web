import './StickyMenu.scss';
import ExpandableMenu from '../expandable-menu/expandable-menu';
import ExpandableSearch from '../expandable-search/expandable-search';

function StickyMenu() {


    return (
        <section className='sticky-menu'>
            <ExpandableSearch></ExpandableSearch>
            <ExpandableMenu></ExpandableMenu>
        </section>
    )
  }
  
  export default StickyMenu;