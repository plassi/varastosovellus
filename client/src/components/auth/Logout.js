import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
        <div onClick={this.props.logout} href='#'>
          Kirjaudu ulos
        </div>
      
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
