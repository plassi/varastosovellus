import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OstoslistaTable from './OstoslistaTable'
import { Container, Col } from 'reactstrap'


class OstoslistaView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }


  render() {
    if (this.props.isAuthenticated) {
      return (
        <Container>

<Col className='pb-5'>
          <h1>Ostoslista</h1>
          </Col>
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
  tarvike: state.tarvike,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(OstoslistaView);