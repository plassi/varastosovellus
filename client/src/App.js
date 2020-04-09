import React, { Component } from 'react'
import { connect } from 'react-redux'
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

  static propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log(this.props);
    
    this.props.loadUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    console.log(isAuthenticated);

    if (isAuthenticated) {
      return (
        <div className='App'>
          <Router>
            <AppNavbar />
            <Container>
              <Switch>
                <Route path="/tarvikkeet" >
                  <TarvikeView />
                </Route>
                <Route path="/ostoslistat" >
                  <OstoslistaView />
                </Route>
                <Route path="/kayttajat" >
                  <KayttajaView />
                </Route>
                <Route path="/">
                  <TarvikeView />
                </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      )
    } else {
      return (
        <div className='App'>
          <Router>
            <AppNavbar />
            <Container>
              <Switch>
                <Route path="/">
                  <LoginForm />
                </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      )
    }
    

  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loadUser }
)(App)