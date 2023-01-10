import './index.css'
import TableData from './TableData'

function App() {
  return (
    <div className="App">
      <table>
        <tr className>
          <th>#</th>
          <th>Symbol</th>
          <th>Description</th>
          <th>Underlying Asset</th>
          <th>Mark Price</th>
        </tr>

        <TableData />
      </table>
      
    </div>
  )
}

export default App
