import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css"
import ShipmentsList from './components/ShipmentsList'
import RatesList from './components/RatesList'
import LabelView from './components/LabelView'

const RatesContext = React.createContext()
const LabelContext = React.createContext()

function LabelProvider(props) {
  const [label, setLabel] = React.useState('label')
  const value = [label, setLabel]

  return <LabelContext.Provider value={value} {...props} />
}

function RatesProvider(props) {
  const [rates, setRates] = React.useState('state')

  const value = [rates, setRates]
  return <RatesContext.Provider value={value} {...props} />
}

function App() {
  return (
    <Fragment>
      <main>
      <RatesProvider>
      <LabelProvider>
        <Router>
          <Switch>
            <Route exact path="/rates">
              <RatesList/>
            </Route>
            <Route exact path="/">
              <ShipmentsList/>
            </Route>
            <Route exact path="/guide">
              <LabelView />
            </Route>
            </Switch>
          </Router>
        </LabelProvider>
        </RatesProvider>
      </main>
    </Fragment>
  );
}

export const RatesConsumer = RatesContext;
export const LabelConsumer = LabelContext;
export default App;
