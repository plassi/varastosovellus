import React, { useState, Component } from "react"
import {
    Collapse,
    Button,
    CardBody,
    Card
} from 'reactstrap';
import "./componentStyles.css"
import PropTypes from 'prop-types';

class Sidebar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
      };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? (
                    <Button
                        color='dark'
                        onClick={this.toggle}>Sidebar</Button>
                ) : (
//Tässä pitäisi olla tyhjä rivi, jos käyttäjä ei ole kirjautunut (en saanut toimimaan)
                        <Button
                        color='dark'
                        onClick={this.toggle}>Sidebar</Button>
                    )}
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
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
  });

  export default Sidebar;