import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import AppNavbar from './components/AppNavbar'
import LoginForm from './components/auth/LoginForm'
import TarvikeView from './components/tarvike/TarvikeView'
import KayttajaView from './components/kayttaja/KayttajaView'
import OstoslistaView from './components/ostoslista/OstoslistaView'
import { loadUser } from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.props.loadUser()
  }

  static propTypes = {
    store: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='App'>
        <Provider store={this.props.store}>

          <AppNavbar />
          <Router>
            <Container>
              <Switch>
                <Route path="/tarvikkeet" >
                  {localStorage.getItem('token') ? <TarvikeView /> : <Redirect to="/" />}
                </Route>
                <Route path="/ostoslistat" >
                  {localStorage.getItem('token') ? <OstoslistaView /> : <Redirect to="/" />}
                </Route>
                <Route path="/kayttajat" >
                  {localStorage.getItem('token') ? <KayttajaView /> : <Redirect to="/" />}
                </Route>

                <Route path="/">
                  {localStorage.getItem('token') ? <Redirect to="/tarvikkeet" /> : <LoginForm />}
                </Route>
              </Switch>
            </Container>
          </Router>
        </Provider>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loadUser }
)(App)