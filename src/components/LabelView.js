import '../App.css'
import React from 'react'
import {LabelConsumer} from '../App'
import { Link } from 'react-router-dom'

function LabelView() {
  const [label] = React.useContext(LabelConsumer)

  function renderData() {

    if(label.data.attributes.status === 'ERROR') {
      return (
        <div>
          <div style={{color: "red"}}>
            {label.data.attributes.error_message[0].message}
          </div>
          <button>
            <Link style={{color: "white"}} to="/rates">
              Volver a opciones
            </Link>
          </button>
        </div>
      )
    }

    return (
      <div>
        <a href={label.data.attributes.label_url} download><strong>Descarga tu guía de envío</strong></a><br/>
        <hr></hr>
        <strong>Tracking number:</strong>
        <p>{label.data.attributes.tracking_number}</p>
        <strong>Tracking url:</strong>
        <p>{label.data.attributes.tracking_url_provider}</p>
        <strong>Tracking ID:</strong>
        <p>{label.data.attributes.rate_id}</p>
        {/* <object data={label.data.attributes.label_url}
                type="application/pdf"
                style={{width: '100%', height: '60%'}}
        >Guía</object> */}
        <button>
          <Link to="/">
            Crea otro envío
          </Link>
        </button>
      </div>
    )
  }

  return (
    <div className="label-box">
      {renderData()}
    </div>
  )

}

export default LabelView