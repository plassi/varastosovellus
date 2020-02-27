import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TarvikeModal from './TarvikeModal'
import TarvikeHaku from './TarvikeHaku'
import TarvikeTable from './TarvikeTable'

class TarvikeView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }


  render() {
    console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated) {
      return (
        <div>
  
        <TarvikeHaku />
        <TarvikeTable />
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