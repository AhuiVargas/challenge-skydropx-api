import '../App.css'
import React from 'react'
import { client } from '../utils/api-client'

function AllShipments() {
  const [shipments, setShipments] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)
  const isError = status === 'error'


  React.useEffect(() => {
    if (shipments) {
      return
    }
    setStatus('loading')
    client('GET', 'shipments')
    .then((responseData) => {
      setShipments(responseData)
      setStatus('success')
    }, errorData => {
      setError(errorData)
      setStatus('error')
    })
  }, [shipments])

  function renderData() {
    if(!shipments) {
      return
    }
    return shipments.map((data) => {
      return (
        <div>
          {data}
        </div>
      )
    })
  }

  return(
    <div>
      {renderData()}

      {isError ? (
        <div style={{color: "red"}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </div>
  )

}

export default AllShipments