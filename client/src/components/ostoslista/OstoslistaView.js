import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OstoslistatTable from './OstoslistatTable'
import OstoslistaTable from './OstoslistaTable'
import { Container, Col } from 'reactstrap'
import OstoslistaLisaaModal from './OstoslistaLisaaModal'
import { getOstoslistat } from '../../actions/ostoslistaActions'



class OstoslistaView extends Component {

  constructor(props) {
    super(props)
    this.props.getOstoslistat()
    
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    ostoslista: PropTypes.object,
    getOstoslistat: PropTypes.func.isRequired
  }


  render() {
    if (this.props.isAuthenticated) {
      return (
        <Col>

          <div>
            <h1>Ostoslistat</h1>
          </div>
          <OstoslistaLisaaModal />
          <OstoslistatTable />
          <OstoslistaTable />

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
  ostoslista: state.ostoslista,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { getOstoslistat }
)(OstoslistaView)