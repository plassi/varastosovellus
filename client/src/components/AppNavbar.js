import React, { Component, Fragment } from 'react';
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
  Container,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from './auth/Logout';


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

  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="varasto">Varasto</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="ostoslista">Ostoslista</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="kayttajat">Käyttäjät</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="loki" style={{marginRight:'3vw'}}>Loki</NavLink>
        </NavItem>

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          
              {user ? `Kirjautunut ${user.kayttajatunnus}` : ''}
              
          </DropdownToggle>
          <DropdownMenu className="asetukset-dropdown">
            <DropdownItem>
              Käyttäjäprofiili
                </DropdownItem>
            <DropdownItem>
              <Logout />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    )

    const guestLinks = (
      // <Fragment>
      //   <NavItem>
      //     <RegisterModal />
      //   </NavItem>
      //   <NavItem>
      //     
      //   </NavItem>
      // </Fragment>
      <></>
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



