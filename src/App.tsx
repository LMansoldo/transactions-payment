import { useState } from "react"
import './App.css'

type Transaction = {
  amount: number,
  id: string,
  date: string
}

const transactions: Transaction[] = [
  { id: 'isd943578', amount: 500, date: '2024-01-01' },
  { id: 'isd943643', amount: 1000, date: '2024-01-01' },
  { id: 'isd943456', amount: 1500, date: '2024-01-01' },
  { id: 'isd943145', amount: 500, date: '2024-01-01' },
]

function App() {
  const [loadedTransactions, setLoadedTransactions] = useState<Transaction[]>(transactions)
  const [dateFilter, setDateFilter] = useState({ start: '01-01-2000', end: '12-31-2024'})

  const FilterByDate = () => {

    function handleSubmit(event: HTMLFormElement) {
      event.preventDefault()

      const formData = new FormData(event.target)
      const start = formData.get('start-date') ?? "01-01-2000" as string
      const end = formData.get('end-date') ?? "12-31-2024" as string

      setDateFilter({ start, end })
    } 

    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="date" name="start-date" />
        <input type="date" name="end-date" />
        <button type="submit"> Filter by Date</button>
        <button onClick={() => console.log('clear')}> Clear Date</button>
      </form>
    )
  }

  const AddTransaction = () => {
    function handleSubmit(event: HTMLFormElement) {
      event.preventDefault()

      const formData = new FormData(event.target)
      const amount = formData.get('amount') as string
      const date = '2024-12-31'

      setLoadedTransactions((loadedTransactions) => [...loadedTransactions, { id: "isd943643", amount: amount, date: date }])

    }

    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="number" name="amount" placeholder="amount"/>
        <button type="submit"> Add Transactions </button>
      </form>
    )
  }

  const ListTransactions = () => {
    return loadedTransactions.map(({ amount, id, date }, index) => {

      return (
        <div key={index}>
          <h3>Transaction ID: {id}</h3>
          <p>Amount: {amount}</p>
          <p>Date: {date}</p>
        </div>
      )
    })
  }

  return (
    <>
      {FilterByDate()}
      {AddTransaction()}
      {ListTransactions()}
    </>
  )
}

export default App
