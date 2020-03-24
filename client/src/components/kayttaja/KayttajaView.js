import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Ryhmataulu from '../ryhma/Ryhmataulu'
import RegisterModal from '../auth/RegisterModal'
import { NavItem } from 'reactstrap'


class KayttajaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  render() {
    
    if (this.props.isAuthenticated) {
      return (
        <div>
          {}
          
          <Ryhmataulu/>
          
          <RegisterModal/>
          
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(KayttajaView);