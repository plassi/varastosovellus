import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
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
import { returnMessages, clearMessages } from '../../actions/messageActions'
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation'
import ostoslistanJarjestaja from './ostoslistanJarjestaja'

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
    updateOstoslista: PropTypes.func.isRequired,
    returnMessages: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
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
    if (e.target.name === 'maara') {
      this.setState({ [e.target.name]: Number(e.target.value) })  
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  onSubmit = e => {
    // Haetaan vanhan ostoslistan tarvikkeet muuttujaan
    const vanhaOstoslista = this.props.ostoslista.ostoslistat.find(ostoslista => ostoslista.id === this.state.ostoslista.id)
    
    // jos lisättävä tarvike on jo valitulla ostoslistalla
    const olemassaOlevaTarvike = this.state.ostoslista.tarvikkeet.find(tarvike => tarvike.id === this.state.tarvike.id)
    
    console.log('Olemassaolevatarvike', olemassaOlevaTarvike);
    

    let newOstoslista

    if (olemassaOlevaTarvike) {
      vanhaOstoslista.tarvikkeet.forEach(tarvike => tarvike.id === olemassaOlevaTarvike.id ? tarvike.maara = tarvike.maara + this.state.maara : tarvike)
      
      newOstoslista = {
        id: this.state.ostoslista.id,
        tarvikkeet: [...vanhaOstoslista.tarvikkeet]
      }   
    } else {
      newOstoslista = {
        nimi: this.state.ostoslista.nimi,
        id: this.state.ostoslista.id,
        tarvikkeet: [...vanhaOstoslista.tarvikkeet,
        { id: this.state.tarvike.id, maara: this.state.maara }]
      }
    }

    const jarjestettyUusiOstoslista = ostoslistanJarjestaja(newOstoslista, this.props.tarvikkeet)
    
    
    // Add item via addItem action
    this.props.updateOstoslista(jarjestettyUusiOstoslista)

    // valitaan päivitetty lista valituksi ostoslistaksi
    this.props.selectOstoslista(jarjestettyUusiOstoslista)

    // muuta alkutilan määrä yhteen ja uusi ostoslista
    this.setState({ ostoslista: jarjestettyUusiOstoslista, maara: 1 })

    // Lähetetään viesti onnistuneesta lisäyksestä

    this.props.returnMessages(`tarvike ${this.state.tarvike.nimi} lisätty ostoslistalle ${this.state.ostoslista.nimi}`)
    setTimeout(() => this.props.clearMessages(), 5000)

    // Close modal
    this.toggle()

  }

  valitseOstoslista(e) {
    const valittuLista = this.props.ostoslista.ostoslistat.find(ostoslista => ostoslista.id === e.target.value)
    this.props.selectOstoslista(valittuLista)
    this.setState({ ostoslista: valittuLista })
  }


  render() {

    console.log(this.state);
    
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
            <AvForm onSubmit={this.onSubmit}>
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
              <AvGroup>
                <Label for='tarvike'><h6>Määrä ostoslistalle: </h6></Label><br />
                <AvField
                  id='maara'
                  name="maara"
                  type="number"
                  min="0"
                  placeholder='Lisättävä määrä'
                  onChange={this.onChange}
                  required errorMessage="Syötä määrä"
                  value={this.state.maara}
                  style={{ weight: '50px' }} />
              </AvGroup>
              <Button id='lisaa-ostoslistalle-modal-button' color='dark' style={{ marginTop: '2rem' }} block>
                Lisää
              </Button>
            </AvForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tarvikkeet: state.tarvike.tarvikkeet,
  ostoslista: state.ostoslista,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { updateOstoslista, selectOstoslista, returnErrors, clearErrors, returnMessages, clearMessages }
)(LisaaOstosModal)
