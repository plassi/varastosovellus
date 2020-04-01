import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../componentStyles.css"
import { TiShoppingCart } from 'react-icons/ti'

class LisaaOstosModal extends Component {
  state = {
    modal: false,
    
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newOstos = {
      id: this.props.row.id,
      nimi: this.state.nimi,
      maara: this.state.maara,
      maarayksikko: this.state.maarayksikko
    }

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          
           <Button color='dark' onClick={this.toggle}>
             <TiShoppingCart/>
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
                <Label for='tarvike'><h6>Tarvike: </h6></Label><br/>
                <Label>
                      {this.props.row.nimi}
                  </Label>
              </FormGroup>
              <FormGroup>
              <Label for='tarvike'><h6>Määrä varastossa: </h6></Label><br/>
                <Label>
                      {this.props.row.maara} {this.props.row.maarayksikko}
                  </Label>
              </FormGroup>
              <FormGroup>
              <Label for='tarvike'><h6>Määrä ostoslistalle: </h6></Label><br/>
              <Input
                  type='number'
                  name='maara'
                  defaultValue='1'
                  placeholder='Lisättävä määrä'
                  onChange={this.onChange}
                  style={{weight:'50px'}}
                />
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Lisää
                </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { }
)(LisaaOstosModal);
