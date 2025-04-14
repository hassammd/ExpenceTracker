import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ExpenseHeader = () => {
    return (

        <>
            <div className='expense_headder'>

                <span></span>
                <h2 >Expence Tracker</h2>
                <span><FontAwesomeIcon icon={faFileArrowDown} className="csv_download_btn" /></span>

            </div>
        </>
    )
}
export default ExpenseHeader