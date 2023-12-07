import "./loading-spinner.scss"

function LoadingSpinner() {

    return (
        <section className="loader-wrapper">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    )
  }
  
  export default LoadingSpinner;