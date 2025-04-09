import { useState } from "react"
import Input from "./input"
import Select from "./Select"


const ExpenceForm = ({ expences, setExpences }) => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})


    // ValidationConfig
    const ValidationConfig = {

        title: [{ required: true, message: 'Enter Your Title' }, { minlength: 5, message: 'Title should be at least 5 characters long' }],
        category: [{ required: true, message: 'Please Select Category' }],
        amount: [{ required: true, message: 'Enter Amount' }, { VlidNumber: (value) => !isNaN(value) && Number(value) > 0, message: 'Enter Valid number' }],
        email: [{ required: true, message: 'Enter Your Email' }, { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Please Enter Valid Email' }]

    }
    console.log(ValidationConfig)
    // ValidationConfig

    const submitHandler = (e) => {
        e.preventDefault()
        const error = {}

        const newExpences = { title, category, amount, email, id: crypto.randomUUID() }
        Object.entries(newExpences).forEach(([key, value]) => {
            if (ValidationConfig[key]) {

                for (let rule of ValidationConfig[key]) {
                    if (rule.required && !value) {
                        error[key] = rule.message
                        break
                    } if (rule.minlength && value.length < 5) {
                        error[key] = rule.message
                    } if (rule.VlidNumber && !rule.VlidNumber(value)) {
                        error[key] = rule.message
                        break
                    } if (rule.pattern && !rule.pattern.test(value)) {
                        error[key] = rule.message
                    }
                }

            }
        })

        if (Object.entries(error).length > 0) {
            setErrors(error)
            console.log(errors)
        } else {
            setExpences((prev) => [...prev, newExpences])
            setTitle('')
            setCategory('')
            setAmount('')
            setErrors({})
        }
        // if (!newExpences.title) {
        //     error.title = 'Enter Title'
        // }
        // if (!newExpences.category) {
        //     error.category = 'Select Category'
        // } 
        // if (!newExpences.amount || isNaN(newExpences.amount) || newExpences.amount <= 0) {
        //     error.amount = 'Enter Valid Amount'
        // } 
        // if (Object.entries(error).length > 0) {
        //     setErrors(error)
        // } else {
        //     setExpences((prev) => [...prev, newExpences])
        //     setTitle('')
        //     setCategory('')
        //     setAmount('')
        //     setErrors({})

        // }


    }


    return (

        <>
            <h2>Add Your Expences</h2>
            <form onSubmit={submitHandler}>

                {/* sustom input  */}

                <Input value={title} label={'Title'} error={errors.title} name={'title'} onChange={(e) => setTitle(e.target.value)} className={'error'} />
                <Input value={email} label={'Email'} error={errors.email} name={'Email'} onChange={(e) => setEmail(e.target.value)} className={'error'} />

                {/* <div>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
                    <p className="error">{errors.title}</p>
                </div> */}

                <Select
                    label={'Category'}
                    options={['Grocery', 'Education', 'Bill']}
                    defaultOption={'Select Category'}
                    value={category}
                    name={'category'}
                    error={errors.category}
                    onChange={(e) => setCategory(e.target.value)} />



                {/* <div>
                    <label htmlFor="">Category</label>
                    <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option hidden>Select Category</option>
                        <option>Grocery</option>
                        <option>Education</option>
                        <option>Bill</option>
                    </select>
                    <p className="error">{errors.category}</p>
                </div> */}
                <Input label={'Amount'} value={amount} error={errors.amount} name={'amount'} onChange={(e) => setAmount(e.target.value)} className={'error'} />

                {/* <div>
                    <label htmlFor="">Amount</label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <p className="error">{errors.amount}</p>
                </div> */}
                <div>
                    <button>Add</button>
                </div>
            </form>


        </>
    )
}

export default ExpenceForm