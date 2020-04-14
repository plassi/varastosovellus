import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap'
import { updateTarvike } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TarvikeMaara extends Component {

	static propTypes = {
		updateTarvike: PropTypes.func.isRequired
	}

	buttonPlusClick = () => {
		const newTarvike = {
			...this.props.row,
			maara: this.props.row.maara + 1
		}
		// Put item via putItem action
		this.props.updateTarvike(newTarvike)

	}

	buttonMinusClick = (e) => {

		const newTarvike = {
			...this.props.row,
			maara: this.props.row.maara - 1
		}
		// Put item via putItem action
		this.props.updateTarvike(newTarvike)
	}

	render() {

		return (
			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<Button color="dark" onClick={this.buttonMinusClick}> - </Button>
				</InputGroupAddon>
				{/* <Input readOnly defaultValue={this.props.row.maara} /> */}

				<InputGroupAddon addonType="append">
					<Button color="dark" onClick={this.buttonPlusClick}> + </Button>
				</InputGroupAddon>
			</InputGroup>
		)
	}
}

const mapStateToProps = state => ({
	
})

export default connect(
	mapStateToProps,
	{ updateTarvike }
)(TarvikeMaara)
