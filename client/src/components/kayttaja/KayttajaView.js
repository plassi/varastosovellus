import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import Ryhmataulu from './Ryhmataulu'
import RegisterModal from '../auth/RegisterModal'



class KayttajaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  render() {

    if (this.props.isAuthenticated) {
      return (
        <Col>

          <h1>Käyttäjät</h1>
          <Ryhmataulu />

          <RegisterModal />

        </Col>
        
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
})

export default connect(
  mapStateToProps,
  null
)(KayttajaView)