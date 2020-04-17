import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './auth/Logout'


class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <Fragment>
        <NavItem>

          <Link className='nav-link' to="/tarvikkeet">Tarvikkeet</Link>

        </NavItem>
        <NavItem>

          <Link className='nav-link' to="/ostoslistat" style={{ marginRight: '3vw' }}>Ostoslistat</Link>

        </NavItem>
        {/* <NavItem>
          <NavLink href="loki" style={{ marginRight:'3vw' }}>Loki</NavLink>
        </NavItem> */}

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret id='valikko-alas'>

            {user ? `Kirjautunut ${user.kayttajatunnus}` : ''}

          </DropdownToggle>
          <DropdownMenu className="asetukset-dropdown">
            <DropdownItem>
              Profiili
            </DropdownItem>
            <Link to="/kayttajat">
              <DropdownItem>
                Käyttäjien hallinta
            </DropdownItem>
            </Link>
            <DropdownItem>
              <Logout />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment >
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
    )

    return (
      <div>
        <Navbar className='navbar' color='dark' dark expand='md'>
          <Container>
            <Link className='navbar-brand' to='/'>Varastosovellus</Link>
            <NavbarToggler onClick={this.toggle} className='ml-auto' />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(
  mapStateToProps,
  null
)(AppNavbar)
