const SelectField = ({ onChange, error, name, value, label, options, defaultOption }) => {

    // console.log('these aadfa', options)

    console.log()
    return (
        <div>
            <label htmlFor="">{label}</label>
            <select name={name} id="" value={value} onChange={onChange}>
                {
                    defaultOption && (<option hidden>{defaultOption}</option>)

                }
                {
                    options.map((items, index) => {
                        return <option key={index}>{items}</option>
                    })
                }

            </select>
            <p className="error">{error}</p>
        </div>

    )
}

export default SelectField