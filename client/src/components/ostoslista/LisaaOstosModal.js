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

class LisaaOstosModal extends Component {
  state = {
    modal: false,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    ostoslista: PropTypes.object.isRequired,
    selectOstoslista: PropTypes.func.isRequired,
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

    const newOstos = {
      id: this.props.row.id,
      maara: this.state.maara
    }

    // Add item via addItem action
    this.props.updateOstoslista(newOstos)

    // Close modal
    this.toggle()
    
  }


  render() {

    
    console.log('ostoslista: ', this.props.ostoslista.ostoslistat)
    const allOstoslistaRows = this.props.ostoslista.ostoslistat.map(ostoslista => {
      return (
        <option key={'row-data-' + ostoslista.id} value={ostoslista.id}>{ostoslista.nimi}</option>
      )
    })


    return (
      <div>
        {this.props.isAuthenticated ? (

          <Button color='dark' onClick={this.toggle}>
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
                <Input type="select" name="select" onChange={(e) => selectOstoslista({ostoslista: e.target.value})}> 
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
              <Button color='dark' style={{ marginTop: '2rem' }} block>
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
  { updateOstoslista, selectOstoslista }
)(LisaaOstosModal)
