import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import AppNavbar from './components/AppNavbar'
import Sidebar from './components/Sidebar'
import TarvikeView from './components/tarvike/TarvikeView'
import KayttajaView from './components/kayttaja/KayttajaView'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
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
