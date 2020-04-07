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
  Col,
  NavLink,
  Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
  state = {
    modal: true,
    ryhma: '',
    opettaja: '',
    name: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle()
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const { name,  password } = this.state;

    // Create user object
    const newUser = {
      name,
      password
    }

    // Attempt to register
    this.props.register(newUser)
  }


  

  render() {
    return (
      <div>
        <Col xs="auto">
        <Button color = "dark" onClick={this.toggle}>
          Lisää käyttäjä
        </Button>
        </Col>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Lisää uusi ryhmä tai opettaja</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup check>
              <Label check>
            <Input type="radio" name="opettaja"  />{' '}
            Opettaja
          </Label>
          </FormGroup>
          <FormGroup check>
         <Label check>
            <Input type="radio" name="ryhma" />{' '}
            Ryhmä
          </Label>
          </FormGroup>
                <Label for='name'>Nimi</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Nimi'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Salasana</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Salasana'
                  className='mb-3'
                  onChange={this.onChange}
                />
                 
                <Input
                  type='textarea'
                  name='lisatieto'
                  placeholder='Lisätietoja'
                  onChange={this.onChange}
                />
              <FormGroup>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Lisää
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal)
