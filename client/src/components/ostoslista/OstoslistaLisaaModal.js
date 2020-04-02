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
import PropTypes from 'prop-types'
import '../componentStyles.css'

class TarvikeModal extends Component {
  state = {
    modal: false,
    nimi: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
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

    // Close modal
    this.toggle()
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Col>
            <Button
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
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='ostoslista'>Ostoslista</Label>
                <Input
                  type='text'
                  name='nimi'
                  placeholder='Nimi'
                  onChange={this.onChange}
                />
              </FormGroup>

              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Lisää ostoslista
              </Button>

            </Form>
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
  { addOstoslista }
)(TarvikeModal)
