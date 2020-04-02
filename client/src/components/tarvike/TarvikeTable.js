import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { getTarvikkeet } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types'

class TarvikeTable extends Component {

  state = {
    expandedRows: []
  }

  static propTypes = {
    getTarvikkeet: PropTypes.func.isRequired,
    tarvike: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getTarvikkeet()
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId)

    this.setState({ expandedRows: newExpandedRows })
  }

  renderItem(tarvike) {

    const clickCallback = () => this.handleRowClick(tarvike.id)
    const tarvikeRows = [
      <tr onClick={clickCallback} key={'row-data-' + tarvike.id}>
        <td>{tarvike.kategoria}</td>
        <td>{tarvike.nimi}</td>
        <td>{tarvike.maara} {tarvike.maarayksikko}</td>
        <td>{tarvike.sijainti}</td>
      </tr>
    ]

    if (this.state.expandedRows.includes(tarvike.id)) {
      console.log(tarvike)

      tarvikeRows.push(
        <tr key={'row-expanded-' + tarvike.id}>
          <td>{tarvike.kuvaus}</td>
          <td>{tarvike.kuva}</td>

        </tr>
      )
    }

    return tarvikeRows
  }

  render() {
    const { tarvikkeet } = this.props.tarvike
    let allTarvikeRows = []

    tarvikkeet.forEach(tarvike => {
      const perTarvikeRows = this.renderItem(tarvike)
      allTarvikeRows = allTarvikeRows.concat(perTarvikeRows)
    })

    return (
      <Container>

        <Table className="table-hover">
          <thead>
            <tr>
              <th>Kategoria</th>
              <th>Nimi</th>
              <th>Määrä</th>
              <th>Sijainti</th>
            </tr>
          </thead>
          <tbody>
            {allTarvikeRows}
          </tbody>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  tarvike: state.tarvike,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { getTarvikkeet }
)(TarvikeTable)