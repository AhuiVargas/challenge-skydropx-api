import '../App.css'
import React from 'react';
import { useHistory } from 'react-router-dom'
import {client} from '../utils/api-client'
import {RatesConsumer} from '../App'
import { Card, Button, Form } from 'semantic-ui-react'

function ShipmentsList() {
  const [, setRates] = React.useContext(RatesConsumer)
  const [queried, setQueried] = React.useState(false)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const [query, setQuery] = React.useState({
  zipFrom: '',
    zipTo: '',
    contents: '',
    parcels: {
      weight: null,
      height: null,
      width: null,
      length: null
    }
  })

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery({
      ...query,
      zipFrom: event.target.zipFrom.value,
      zipTo: event.target.zipTo.value,
      parcels: {
        weight: event.target.parcels.value,
        height: 20,
        width: 30,
        length: 10
      },
      contents: event.target.contents.value
    })
  }

  React.useEffect(() => {
    const payload = {
      address_from: {
      province: "Ciudad de México",
      city: "Azcapotzalco",
      name: "Jose Fernando",
      zip: query.zipFrom,
      country: "MX",
      address1: "Av. Principal #234",
      company: "skydropx",
      address2: "Centro",
      phone: "5555555555",
      email: "skydropx@email.com"},
      parcels: [{
        weight: query.parcels.weight,
        distance_unit: "CM",
        mass_unit: "KG",
        height: query.parcels.height,
        width: query.parcels.width,
        length: query.parcels.length
      }],
      address_to: {
        province: "Jalisco",
        city: "Guadalajara",
        name: "Jorge Fernández",
        zip: query.zipTo,
        country: "MX",
        address1: " Av. Lázaro Cárdenas #234",
        company: "-",
        address2: "Americana",
        phone: "5555555555",
        email: "ejemplo@skydropx.com",
        reference: "Frente a tienda de abarro",
        contents: query.contents
      }
    }
    if (!queried) {
      return
    }
    setStatus('loading')
    client('POST','shipments', JSON.stringify(payload))
    .then((responseData) => {
      setRates(responseData)
      setStatus('success')
      setQueried(false)
      history.push('/rates')
    }, errorData => {
      setError(errorData)
      setStatus('error')
      setQueried(false)
    })
    
  }, [history, queried, query.contents, query.parcels.height, query.parcels.length, query.parcels.weight, query.parcels.width, query.zipFrom, query.zipTo, setRates])

  return (
    <div className="card-box">
      <Card>
        <Card.Content>
          <h2>Make a new Shipment</h2>
          <Card.Description className="form-box" >
            <Form onSubmit={handleSubmit} > 
              <Form.Field>
                <label>Origin zip code:</label>
                <input id='zipFrom' />
              </Form.Field>
              <Form.Field>
                <label>Destination zip code:</label>
                <input id='zipTo' />
              </Form.Field>
              <Form.Field>
                <label>Package weight in kilos:</label>
                <input id='parcels' />
              </Form.Field>
              <Form.Field>
                <label>Package contents:</label>
                <input id='contents' />
              </Form.Field>
              <Button className="button" type='submit' disabled={isLoading} >
              {isLoading ? 'Loading' : 'Submit'}
              </Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
      

      {isError ? (
        <div style={{color: "red"}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
          <p>Unprocessable request</p>
        </div>
      ) : null}

    </div>
  )
}

export default ShipmentsList;