import '../App.css'
import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import {RatesConsumer, LabelConsumer} from '../App'
import { client } from '../utils/api-client'

function RatesList() {
  const [rates] = React.useContext(RatesConsumer)
  const [, setLabel] = React.useContext(LabelConsumer)
  const [queried, setQueried] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)
  const isLoading = status === 'loading'
  const isError = status === 'error'

  let history = useHistory()
 
  React.useEffect(() => {
    const payload = {
      rate_id: parseInt(selected),
      label_format: 'pdf'
    }
    if (!queried) {
      return
    }
    setStatus('loading')
    client('POST', 'labels', JSON.stringify(payload))
    .then((responseData) => {
      setLabel(responseData)
      setStatus('success')
      setQueried(false)
      history.push('/guide')
    }, errorData => {
      setError(errorData)
      setStatus('error')
      setQueried(false)
    })
  }, [history, queried, selected, setLabel])

  function handleClick(event) {
    event.preventDefault()
    const currentNode = event.target.parentElement
    setSelected(currentNode.id)
    switch (currentNode.className) {
      case 'clicked':
        currentNode.className = ''
        break;
      case '':
        currentNode.className = 'clicked'
        break;
      default:
        currentNode.className = ''
    }
  }

  function handleSubmit() {
    setQueried(true)
  }

  function renderDataTable() {
    if (!rates.included) {
      return (
        <button>
        <Link style={{color: "white"}} to="/">
          Go back
        </Link>
      </button>
      )
    }
    const filteredRates = rates.included.filter(data => data.type.includes('rates'))
    return filteredRates.map((included) => {
      return (
        <tr key={included.id} id={included.id} onClick={handleClick} >
          <td>${included.attributes.amount_local}{included.attributes.currency_local}</td>
          <td>{included.attributes.provider}</td>
          <td>{included.attributes.service_level_name}</td>
          <td>{included.attributes.days}</td>
          <td>${included.attributes.total_pricing}{included.attributes.currency_local}</td>
        </tr>
      )
    })
  }

  return (
    <div className="data-box" >
      <h2>Shipping Options</h2>
      <hr></hr>
      <table id='rates' className="data-table">
        <tbody>
          <tr>
            <th>Rate</th>
            <th>Provider</th>
            <th>Service</th>
            <th>Shipping Days</th>
            <th>Total Cost</th>
          </tr>
          {renderDataTable()}
        </tbody>
      </table>
      <button onClick={handleSubmit} type='submit' disabled={isLoading}>
        {isLoading ? 'Loading Request' : 'Submit Selected'}
      </button>
      {isError ? (
        <div style={{color: "red"}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </div>
  )
}

export default RatesList