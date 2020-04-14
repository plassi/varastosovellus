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
import PropTypes from 'prop-types'
import '../componentStyles.css'
import { TiShoppingCart } from 'react-icons/ti'
import { updateOstoslista, selectOstoslista } from '../../actions/ostoslistaActions'
import { returnErrors, clearErrors } from '../../actions/errorActions'

class LisaaOstosModal extends Component {
  state = {
    modal: false,
    ostoslista: this.props.ostoslista.selected,
    tarvike: this.props.row,
    maara: 1
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    ostoslista: PropTypes.object.isRequired,
    selectOstoslista: PropTypes.func.isRequired,
    updateOstoslista: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log(this.state)

  }

  toggle = () => {
    if (this.props.ostoslista.ostoslistat.length === 0) {
      this.props.returnErrors('Ostoslistaa ei ole vielä luotu. Luo uusi ostoslista Ostoslistat näkymästä.')
      setTimeout(() => {
        this.props.clearErrors()
      }, 7000)
    } else {

      this.setState({
        modal: !this.state.modal
      })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log('LisaaOstosModal state:', this.state);
  }

  onSubmit = e => {
    e.preventDefault()
    console.log(this.state)

    const vanhaOstoslista = this.props.ostoslista.ostoslistat.find(ostoslista => ostoslista.id === this.state.ostoslista.id)

    const newOstoslista = {
      id: this.state.ostoslista.id,
      tarvikkeet: [...vanhaOstoslista.tarvikkeet,
      { id: this.state.tarvike.id, maara: this.state.maara }]
    }

    // Add item via addItem action
    this.props.updateOstoslista(newOstoslista)

    // Close modal
    this.toggle()

  }

  valitseOstoslista(e) {
    console.log(e.target.value)

    e.preventDefault()
    this.props.selectOstoslista(this.props.ostoslista.ostoslistat.find(ostoslista => ostoslista.id === e.target.value))
    this.setState({ ostoslista: this.props.ostoslista.selected })
  }


  render() {
    const allOstoslistaRows = this.props.ostoslista.ostoslistat.map(ostoslista => {
      return (
        <option key={'row-data-' + ostoslista.id} value={ostoslista.id}>{ostoslista.nimi}</option>
      )
    })


    return (
      <div>
        {this.props.isAuthenticated ? (

          <Button id='tarvike-lisaa-ostoslistalle-button' color='dark' onClick={this.toggle}>
            <TiShoppingCart />
          </Button>

        ) :

          (
            <></>
          )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Lisää ostoslistalle</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleSelect"><h6>Valitse lista</h6></Label>
                <Input type="select" name="select" defaultValue={this.state.ostoslista ? this.state.ostoslista.id : null} onChange={(e) => this.valitseOstoslista(e)}>
                  {allOstoslistaRows}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='tarvike'><h6>Tarvike: </h6></Label><br />
                <Label>
                  {this.props.row.nimi}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for='tarvike'><h6>Määrä varastossa: </h6></Label><br />
                <Label>
                  {this.props.row.maara} {this.props.row.maarayksikko}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for='tarvike'><h6>Määrä ostoslistalle: </h6></Label><br />
                <Input
                  type='number'
                  name='maara'
                  defaultValue='1'
                  placeholder='Lisättävä määrä'
                  onChange={this.onChange}
                  style={{ weight: '50px' }}
                />
              </FormGroup>
              <Button id='lisaa-ostoslistalle-modal-button' color='dark' style={{ marginTop: '2rem' }} block>
                Lisää
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
  ostoslista: state.ostoslista,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { updateOstoslista, selectOstoslista, returnErrors, clearErrors }
)(LisaaOstosModal)
