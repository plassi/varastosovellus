import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Container, Alert } from 'reactstrap'
import PropTypes from 'prop-types'
import AppNavbar from './components/AppNavbar'
import LoginForm from './components/auth/LoginForm'
import TarvikeView from './components/tarvike/TarvikeView'
import KayttajaView from './components/kayttaja/KayttajaView'
import OstoslistaView from './components/ostoslista/OstoslistaView'
import { loadUser } from './actions/authActions'
import { clearMessages } from './actions/messageActions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {

  state = {
    msg: null
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadUser()
    this.props.clearMessages()
  }

  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      if (this.props !== this.prevProps) {
        this.setState({ msg: this.props.message })
      }
    }
  }

  render() {
    // Sijoitetaan ilmoitus stateen, mikäli ilmoitus löytyy storesta

    console.log(this.state);
    const { isAuthenticated, user } = this.props.auth
    // console.log('isAuhenticated', isAuthenticated);

    if (isAuthenticated) {

      return (
        <div className='App'>
          <Router>
            <AppNavbar />
            <Container>
              {this.state.msg ? (
                <Alert color='success'>{this.state.msg}</Alert>
              ) : null}
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
  auth: state.auth,
  message: state.message.msg
})

export default connect(
  mapStateToProps,
  { loadUser, clearMessages }
)(App)