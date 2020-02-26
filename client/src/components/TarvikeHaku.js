import React, { Component } from 'react'
import { Input, Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class TarvikeHaku extends Component {
  state = {
    haku: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      
        <Col xs="3">
          <Input
            className="haku col-sm"
            onChange={this.onChange}
            type="text"
            name='haku'
            placeholder="Hae tarvike"
            aria-label="Search" />
        </Col>

    

    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(TarvikeHaku);