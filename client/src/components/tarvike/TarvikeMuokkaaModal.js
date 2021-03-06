import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Container,
  Label
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteTarvike, updateTarvike } from '../../actions/tarvikeActions'
import { returnErrors, clearErrors } from '../../actions/errorActions'
import PropTypes from 'prop-types'
import '../componentStyles.css'
import { FaRegEdit } from 'react-icons/fa'
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import confirm from "reactstrap-confirm";

class TarvikeMuokkaaModal extends Component {
  state = {
    modal: false,
    nimi: this.props.row.nimi,
    maara: this.props.row.maara,
    maarayksikko: this.props.row.maarayksikko
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    ostoslista: PropTypes.object.isRequired
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

    const newTarvike = {
      id: this.props.row.id,
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

    // Put item via putItem action
    this.props.updateTarvike(newTarvike)

    // Close modal
    this.toggle()
  }

  onDeleteClick = id => {
    // Jos tarvike on jollain ostoslistalla, sitä ei voi poistaa
    let onOstosListalla = false

    this.props.ostoslista.ostoslistat.forEach(ostoslista => {
      ostoslista.tarvikkeet.forEach(tarvike => {
        if (tarvike.id === id) {

          this.props.returnErrors('Ostoslistalla olevaa tarviketta ei voi poistaa')
          onOstosListalla = true

          setTimeout(() => this.props.clearErrors(), 5000)
        }
      })
    })

    if (!onOstosListalla) {
      confirm({
        title: (
          <>
            HUOM!
          </>
        ),
        message: "Oletko varma, että haluat poistaa tarvikkeen?",
        confirmText: "Poista",
        confirmColor: "dark",
        cancelColor: "link text-danger",
        cancelText: "Peruuta"
      })
        .then((varmistus) =>
          varmistus === true ? this.props.deleteTarvike(id) : null
        )

    }

    // Close modal
    this.toggle()
  }

  renderMuokkaaButton = () => {

    const disabled = this.state.nimi === '' || this.state.maara === '' || this.state.maarayksikko === ''

    return (
      <Button id='tarvike-tallenna-button' disabled={disabled} color='dark' block>
        Tallenna
      </Button>
    )

  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated
          ? (

            <Button id='tarvike-muokkaa-button' color='dark' onClick={this.toggle}>
              <FaRegEdit />
            </Button>

          ) : (<></>)
        }

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Muokkaa</ModalHeader>
          <ModalBody>
            <AvForm onSubmit={this.onSubmit}>
              <AvGroup>
                <Label for="nimi">Nimi</Label>
                <AvInput
                  id='nimi'
                  type='text'
                  name='nimi'
                  value={this.props.row.nimi}
                  placeholder='Nimi'
                  onChange={this.onChange}
                  required
                />
                <AvFeedback>Syötä nimi</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="kategoria">Kategoria</Label>
                <AvInput
                  id='kategoria'
                  type='text'
                  name='kategoria'
                  value={this.props.row.kategoria}
                  placeholder='Kategoria'
                  onChange={this.onChange}
                />
              </AvGroup>
              <AvGroup>
                <Label for="kuvaus">Kuvaus</Label>
                <AvInput
                  id='kuvaus'
                  type='textarea'
                  name='kuvaus'
                  value={this.props.row.kuvaus}
                  placeholder='Kuvaus'
                  onChange={this.onChange}
                />
              </AvGroup>
              <AvGroup>
                <Label for="maara">Määrä</Label>
                <AvField
                  id='maara'
                  name="maara"
                  type="number"
                  min="0"
                  value={this.props.row.maara}
                  placeholder='Määrä'
                  onChange={this.onChange}
                  required errorMessage="Syötä määrä" />
              </AvGroup>
              <AvGroup>
                <Label for="maarayksikko">Määräyksikkö</Label>
                <AvInput
                  id='maarayksikko'
                  type='text'
                  name='maarayksikko'
                  value={this.props.row.maarayksikko}
                  placeholder='Määräyksikkö'
                  onChange={this.onChange}
                  required
                />
                <AvFeedback>Syötä yksikkö</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="sijainti">Sijainti</Label>
                <AvInput
                  id='sijainti'
                  type='text'
                  name='sijainti'
                  value={this.props.row.sijainti}
                  placeholder='Sijainti'
                  onChange={this.onChange}
                />
              </AvGroup>
              <AvGroup>
                <Label for="hinta">Hinta</Label>
                <AvField
                  id='hinta'
                  name="hinta"
                  type="number"
                  min="0"
                  value={this.props.row.hinta}
                  placeholder='Hinta'
                  onChange={this.onChange} />
              </AvGroup>
              <AvGroup>
                <Label for="hankintapaikka">Hankintapaikka</Label>
                <AvInput
                  id='hankintapaikka'
                  type='text'
                  name='hankintapaikka'
                  value={this.props.row.hankintapaikka}
                  placeholder='Hankintapaikka'
                  onChange={this.onChange}
                />
              </AvGroup>
              <Container>
                <Row>
                  <Col style={{ paddingLeft: '0px' }}>
                    <Button
                      id='tarvike-poista-button'
                      color='danger' block
                      onClick={this.onDeleteClick.bind(this, this.props.row.id)}
                    >
                      Poista {this.props.row.nimi}
                    </Button>
                  </Col>
                  <Col style={{ paddingRight: '0px' }}>
                    {this.renderMuokkaaButton()}
                  </Col>
                </Row>
              </Container>
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
  ostoslista: state.ostoslista
})

export default connect(
  mapStateToProps,
  { deleteTarvike, updateTarvike, returnErrors, clearErrors }
)(TarvikeMuokkaaModal)
