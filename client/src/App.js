import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Alert, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import AppNavbar from './components/AppNavbar'
import LoginForm from './components/auth/LoginForm'
import TarvikeView from './components/tarvike/TarvikeView'
import KayttajaView from './components/kayttaja/KayttajaView'
import OstoslistaView from './components/ostoslista/OstoslistaView'
import { loadUser } from './actions/authActions'
import { clearMessages } from './actions/messageActions'
import { selectOstoslista } from './actions/ostoslistaActions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    ostoslista: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired,
    selectOstoslista: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadUser()
    this.props.clearMessages()

  }

  componentDidUpdate(prevProps) {
    // Jos ostoslistaa ei ole valittu ja ostoslistoja on olemassa, valitaan viimeisin ostoslista

    if (this.props.ostoslista.selected === null && this.props.ostoslista.ostoslistat.length > 0) {
      this.props.selectOstoslista(this.props.ostoslista.ostoslistat[this.props.ostoslista.ostoslistat.length - 1])
    }
  }

  render() {

    const { isAuthenticated, user } = this.props.auth
    // console.log('isAuhenticated', isAuthenticated);

    if (isAuthenticated) {

      return (
        <div className='App'>
          <Router>
            <AppNavbar />
            <Container>
              {this.props.message.msg ? (
                <Col>
                  <Alert color='success'>{this.props.message.msg}</Alert>
                </Col>
              ) : <div className='py-3'></div>}
              {this.props.error.msg ? (
                <Col>
                  <Alert color='danger'>{this.props.error.msg}</Alert>
                </Col>
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
  ostoslista: state.ostoslista,
  message: state.message,
  error: state.error
})

export default connect(
  mapStateToProps,
  { loadUser, clearMessages, selectOstoslista }
)(App)