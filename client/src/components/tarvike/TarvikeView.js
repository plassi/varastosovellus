import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import TarvikeModal from './TarvikeModal'
import TarvikeTable2 from './TarvikeTable2'
import { loadUser } from '../../actions/authActions'
import { getTarvikkeet } from '../../actions/tarvikeActions'

class TarvikeView extends Component {

  constructor(props) {
    super(props)
    this.props.getTarvikkeet()

  }

  static propTypes = {
    loadUser: PropTypes.func,
    tarvike: PropTypes.object,
    getTarvikkeet: PropTypes.func.isRequired
  }

  componentDidUpdate() {
    this.props.loadUser()
  }

  render() {
    return (
      <Col>
        <div>
          <h1>Tarvikkeet</h1>
        </div>
        <TarvikeModal />
        <TarvikeTable2 />
      </Col>
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