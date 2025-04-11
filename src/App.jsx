import { useState } from 'react'
import './App.css'
import ExpenceForm from './Components/ExpenceForm'
import ExpenceTable from './Components/ExpenceTable'
import { ExpenceData } from './Components/ExpenceData'

function App() {

  const [expences, setExpences] = useState(ExpenceData)
  const [editExpence, setEditExpence] = useState()

  console.log(expences)
  return (
    <>
      <h2>Expence Tracker</h2>
      <div className='main'>
        <ExpenceForm editExpence={editExpence} expences={expences} setExpences={setExpences} />
        <ExpenceTable editExpence={editExpence} setEditExpence={setEditExpence} expences={expences} />
      </div>

    </>
  )
}

export default App
