import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TarvikeLista from './components/TarvikeLista'
import TarvikeModal from './components/TarvikeModal'
import { Container } from 'reactstrap';
<<<<<<< HEAD
//import Sidebar from './components/Sidebar';
=======


>>>>>>> 27eee5a32935599d8ec7c750d7fe0c91a80cd67c
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
