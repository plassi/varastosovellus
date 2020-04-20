import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { connect } from 'react-redux'
import { addTarvike } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types'
import '../componentStyles.css'
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation'

class TarvikeModal extends Component {
  state = {
    modal: false,
    nimi: '',
    maara: '',
    maarayksikko: ''
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
      kuva: this.state.kuva,
      hinta: this.state.hinta,
      hankintapaikka: this.state.hankintapaikka,
    }

    // Add item via addItem action
    this.props.addTarvike(newTarvike)

    // Close modal
    this.toggle()
  };

  renderLisaaButton = () => {

    const disabled = this.state.nimi === '' || this.state.maara === '' || this.state.maarayksikko === '' 

    return (
      <Button id='modal-lisaa-tarvike-button' disabled={disabled} color='dark' style={{ marginTop: '2rem' }} block>
        Lisää tarvike
      </Button>
    )

  }

  render() {

    return (
      <div>
        {this.props.isAuthenticated ? (
         
            <Button
              id='lisaa-tarvike-button'
              color='dark'
              onClick={this.toggle}
              style={{marginTop: '32px', marginBottom: '8px'}}
            > Lisää tarvike</Button>
         
        ) :

          (
            <></>
          )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Lisää tarvike</ModalHeader>
          <ModalBody>
            <p><i>Nimi, Määrä ja Määräyksikkö ovat pakollisia kenttiä</i></p>
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
              <AvGroup>
                <AvInput
                  id='kategoria'
                  type='text'
                  name='kategoria'
                  placeholder='Kategoria'
                  onChange={this.onChange}
                />
              </AvGroup>
              <AvGroup>
                <AvInput
                  id='kuvaus'
                  type='textarea'
                  name='kuvaus'
                  placeholder='Kuvaus'
                  onChange={this.onChange}
                />
              </AvGroup>
              <AvGroup>
                <AvField
                  id='maara'
                  name="maara"
                  type="number"
                  min="0"
                  placeholder='Määrä'
                  onChange={this.onChange}
                  required errorMessage="Syötä määrä" />
              </AvGroup>
              <AvGroup>
                <AvInput
                  id='maarayksikko'
                  type='text'
                  name='maarayksikko'
                  placeholder='Määräyksikkö'
                  onChange={this.onChange}
                  required
                />
                <AvFeedback>Syötä yksikkö</AvFeedback>
              </AvGroup>
              <AvGroup>
                <AvInput
                  id='sijainti'
                  type='text'
                  name='sijainti'
                  placeholder='Sijainti'
                  onChange={this.onChange}
                />
              </AvGroup>
              <AvGroup>
                <AvField
                  id='hinta'
                  name="hinta"
                  type="number"
                  min="0"
                  placeholder='Hinta'
                  onChange={this.onChange} />
              </AvGroup>
              <AvGroup>
                <AvInput
                  id='hankintapaikka'
                  type='text'
                  name='hankintapaikka'
                  placeholder='Hankintapaikka'
                  onChange={this.onChange}
                />
              </AvGroup>

              {this.renderLisaaButton()}

            </AvForm>
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
