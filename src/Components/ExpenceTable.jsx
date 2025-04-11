import { useState } from "react"

const ExpenceTable = ({ expences, setEditExpence, editExpence }) => {
    console.log('These are expences', expences)
    const [filterItem, setFilterItems] = useState('')
    const [updatedExpences, setUpdatedExpence] = useState(expences)
    console.log('updated', editExpence)


    const EditHandler = (items) => {
        setEditExpence(items)
    }


    //filter
    const filterdItems = filterItem === '' || filterItem === 'all' ? updatedExpences : updatedExpences.filter((item) => item.category.toLowerCase() === filterItem.toLowerCase())



    //total 
    const sumHandler = filterdItems.reduce((acc, current) => {

        return acc + Number(current.amount)


    }, 0)



    //Delete Recode
    const deleteHandler = (id) => {

        const newlist = updatedExpences.filter((items) => items.id !== id)
        setUpdatedExpence(newlist)
    }

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
                            <th>Delete</th>
                        </tr>
                        {/* <tr>
                            <td>Milk</td>
                            <td>Grocery</td>
                            <td>100</td>
                        </tr> */}

                        {


                            expences.length > 0 ? (expences.map((items, index) => {
                                return <tr key={index}>
                                    <td>{items.title}</td>
                                    <td>{items.category}</td>
                                    <td>{items.amount}</td>
                                    <td><button className="delete_button" onClick={() => deleteHandler(items.id)}>Delete</button></td>
                                    <td><button className="edit_button" onClick={() => EditHandler(items)}>Edit</button></td>
                                </tr>
                            })) : (<tr><td colSpan={4}>Expence Not Found</td></tr>)
                        }

                        <tr className="total">
                            <td colSpan={2}>Total</td>
                            <td colSpan={2}>{sumHandler}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ExpenceTable