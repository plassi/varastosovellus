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
        dataField: 'nimi',
        text: 'Nimi',
        sort: true,
      },
      {
        dataField: 'maara',
        text: 'Määrä',
        sort: true,
      },
      {
        dataField: 'maarayksikko',
        text: 'Yksikkö',
        sort: true,
      },
      {
        dataField: 'hinta',
        text: 'Hinta',
        sort: true,
      },

    ],
  }

  static propTypes = {
    ostoslista: PropTypes.object.isRequired,
    tarvikkeet: PropTypes.object.isRequired
  }

  render() {

    if (this.props.ostoslista.selected === null) {
      return (<></>)
    } else {
      const { selected } = this.props.ostoslista
      console.log('ostoslista.selected on OstoslistaTable.js', selected)

      const data = selected.tarvikkeet.map(tarvike => {
        const suodatin = this.props.tarvikkeet.filter(muuTarvike => muuTarvike.id === tarvike.id)

        const kokoTarvike = suodatin[0]
        
        
        return (
          {
            ...tarvike,
            nimi: kokoTarvike.nimi,
            maarayksikko: kokoTarvike.maarayksikko,
            hinta: kokoTarvike.hinta
          }
        )
      })
      
      console.log(data)
      
      return (
        <>
          <h6>{selected.nimi}</h6>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={this.state.columns}
          />
        </>
      )
    }
  }
}

const mapStateToProps = state => ({
  ostoslista: state.ostoslista,
  tarvikkeet: state.tarvike.tarvikkeet
})

export default connect(
  mapStateToProps,
  null
)(OstoslistaTable)