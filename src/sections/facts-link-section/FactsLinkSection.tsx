import './FactsLinkSection.scss'

function FactsLinkSection() {

    return (
      <section className='facts-link-section'>
        <h2>Facts</h2>
        <h3>Looking for info on a specific company?</h3>
        <div className='search-navigation-button-wrapper'>
            <button className='search-navigation-button'>
                Search
                <img src='/assets/icons/magnifying-glass.svg'></img>
            </button>
        </div>
        <div role='img' className='company-icon-list-box'/>
      </section>
    )
}
  
export default FactsLinkSection;