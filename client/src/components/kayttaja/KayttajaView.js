import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class KayttajaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  render() {
    
    if (this.props.isAuthenticated) {
      return (
        <div>
          {/* Tänne tulee kirjautuneelle käyttäjälle rendattava sisältö */}
          <h1>Käyttäjät</h1>
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