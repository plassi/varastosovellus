import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteTarvike, updateTarvike } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types'
import '../componentStyles.css'
import { FaRegEdit } from 'react-icons/fa'

class TarvikeMuokkaaModal extends Component {
  state = {
    modal: false,

  };

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
      id: this.props.row.id,
      nimi: this.state.nimi,
      kategoria: this.state.kategoria,
      kuvaus: this.state.kuvaus,
      maara: this.state.maara,
      maarayksikko: this.state.maarayksikko,
      sijainti: this.state.sijainti,
      avainsanat: this.state.avainsanat,
      kuva: this.state.kuva
    }

    // Put item via putItem action
    this.props.updateTarvike(newTarvike)

    // Close modal
    this.toggle()
  }

  onDeleteClick = id => {
    this.props.deleteTarvike(id)

    // Close modal
    this.toggle()
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated
          ? (

            <Button id='tarvike-muokkaa-button'color='dark' onClick={this.toggle}>
              <FaRegEdit />
            </Button>

          ) : ( <></> )
        }

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Muokkaa</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='tarvike'>Tarvike</Label>
                <Input
                  type='text'
                  name='nimi'
                  defaultValue={this.props.row.nimi}
                  placeholder='Nimi'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='kategoria'
                  defaultValue={this.props.row.kategoria}
                  placeholder='Kategoria'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='textarea'
                  name='kuvaus'
                  defaultValue={this.props.row.kuvaus}
                  placeholder='Kuvaus'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='number'
                  name='maara'
                  defaultValue={this.props.row.maara}
                  placeholder='määrä'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='maarayksikko'
                  defaultValue={this.props.row.maarayksikko}
                  placeholder='määräyksikkö'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='sijainti'
                  defaultValue={this.props.row.sijainti}
                  placeholder='sijainti'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='file'
                  name='kuva'
                  defaultValue={this.props.row.kuva}
                  placeholder='kuva'
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Tallenna
              </Button>
              <Button
                id='tarvike-poista-button'
                color='danger' block
                onClick={this.onDeleteClick.bind(this, this.props.row.id)}
              >
                Poista tarvike {this.props.row.nimi}
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
  { deleteTarvike, updateTarvike }
)(TarvikeMuokkaaModal)
