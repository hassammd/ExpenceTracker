import { faArrowDown, faArrowUp, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ExpenseTable = ({ expences, setEditExpence, setExpences }) => {
    const [filterItem, setFilterItem] = useState("");
    const [sorting, setSorting] = useState(true)




    //sorting

    const dataSorting = () => {
        const sorted = [...expences].sort((a, b) => {

            if (sorting) {
                return a.amount - b.amount
            } else {
                return b.amount - a.amount
            }

        })
        setExpences(sorted)
        setSorting(!sorting)
    }
    //sorting

    // Handle edit
    const handleEdit = (item) => {
        setEditExpence(item);
    };

    // Handle delete
    const handleDelete = (id) => {
        const updatedList = expences.filter((item) => item.id !== id);
        setExpences(updatedList);
    };

    // Filter logic
    const filteredItems =
        filterItem === "" || filterItem === "all"
            ? expences
            : expences.filter(
                (item) => item.category.toLowerCase() === filterItem.toLowerCase()
            );

    // Total calculation
    const totalAmount = filteredItems.reduce(
        (acc, item) => acc + Number(item.amount),
        0
    );

    return (
        <div className="expense_table">
            <h3 className="table_heading">Your Expenses</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>
                            <select onChange={(e) => setFilterItem(e.target.value)}>
                                <option hidden value="">
                                    Categories
                                </option>
                                <option value="all">All</option>
                                <option value="grocery">Grocery</option>
                                <option value="education">Education</option>
                                <option value="bill">Bill</option>
                            </select>
                        </th>
                        <th>Amount <FontAwesomeIcon onClick={dataSorting} className="sorting_arrow UpSorting_arrow" icon={faArrowUp} /><FontAwesomeIcon onClick={dataSorting} className="sorting_arrow DownSorting_arrow" icon={faArrowDown} /></th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expences.length > 0 ? (
                        expences.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        className="edit_button"
                                        onClick={() => handleEdit(item)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="delete_button"
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>Expense Not Found</td>
                        </tr>
                    )}

                    <tr className="total">
                        <td colSpan={2}>Total</td>
                        <td colSpan={2}>{totalAmount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
