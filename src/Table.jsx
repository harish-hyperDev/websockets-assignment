import React from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import './index.css'

const Table = () => {

  const WS_URL = "wss://production-esocket.delta.exchange"

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("Web Socket Established")
    },
    

  })

  return (
    <table>
      <th>Symbol</th>
      <th>Description</th>
      <th>Underlying Asset</th>
      <th>Mark Price</th>
    </table>
  )
}

export default Table