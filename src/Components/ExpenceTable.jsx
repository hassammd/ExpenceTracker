const ExpenceTable = ({ expences }) => {
    return (

        <>
            <div>

                <h3 className="table_heading">your Expences</h3>
                <table>
                    <tbody>


                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>Milk</td>
                            <td>Grocery</td>
                            <td>100</td>
                        </tr>

                        {

                            expences.map((items, index) => {
                                return <tr key={index}>
                                    <td>{items.title}</td>
                                    <td>{items.category}</td>
                                    <td>{items.amount}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ExpenceTable