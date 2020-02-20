import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TarvikeLista from './components/TarvikeLista'
import TarvikeModal from './components/TarvikeModal'
import { Container } from 'reactstrap';
//import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

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
          
          <Container>
            <TarvikeModal />
            <TarvikeLista />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
