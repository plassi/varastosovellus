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
    tulostus: false,
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
      tarvikkeet: [...ostoslistanTarvikkeet]
    }
    console.log(uusiOstoslista)

    const promise = new Promise(() => this.props.updateOstoslista(uusiOstoslista))
    promise.then(this.props.selectOstoslista(uusiOstoslista))

    this.props.returnMessages('Tarvike poistettu ostoslistalta')
    setTimeout(() => this.props.clearMessages(), 5000)

  }

  yhteishinta(data) {

    console.log(data);
    
    
    const hinnat = data.map(tarvike => tarvike.maara * tarvike.hinta)

    const reducer = (total, num) => total + num
    
    return hinnat.reduce(reducer)
  }

  onBeforeGetContent = () => {

    return new Promise((resolve, reject) => {
      this.setState({ tulostus: true }, () => resolve());
    });
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

      const printableColumns = this.state.columns.slice(0, -1)
      console.log(data);

      const printableData = data.map(tarvike => {
        return (
          {
            id: tarvike.id,
            nimi: tarvike.nimi,
            maarayksikko: tarvike.maarayksikko,
            hinta: tarvike.hinta,
            hankintapaikka: tarvike.hankintapaikka,
          }
        )
      })

      const yhteishinta = this.yhteishinta(data)

      return (
        <div>
          <div>
            <h5>{selected.nimi}</h5>

            <BootstrapTable
              keyField="id"
              data={data}
              columns={this.state.columns}
            />
            <p className="ml-1">Yhteishinta: {yhteishinta} €</p>

          </div>

          {/* Määritetään erikseen tulostettava versio taulukosta: */}

          <div style={{ display: 'none' }}>
            <div ref={el => (this.componentRef = el)}>

              <h5>{selected.nimi}</h5>
              <BootstrapTable
                keyField="id"
                data={printableData}
                columns={printableColumns}
              />
              <p className="ml-1">Yhteishinta: {yhteishinta} €</p>

            </div>
          </div>

          <ReactToPrint
            bodyClass="p-5"
            trigger={() => <Button
              color='dark'
              style={{ marginBottom: '2rem' }}>Tulosta</Button>}
            content={() => this.componentRef}
            onBeforeGetContent={() => this.onBeforeGetContent}
          />

        </div>
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