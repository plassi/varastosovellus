import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'

class KayttajaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  render() {

    if (this.props.isAuthenticated) {
      return (
        <Col>
          {/* Tänne tulee kirjautuneelle käyttäjälle rendattava sisältö */}
          <h1>Käyttäjät</h1>
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