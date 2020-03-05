import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TarvikeModal from './TarvikeModal'
import TarvikeTable2 from './TarvikeTable2'

class TarvikeView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }


  render() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <TarvikeTable2 />
          <TarvikeModal />
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
)(TarvikeView);