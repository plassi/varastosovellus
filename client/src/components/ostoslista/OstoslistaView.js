import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OstoslistatTable from './OstoslistatTable'
import OstoslistaTable from './OstoslistaTable'
import { Container, Col } from 'reactstrap'
import OstoslistaLisaaModal from './OstoslistaLisaaModal'



class OstoslistaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }


  render() {
    if (this.props.isAuthenticated) {
      return (
        <Container>

          <Col className='pb-5'>
            <h1>Ostoslistat</h1>
          </Col>
          <OstoslistaLisaaModal />
          <OstoslistatTable />
          <OstoslistaTable />

        </Container>
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
  null
)(OstoslistaView)