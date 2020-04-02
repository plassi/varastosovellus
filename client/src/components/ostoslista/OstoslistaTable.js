import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

class OstoslistaTable extends Component {
  state = {
    columns: [
      {
        dataField: '',
        text: 'Nimi',
        sort: true,
      },
      {
        dataField: '',
        text: 'Määrä',
        sort: true,
      },
    ],
  }

  static propTypes = {
    ostoslista: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  renderItem(ostoslista) {

    const ostoslistaRows = [
      <tr id={ostoslista.id} key={'row-data-' + ostoslista.id}>
        <td>{}</td>
        <td>{}</td>
        <td></td>
        <td></td>
      </tr>
    ]

    return ostoslistaRows
  }

  render() {

    if (this.props.ostoslista.selected === null) {
      return (<></>)
    } else {
      const { ostoslistat } = this.props.ostoslista
      return (
        <div>
          <h6>Ostoslista</h6>
          <BootstrapTable
            keyField='id'
            data={ostoslistat}
            columns={this.state.columns}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  ostoslista: state.ostoslista,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  null
)(OstoslistaTable)