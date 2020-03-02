import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Sidebar from './components/Sidebar';
import TarvikeModal from './components/TarvikeModal';
import TarvikeHaku from './components/TarvikeHaku';
import TarvikeTable from './components/TarvikeTable';
import { Container } from 'reactstrap';
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
          <Sidebar />       
          <Container>          
            <TarvikeHaku />
            <TarvikeTable />
            <TarvikeModal />
          </Container>
        </div>
      </Provider>
    );
  }
}


export default App;
