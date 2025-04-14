import { useState } from 'react'
import './App.css'
import ExpenceForm from './Components/ExpenceForm'
import ExpenceTable from './Components/ExpenceTable'
import { ExpenceData } from './Components/ExpenceData'
import ExpenseHeader from './Components/ExpenseHeader'

function App() {

  const [expences, setExpences] = useState(ExpenceData)
  const [editExpence, setEditExpence] = useState()

  console.log(expences)
  return (
    <>
      <ExpenseHeader expences={expences} />
      <div className='main'>
        <ExpenceForm setEditExpence={setEditExpence} editExpence={editExpence} expences={expences} setExpences={setExpences} />
        <ExpenceTable editExpence={editExpence} setEditExpence={setEditExpence} expences={expences} setExpences={setExpences} />
      </div>

    </>
  )
}

export default App
