import React, { Component } from 'react'
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { connect } from 'react-redux'
import { addTarvike } from '../../actions/tarvikeActions'
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

    const newTarvike = {
      nimi: this.state.nimi,
      kategoria: this.state.kategoria,
      kuvaus: this.state.kuvaus,
      maara: this.state.maara,
      maarayksikko: this.state.maarayksikko,
      sijainti: this.state.sijainti,
      avainsanat: this.state.avainsanat,
      kuva: this.state.kuva
    }

    // Add item via addItem action
    this.props.addTarvike(newTarvike)

    // Close modal
    this.toggle()
  };

  render() {

    return (
      <div>
        {this.props.isAuthenticated ? (
          <Col>
            <Button
              id='lisaa-tarvike-button'
              color='dark'
              onClick={this.toggle}
            > Lisää tarvike</Button>
          </Col>
        ) :

          (
            <></>
          )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Lisää tarvike</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='tarvike'>Tarvike</Label>
                <Input
                  id='nimi'
                  type='text'
                  name='nimi'
                  placeholder='Nimi'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id='kategoria'
                  type='text'
                  name='kategoria'
                  placeholder='Kategoria'
                  onChange={this.onChange}
                >
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  id='kuvaus'
                  type='textarea'
                  name='kuvaus'
                  placeholder='Kuvaus'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id='maara'
                  type='number'
                  name='maara'
                  placeholder='Määrä'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id='maarayksikko'
                  type='text'
                  name='maarayksikko'
                  placeholder='Määräyksikkö'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id='sijainti'
                  type='text'
                  name='sijainti'
                  placeholder='Sijainti'
                  onChange={this.onChange}
                />
              </FormGroup>
              
              <Button id='modal-lisaa-tarvike-button' color='dark' style={{ marginTop: '2rem' }} block>
                Lisää tarvike
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
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
  mapStateToProps,
  { addTarvike }
)(TarvikeModal)
