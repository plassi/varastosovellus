import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import AppNavbar from './components/AppNavbar'
import TarvikeView from './components/tarvike/TarvikeView'
import KayttajaView from './components/kayttaja/KayttajaView'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'
import { getTarvikkeet } from './actions/tarvikeActions'
import { getOstoslistat } from './actions/ostoslistaActions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import OstoslistaView from './components/ostoslista/OstoslistaView'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
    store.dispatch(getTarvikkeet())
    store.dispatch(getOstoslistat())
    // Logataan konsoliin jokainen redux-storen tilanmuutos
    store.subscribe(() => console.log(store.getState()))
  }


  render() {

    return (
      <div className='App'>
        <Provider store={store}>
          <Router>
            <AppNavbar />
            <Container>
              <LoginForm />
              <Switch>
                <Route path="/varasto">
                  <TarvikeView />
                </Route>
                <Route path="/ostoslista">
                  <OstoslistaView />
                </Route>
                <Route path="/kayttajat">
                  <KayttajaView />
                </Route>
              </Switch>
            </Container>
          </Router>
        </Provider>
      </div>
    )
  }
}


export default App
