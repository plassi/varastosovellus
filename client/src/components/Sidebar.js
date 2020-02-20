import React, { useState, Component } from "react"
import {
    Collapse,
    Button,
    CardBody,
    Card
} from 'reactstrap';
import "./componentStyles.css"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Sidebar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div>
                {isAuthenticated ?
                    <Button
                        color='dark'
                        onClick={this.toggle}>Sidebar</Button>
                    :
                    <></>
                }
                <Collapse isOpen={this.state.isOpen}>
                    <div className='sidebar'>
                        <h5 href="">Lokitiedot</h5>
                        <h5 href="">Tee ostoslista</h5>
                        <h5 href="">Ryhmät</h5>
                        <h5 href="">Lisää ryhmä</h5>
                    </div>
                </Collapse>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
  )(Sidebar);