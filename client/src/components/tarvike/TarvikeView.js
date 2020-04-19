import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
//import TarvikeModal from './TarvikeModal'
import TarvikeTable2 from './TarvikeTable2'
import { loadUser } from '../../actions/authActions'
import { getTarvikkeet } from '../../actions/tarvikeActions'
import { getOstoslistat } from '../../actions/ostoslistaActions'
import { returnMessages } from '../../actions/messageActions'

class TarvikeView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loadUser: PropTypes.func,
    tarvike: PropTypes.object,
    getTarvikkeet: PropTypes.func.isRequired,
    getOstoslistat: PropTypes.func.isRequired,
    returnMessages: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log('tarvikeView didMount')
    this.props.loadUser()
    this.props.returnMessages()
    this.props.getTarvikkeet()
    this.props.getOstoslistat()
  }

  render() {

    return (
      <Col>
        
        <div style={{marginTop: '30px', marginBottom: '30px', textAlign: 'center'}}>
          <h1>Tarvikkeet</h1>
        </div>
      
        <TarvikeTable2 />
      </Col>
    )

  }
}

const mapStateToProps = state => ({
  tarvike: state.tarvike,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { getTarvikkeet, getOstoslistat, loadUser, returnMessages }
)(TarvikeView)