import React, { useState } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/nav/nav'
import ExpandShrink from './components/expand-shrink/expand-shrink'
import InputLikeField from './components/input-like-field/input-like-field'
import CreditCardFormat from './components/credit-card-format/credit-card-format'
import PhoneFormat from './components/phone-format/phone-format'
import PasswordFormat from './components/password-format/password-format'
import MockupServer from './components/mockup-server/mockup-server'
import Footer from './components/footer/footer'
import FocusByIcon from './components/focus-by-icon/focus-by-icon'
import CustomFormat from './components/custom-format/custom-format'

function App() {
  const [state, setState] = useState('')
  const [serverState, setServerState] = useState('')
  return (
    <HashRouter>
      <div className='top-panel'>
        <Nav />
        <MockupServer serverState={serverState} setState={setState} />
      </div>
      <div className='examples'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <ExpandShrink serverState={state} updateServer={setServerState} />
            )}
          />
          <Route
            path='/expand-shrink'
            render={() => (
              <ExpandShrink serverState={state} updateServer={setServerState} />
            )}
          />
          <Route
            path='/input-like-field'
            render={() => (
              <InputLikeField
                serverState={state}
                updateServer={setServerState}
              />
            )}
          />
          <Route
            path='/credit-card-format'
            render={() => (
              <CreditCardFormat
                serverState={state}
                updateServer={setServerState}
              />
            )}
          />
          <Route
            path='/phone-format'
            render={() => (
              <PhoneFormat serverState={state} updateServer={setServerState} />
            )}
          />
          <Route
            path='/password-format'
            render={() => (
              <PasswordFormat
                serverState={state}
                updateServer={setServerState}
              />
            )}
          />
          <Route
            path='/focus-by-icon'
            render={() => (
              <FocusByIcon serverState={state} updateServer={setServerState} />
            )}
          />
          <Route
            path='/custom-format'
            render={() => (
              <CustomFormat serverState={state} updateServer={setServerState} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
