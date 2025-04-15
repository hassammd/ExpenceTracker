const InputField = ({ value, error, name, onChange, className, label }) => {


    return <div>
        <label htmlFor="">{label}</label>
        <input type="text" value={value} name={name} onChange={onChange} />
        <p className={className}>{error}</p>
    </div>
}
export default InputField