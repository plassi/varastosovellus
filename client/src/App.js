import React, { Component } from 'react';
import LoginForm from './components/auth/LoginForm'
import AppNavbar from './components/AppNavbar';
import Sidebar from './components/Sidebar'
import TarvikeView from './components/tarvike/TarvikeView'
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {

    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Sidebar />
          <Container>
            <TarvikeView />
            <LoginForm />
          </Container>
        </div>
      </Provider>
    )
  }
}


export default App;
