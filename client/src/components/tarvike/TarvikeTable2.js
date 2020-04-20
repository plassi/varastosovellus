import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Container, Row, Col } from 'reactstrap'
import { TiPlus, TiMinus } from 'react-icons/ti'
import TarvikeMuokkaaModal from './TarvikeMuokkaaModal'
import LisaaOstosModal from '../ostoslista/LisaaOstosModal'
import TarvikeMaara from './TarvikeMaara'
import TarvikeModal from './TarvikeModal'
import './tarvikeTable.css'

class TarvikeTable2 extends Component {
  state = {
    columns: [
      {
        dataField: 'nimi',
        text: 'Nimi',
        sort: true
      }, {
        dataField: 'maaraJaYks',
        text: 'Määrä',
        sort: true
      }, {
        dataField: 'sijainti',
        text: 'Sijainti',
        sort: true
      }, {
        dataField: 'kategoria',
        text: 'Kategoria',
        sort: true
      },
    ],
  }

  static propTypes = {
    tarvike: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  renderHinta(row) {
    if (row.hinta) {
      return (
        <>
          {Number.parseFloat(row.hinta).toFixed(2)} e/{ row.maarayksikko}
        </>
      )
    }
  }

  render() {
    const { tarvikkeet } = this.props.tarvike
    const { SearchBar } = Search

    const expandRow = {
      onlyOneExpanding: true,
      renderer: row => (
        <Container>
          <Row style={{ paddingBottom: '5px', paddingTop: '5px', borderBottomStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }} >
            <Col xs="4">
              <h6>Kuvaus:</h6>
            </Col>
            <Col>
              <p>{row.kuvaus} </p>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '5px', paddingTop: '5px', borderBottomStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
            <Col xs="4">
              <h6>Hinta: </h6>
            </Col>
            <p style={{ paddingLeft: '15px' }}>
              {this.renderHinta(row)}
            </p>

            <Col>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '5px', paddingTop: '5px', borderBottomStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
            <Col xs="4">
              <h6>Hankintapaikka:</h6>
            </Col>
            <Col>
              {row.hankintapaikka}
            </Col>
          </Row>
          <Row style={{ paddingBottom: '5px', paddingTop: '5px', borderBottomStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
            <Col xs="4">
              <h6>Muokkaa määrää:</h6>
            </Col>
            <Col>
              <TarvikeMaara row={row} />
            </Col>
          </Row >
          <Row style={{ paddingBottom: '5px', paddingTop: '5px', borderBottomStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
            <Col xs="4">
              <h6>Muokkaa tarviketta:</h6>
            </Col>
            <Col>
              <TarvikeMuokkaaModal row={row} />
            </Col>
          </Row>
          <Row style={{ paddingBottom: '5px', paddingTop: '5px', borderBottomStyle: 'solid', borderWidth: '1px', borderColor: 'lightgray' }}>
            <Col xs="4">
              <h6>Lisää ostoslistalle:</h6>
            </Col>
            <Col>
              <LisaaOstosModal row={row} />
            </Col>
          </Row>
        </Container>
      ),
      showExpandColumn: true,
      expandColumnPosition: 'right',
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return <b><TiMinus /></b>
        }
        return <b><TiPlus /></b>
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <b><TiMinus /></b>
          )
        }
        return (
          <b><TiPlus /></b>
        )
      }

    }

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total pagination pagination-sm">
        Näytetään {from} - {to} / {size} tarviketta
      </span>
    )

    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: 'Alkuun',
      prePageText: '<<',
      nextPageText: '>>',
      lastPageText: 'Loppuun',
      nextPageTitle: 'Seuraava',
      prePageTitle: 'Edellinen',
      firstPageTitle: 'Ensimmäinen',
      lastPageTitle: 'Viimeinen',
      showTotal: true,
      paginationTotalRenderer: customTotal,
      sizePerPageList: [{
        text: '10', value: 10
      }, {
        text: '50', value: 50
      }, {
        text: '100', value: 100
      }, {
        text: 'All', value: tarvikkeet.length
      }]
    }

    const data = tarvikkeet.map(tarvike => {
      return {
        ...tarvike,
        maaraJaYks: tarvike.maara + " " + tarvike.maarayksikko
      }

    })

    return (

      <div>
        <ToolkitProvider
          keyField="id"
          data={data}
          columns={this.state.columns}
          search
        >
          {
            props => (
              <div>
                <Row>
                  <Col>
                    <SearchBar className='search' placeholder="Hae" {...props.searchProps} />
                  </Col>
                  <Col style={{ textAlign: 'right' }}>
                    <TarvikeModal />
                  </Col>
                </Row>
                <BootstrapTable
                  hover
                  {...props.baseProps}
                  bordered={false}
                  expandRow={expandRow}
                  pagination={paginationFactory(options)}
                  noDataIndication="Tietoja ei saatavilla"
                  rowStyle={{ backgroundColor: 'whitesmoke' }}
                />
              </div>

            )
          }
        </ToolkitProvider>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tarvike: state.tarvike
})

export default connect(
  mapStateToProps,
  null
)(TarvikeTable2)