import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import ReactToPrint from 'react-to-print'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { Button, Row, Col } from 'reactstrap'
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
        dataField: 'maaraJaYks',
        text: 'Määrä',
        sort: true,
        headerAlign: 'center',
        align: 'center'
      },
      {
        dataField: 'hankintapaikka',
        text: 'Hankintapaikka',
        sort: true,
      },
      {
        dataField: 'ahinta',
        text: 'a Hinta €',
        sort: true,
        headerAlign: 'center',
        align: 'center'
      },
      {
        dataField: 'hinta',
        text: 'Hinta €',
        sort: true,
        headerAlign: 'center',
        align: 'center'
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
      tarvikkeet: [...ostoslistanTarvikkeet]
    }
    console.log(uusiOstoslista)

    const promise = new Promise(() => this.props.updateOstoslista(uusiOstoslista))
    promise.then(this.props.selectOstoslista(uusiOstoslista))

    this.props.returnMessages('Tarvike poistettu ostoslistalta')
    setTimeout(() => this.props.clearMessages(), 5000)

  }

  yhteishinta(data) {

    if (data.length > 0) {
      const hinnat = data.map(tarvike => {
        if (tarvike.ahinta) {
          return tarvike.maara * tarvike.ahinta
        }
        return 0.00
      })
  
      const reducer = (total, num) => total + num
      
      const yhteishinta = hinnat.reduce(reducer)

      const pyoristettyYhteishinta = Number.parseFloat(yhteishinta).toFixed(2)

      return pyoristettyYhteishinta
    }

    return 0.00
    
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
            maara: tarvike.maara,
            maarayksikko: kokoTarvike.maarayksikko,
            maaraJaYks: tarvike.maara + " " + kokoTarvike.maarayksikko,
            ahinta: Number.parseFloat(kokoTarvike.hinta).toFixed(2),
            hinta: Number.parseFloat(kokoTarvike.hinta * tarvike.maara).toFixed(2),
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

      const printableData = data.map(tarvike => {
        return (
          {
            id: tarvike.id,
            nimi: tarvike.nimi,
            maarayksikko: tarvike.maarayksikko,
            ahinta: tarvike.ahinta,
            hinta: tarvike.hinta,
            hankintapaikka: tarvike.hankintapaikka,
            maara: tarvike.maara,
            maaraJaYks: tarvike.maara + " " + tarvike.maarayksikko
          }
        )
      })

      const yhteishinta = this.yhteishinta(data)

      return (
        <div style={{marginTop: '100px'}}>
          <div>
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>{selected.nimi}</h2>

            <BootstrapTable
              keyField="id"
              data={data}
              columns={this.state.columns}
              bordered={false}
              rowStyle={{ backgroundColor: 'whitesmoke' }}
            />
            <p style={{textAlign: 'right', marginTop: '30px', fontWeight: 'bold'}} className="ml-1">Yhteishinta: {yhteishinta} €</p>

          </div>

          {/* Määritetään erikseen tulostettava versio taulukosta: */}

          <div style={{ display: 'none' }}>
            <div ref={el => (this.componentRef = el)}>

              <h5 style={{paddingBottom:'15px'}}>{selected.nimi}</h5>
              <BootstrapTable
                keyField="id"
                data={printableData}
                columns={printableColumns}
                bordered={false}
                
              />
              <Row style={{paddingTop:'15px', marginRight: '2px', marginLeft: '2px' ,borderTopStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
                <Col ></Col>
                <Col></Col>
                <Col></Col>
                <Col><p style={{textAlign: 'right', fontWeight: 'bold'}} className="ml-1">Yhteishinta:</p></Col>
                <Col><p style={{textAlign: 'center', fontWeight: 'bold'}} className="ml-1">{yhteishinta} €</p></Col>
              </Row>
              
              

            </div>
          </div>
<Row style={{marginTop: '30px'}}>
  <Col style={{textAlign: 'right'}}>
          <ReactToPrint
            bodyClass="p-5"
            trigger={() => <Button
              color='dark'
              style={{ marginBottom: '2rem' }}>Tulosta lista</Button>}
            content={() => this.componentRef}
            onBeforeGetContent={() => this.onBeforeGetContent}
          />
          </Col>
</Row>
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