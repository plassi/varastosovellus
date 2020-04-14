import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap'
import { updateTarvike } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TarvikeMaara extends Component {
	state = {
		maara: this.props.row.maara,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool
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
		console.log('row props: ', this.props.row)

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
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(
	mapStateToProps,
	{ updateTarvike }
)(TarvikeMaara)
