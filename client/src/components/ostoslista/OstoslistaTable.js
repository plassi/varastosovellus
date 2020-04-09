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
    ostoslista: PropTypes.object.isRequired
  }

  renderItem(ostoslista) {

    const ostoslistaRows = [
      <tr id={ostoslista.id} key={'row-data-' + ostoslista.id}>
       
      </tr>
    ]

    return ostoslistaRows
  }

  render() {

    if (this.props.ostoslista.selected === null) {
      return (<></>)
    } else {
      const { selected } = this.props.ostoslista
      console.log(selected);
      
      return (
        <div>
          <h6>{selected.nimi}</h6>
          <BootstrapTable
            keyField='id'
            data={selected.tarvikkeet}
            columns={this.state.columns}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  ostoslista: state.ostoslista
})

export default connect(
  mapStateToProps,
  null
)(OstoslistaTable)