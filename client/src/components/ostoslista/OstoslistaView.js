import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Ostoslista from './Ostoslista'


class OstoslistaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }


  render() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <Ostoslista />

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
  tarvike: state.tarvike,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(OstoslistaView);