import React, { Component } from 'react'
import {
  Button,
  Container, Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Card, CardBody, CardTitle
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginForm extends Component {
  state = {
    kayttajatunnus: '',
    salasana: '',
    msg: null
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props
    
    
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        if (error.msg.msg) {
          this.setState({ msg: error.msg.msg })
        }
      } else {
        this.setState({ msg: null })
      }
      
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const { kayttajatunnus, salasana } = this.state

    const user = {
      kayttajatunnus,
      salasana
    }

    // Attempt to login
    this.props.login(user)
    this.props.clearErrors()
  }



  render() {

    return (
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{marginTop: '100px'}}> 
          <Card>
            <CardBody>
              <CardTitle><h4>Kirjaudu sisään</h4></CardTitle>
              {this.state.msg ? (
                <Alert color='danger'>{this.state.msg}</Alert>
              ) : null}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for='kayttajatunnus'>Käyttäjätunnus</Label>
                  <Input
                    type='kayttajatunnus'
                    name='kayttajatunnus'
                    id='kayttajatunnus'
                    placeholder='Käyttäjätunnus'
                    className='mb-3'
                    onChange={this.onChange}
                  />

                  <Label for='salasana'>Salasana</Label>
                  <Input
                    type='password'
                    name='salasana'
                    id='salasana'
                    placeholder='Salasana'
                    className='mb-3'
                    onChange={this.onChange}
                  />
                  <Button id='kirjautumisnappi' color='dark' style={{ marginTop: '2rem' }} block>
                    Kirjaudu sisään
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>

          </Card>
        </Col>
      </Container>

    )
  }
}


const mapStateToProps = state => ({
  error: state.error
})

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginForm)
