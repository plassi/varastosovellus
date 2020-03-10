import React, { Component } from 'react';
import {
  Button,
  Container, Col,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Card, CardBody, CardTitle
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginForm extends Component {
  state = {
    kayttajatunnus: '',
    salasana: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { kayttajatunnus, salasana } = this.state;

    const user = {
      kayttajatunnus,
      salasana
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    if (this.props.isAuthenticated) {
      return (
        <></>
      )
    } else {

      return (
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <p>

            </p>
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
                    <Button color='dark' style={{ marginTop: '2rem' }} block>
                      Kirjaudu sisään
                  </Button>
                  </FormGroup>
                </Form>
              </CardBody>

            </Card>
          </Col>
        </Container>

      );
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginForm);
