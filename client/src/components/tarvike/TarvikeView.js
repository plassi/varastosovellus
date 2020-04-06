import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TarvikeModal from './TarvikeModal'
import TarvikeTable2 from './TarvikeTable2'
import { loadUser } from '../../actions/authActions'
import { getTarvikkeet } from '../../actions/tarvikeActions'

class TarvikeView extends Component {

  constructor(props) {
    super(props)
    this.props.loadUser()
    this.props.getTarvikkeet()
    
  }

  static propTypes = {
    loadUser: PropTypes.func,
    tarvike: PropTypes.object,
    getTarvikkeet: PropTypes.func.isRequired
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div>
        <TarvikeModal />
        <TarvikeTable2 />
      </div>
    )

  }
}

const mapStateToProps = state => ({
  tarvike: state.tarvike,
})

export default connect(
  mapStateToProps,
  { getTarvikkeet, loadUser }
)(TarvikeView)