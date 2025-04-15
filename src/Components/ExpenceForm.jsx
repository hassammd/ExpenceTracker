import { useEffect, useState } from "react"
import InputField from "./InputField"
import SelectField from "./SelectField"


const ExpenceForm = ({ expences, setExpences, editExpence, setEditExpence }) => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    // const [myExpences, setMyExpences] = useState(expences)


    console.log('Edit expence from table', editExpence)


    //get Expenses from local storage
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expences'))
        if (storedExpenses) {
            setExpences(storedExpenses)
            console.log('get data from localstorage', storedExpenses)
        }

    }, [])
    //get Expenses from local storage


    // store expenses in local storage
    useEffect(() => {
        localStorage.setItem('expences', JSON.stringify(expences)) //set data in localStorage

    }, [expences])
    // store expenses in local storage




    // ValidationConfig
    const ValidationConfig = {

        title: [{ required: true, message: 'Enter Your Title' }, { minlength: 5, message: 'Title should be at least 5 characters long' }],
        category: [{ required: true, message: 'Please Select Category' }],
        amount: [{ required: true, message: 'Enter Amount' }, { VlidNumber: (value) => !isNaN(value) && Number(value) > 0, message: 'Enter Valid Amount' }],
        email: [{ required: true, message: 'Enter Your Email' }, { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Please Enter Valid Email' }]

    }
    console.log(ValidationConfig)
    // ValidationConfig
    //for edit

    useEffect(() => {
        if (editExpence) {

            const { title, category, email, amount } = editExpence

            setTitle(title)
            setAmount(amount)
            setEmail(email)
            setCategory(category)

        }
    }, [editExpence])



    //for edit









    const submitHandler = (e) => {
        e.preventDefault()
        const error = {}

        const newExpences = { title, category, amount, email, id: editExpence ? editExpence.id : crypto.randomUUID() }
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

            if (editExpence) {
                // Updating expense if editExpence exists
                const updatedExpences = expences.map((item) => item.id === editExpence.id ? newExpences : item)
                console.log('Updated Expense', updatedExpences)
                setExpences(updatedExpences)
                setErrors({})
                setTitle('')
                setCategory('')
                setAmount('')
                setEmail('')
                setEditExpence(null)


            } else {
                setExpences((prev) => [...prev, newExpences])
                setTitle('')
                setCategory('')
                setAmount('')
                setEmail('')
                setErrors({})
            }
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

            <div className="expense_form">


                <form onSubmit={submitHandler}>
                    <h3 className="form_heading">Add Your Expenses</h3>

                    {/* sustom input  */}

                    <InputField value={title} label={'Title'} error={errors.title} name={'title'} onChange={(e) => setTitle(e.target.value)} className={'error'} />
                    <InputField value={email} label={'Email'} error={errors.email} name={'Email'} onChange={(e) => setEmail(e.target.value)} className={'error'} />

                    {/* <div>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
                    <p className="error">{errors.title}</p>
                </div> */}

                    <SelectField
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
                    <InputField label={'Amount'} value={amount} error={errors.amount} name={'amount'} onChange={(e) => setAmount(e.target.value)} className={'error'} />

                    {/* <div>
                    <label htmlFor="">Amount</label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <p className="error">{errors.amount}</p>
                </div> */}
                    <div>

                        {
                            editExpence ? <button>Edit</button> : <button>Add</button>
                        }

                    </div>
                </form>

            </div>


        </>
    )
}

export default ExpenceForm