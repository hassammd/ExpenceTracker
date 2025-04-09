import { useState } from "react"

const ExpenceTable = ({ expences }) => {
    console.log('These are expences', expences)
    const [filterItem, setFilterItems] = useState('')


    //filter

    const filterdItems = filterItem === '' || filterItem === 'all' ? expences : expences.filter((item) => item.category.toLowerCase() === filterItem.toLowerCase())
    console.log('filtered itemssssssss', filterdItems)


    //total 
    const sumHandler = filterdItems.reduce((acc, current) => {

        return acc + Number(current.amount)


    }, 0)
    console.log(sumHandler)
    return (

        <>
            <div>

                <h3 className="table_heading">Your Expences</h3>
                <table>
                    <tbody>


                        <tr>

                            <th>Title</th>
                            <th>
                                <select onChange={(e) => setFilterItems(e.target.value)}>

                                    <option hidden value="">Select Category</option>
                                    <option value="all">All</option>
                                    <option value="grocery">Grocery</option>
                                    <option value="education">Education</option>
                                    <option value="bill">Bill</option>


                                </select>
                            </th>
                            <th>Amount</th>
                        </tr>
                        {/* <tr>
                            <td>Milk</td>
                            <td>Grocery</td>
                            <td>100</td>
                        </tr> */}

                        {


                            filterdItems.length > 0 ? (filterdItems.map((items, index) => {
                                return <tr key={index}>
                                    <td>{items.title}</td>
                                    <td>{items.category}</td>
                                    <td>{items.amount}</td>
                                </tr>
                            })) : (<tr><td colSpan={3}>Expence Not Found</td></tr>)
                        }

                        <tr className="total">
                            <td colSpan={2}>Total</td>
                            <td>{sumHandler}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ExpenceTable