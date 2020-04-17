import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap'
import { connect } from 'react-redux'
import { addOstoslista } from '../../actions/ostoslistaActions'
import { returnMessages, clearMessages } from '../../actions/messageActions'
import PropTypes from 'prop-types'
import '../componentStyles.css'
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';

class TarvikeModal extends Component {
  state = {
    modal: false,
    nimi: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    returnMessages: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const newOstoslista = {
      nimi: this.state.nimi
    }

    // Add item via addItem action
    this.props.addOstoslista(newOstoslista)

    this.props.returnMessages(`ostoslista ${newOstoslista.nimi} lisätty ja avattu`)
    setTimeout(() => this.props.clearMessages(), 7000)

    // Close modal
    this.toggle()
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Col>
            <Button
              id='ostoslista-lisaa-button'
              color='dark'
              style={{ marginBottom: '2rem' }}
              onClick={this.toggle}
            > Lisää ostoslista</Button>
          </Col>
        ) :

          (
            <></>
          )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Lisää ostoslista</ModalHeader>
          <ModalBody>
          <AvForm onSubmit={this.onSubmit}>
              <AvGroup>
                <AvInput
                  id='nimi'
                  type='text'
                  name='nimi'
                  placeholder='Nimi'
                  onChange={this.onChange}
                  required
                />
                <AvFeedback>Syötä nimi</AvFeedback>
              </AvGroup>
              <Button id='lisaa-ostoslista-modal-button' color='dark' style={{ marginTop: '2rem' }} block>
                Lisää ostoslista
              </Button>
              </AvForm>
          
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { addOstoslista, returnMessages, clearMessages }
)(TarvikeModal)
