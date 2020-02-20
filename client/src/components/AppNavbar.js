import React, { Component, Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
  Container,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import Sidebar from './Sidebar';


class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
        <span className='navbar-text mr-3'>
            <strong>{user ? `Tervetuloa ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
       <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Asetukset
              </DropdownToggle>
              <DropdownMenu className="asetukset-dropdown">
                <DropdownItem  >
                  Omat tiedot
                </DropdownItem>
                <DropdownItem>
                  Sivu
                </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
</Fragment>
    );
    
    
    
   
    

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
   

    return (
      <div>
        <Navbar className='navbar' color='dark' dark expand='sm'>
          <Container>
            <NavbarBrand href='/'>Varastosovellus</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Sidebar />
      </div>
    );
  }
  
}

    


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  null
)(AppNavbar);



