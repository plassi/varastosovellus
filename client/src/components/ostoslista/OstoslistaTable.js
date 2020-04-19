import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import ReactToPrint from 'react-to-print'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { Button } from 'reactstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { updateOstoslista, deleteOstoslista, selectOstoslista } from '../../actions/ostoslistaActions'
import { returnMessages, clearMessages } from '../../actions/messageActions'

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
        text: 'Hinta €',
        sort: true,
      },
      {
        dataField: 'hankintapaikka',
        text: 'Hankintapaikka',
        sort: true,
      },
      {
        dataField: 'poista',
        text: 'Poista',
        headerAlign: 'center',
        align: 'center'
      },

    ],
  }

  static propTypes = {
    ostoslista: PropTypes.object.isRequired,
    tarvikkeet: PropTypes.array.isRequired,
    updateOstoslista: PropTypes.func.isRequired,
    deleteOstoslista: PropTypes.func.isRequired
  }

  onDeleteClick = async (id) => {
    const ostoslistanTarvikkeet = this.props.ostoslista.selected.tarvikkeet.filter(tarvike => tarvike.id === id ? null : tarvike)
    const uusiOstoslista = {
      nimi: this.props.ostoslista.selected.nimi,
      id: this.props.ostoslista.selected.id,
      tarvikkeet: [ ...ostoslistanTarvikkeet ]
    }
    console.log(uusiOstoslista)

    const promise = new Promise(() => this.props.updateOstoslista(uusiOstoslista))
    promise.then(this.props.selectOstoslista(uusiOstoslista))
    
    this.props.returnMessages('Tarvike poistettu ostoslistalta')
    setTimeout(() => this.props.clearMessages(), 5000)

  }

  render() {

    if (this.props.ostoslista.selected === null) {
      return (<></>)
    } else {
      const { selected } = this.props.ostoslista

      const data = selected.tarvikkeet.map(tarvike => {
        const suodatin = this.props.tarvikkeet.filter(muuTarvike => muuTarvike.id === tarvike.id)

        const kokoTarvike = suodatin[0]

        return (
          {
            ...tarvike,
            nimi: kokoTarvike.nimi,
            maarayksikko: kokoTarvike.maarayksikko,
            hinta: kokoTarvike.hinta,
            hankintapaikka: kokoTarvike.hankintapaikka,
            poista: <Button className='remove-btn'
              color='danger'
              size='sm'
              onClick={() => this.onDeleteClick(kokoTarvike.id)}
            >
              <AiOutlineDelete /></Button>
          }
        )
      })

      return (
        <>
          <h5>{selected.nimi}</h5>
          <BootstrapTable
            ref={el => (this.componentRef = el)}
            keyField="id"
            data={data}
            columns={this.state.columns}
            bordered={false}
          />
          <ReactToPrint
            bodyClass="p-5"
            trigger={() => <Button
              color='dark'
              style={{ marginBottom: '2rem' }}>Tulosta</Button>}
            content={() => this.componentRef}
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
  { deleteOstoslista, updateOstoslista, selectOstoslista, returnMessages, clearMessages }
)(OstoslistaTable)