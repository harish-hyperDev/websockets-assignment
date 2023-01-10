import React, { useState, useEffect } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import websocket from 'websocket'
import axios from 'axios'
import './index.css'

const TableData = () => {

  const WS_URL = "wss://production-esocket.delta.exchange"
  const ws = new websocket.w3cwebsocket(WS_URL)

  const [wsData, setWsData] = useState()
  const [apiData, setApiData] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    axios.get('https://api.delta.exchange/v2/products')
      .then((res) => {
        setApiData(res.data.result)
      })
    isLoading(false)
  }, [])

  ws.onopen = () => {
    const msg = {
      type: 'subscribe',
      "payload": {
        "channels": [
          {
            "name": "v2/ticker",
            "symbols": [
              "BTCUSD", "BTCUSDT"
             ]
          
          }
        ]
      },
    };

    ws.send(JSON.stringify(msg))
  }

  ws.onmessage = (event) => {
    console.log(JSON.parse(event.data))
    if(JSON.parse(event.data)["mark_price"]) {
      setWsData(JSON.parse(event.data))
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return(     
      apiData.map((data, index) => {
        return (
          <tr>
            <td style={{ fontWeight: "bold" }}>{index}</td>
            <td>{data["symbol"]}</td>
            <td>{data["description"]}</td>
            <td>{data["underlying_asset"]["symbol"]}</td>
            { wsData && <td>{wsData.mark_price}</td> }
          </tr>
        )
      })
    
    
  )
}

export default TableData