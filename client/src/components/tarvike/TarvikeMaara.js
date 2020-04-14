import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap'
import { updateTarvike } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TarvikeMaara extends Component {
    state = {
        newMaara: this.props.row.maara

    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    /*
        onChange = e => {
            this.setState({ newMaara: e.target.value })
    
            const newTarvike = {
                id: this.props.row.id,
                nimi: this.props.row.nimi,
                kategoria: this.props.row.kategoria,
                kuvaus: this.props.row.kuvaus,
                maara: this.state.newMaara,
                maarayksikko: this.props.row.maarayksikko,
                sijainti: this.props.row.sijainti,
                avainsanat: this.props.row.avainsanat,
                kuva: this.props.row.kuva
              }
        
            // Put item via putItem action
            this.props.updateTarvike(newTarvike)
        }
    */
    buttonPlusClick = () => {

        //this.setState({ newMaara: e.target.value })
        this.setState({ newMaara: this.state.newMaara++ })
        console.log('Määrä: ', this.state.newMaara)
        this.update()
    }

    update = () => {
        const newTarvike = {
            id: this.props.row.id,
            nimi: this.props.row.nimi,
            kategoria: this.props.row.kategoria,
            kuvaus: this.props.row.kuvaus,
            maara: this.state.newMaara,
            maarayksikko: this.props.row.maarayksikko,
            sijainti: this.props.row.sijainti,
            avainsanat: this.props.row.avainsanat,
            kuva: this.props.row.kuva
        }

        // Put item via putItem action
        this.props.updateTarvike(newTarvike)
    }

    buttonMinusClick = (e) => {
        //this.setState({ newMaara: e.target.value })
        this.setState({ newMaara: this.state.newMaara-- })
        console.log('Määrä: ', this.state.newMaara)
        this.update()
    }

    render() {
        console.log('määrä props: ', this.props.row.maara)
        const maara = this.props.row.maara
        return (
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Button color="dark" onClick={this.buttonMinusClick}> - </Button>
                </InputGroupAddon>

                <InputGroupAddon addonType="append">
                    <Button color="dark" onClick={this.buttonPlusClick}> + </Button>
                </InputGroupAddon>
            </InputGroup>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { updateTarvike }
)(TarvikeMaara)
