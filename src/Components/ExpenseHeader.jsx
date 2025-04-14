import { faDownload, faFileArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageShadow from "./PageShadow"

const ExpenseHeader = ({ expences }) => {

    ///CSV Download
    const CsvDownload = (() => {

        if (expences) {

            const Header = Object.keys(expences[0]).join(',')
            const rows = expences.map((items) => Object.values(items).join(', '))
            const CsvData = `${Header}\n ${rows}`

            const blob = new Blob([CsvData], { type: "text/csv" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = "Expenses.csv"
            console.log(a.download)
            a.click()
            URL.revokeObjectURL()


        }


    })




    return (

        <>
            <div className='expense_headder'>

                <span></span>
                <h2 >Expence Tracker</h2>
                {/* <span ><FontAwesomeIcon icon={faFileArrowDown} className="csv_download_btn" /></span> */}
                <button onClick={CsvDownload}>Download CSV <FontAwesomeIcon icon={faDownload} /></button>

            </div>
            <PageShadow />
        </>
    )
}
export default ExpenseHeader