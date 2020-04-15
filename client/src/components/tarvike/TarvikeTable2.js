import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Container, Row, Col} from 'reactstrap'
import { TiPlus, TiMinus } from 'react-icons/ti'
import TarvikeMuokkaaModal from './TarvikeMuokkaaModal'
import LisaaOstosModal from '../ostoslista/LisaaOstosModal'
import TarvikeMaara from './TarvikeMaara'

class TarvikeTable2 extends Component {
  state = {
    columns: [
      {
        dataField: 'nimi',
        text: 'Nimi',
        sort: true
      }, {
        dataField: 'maara',
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

    return tarvikeRows
  }

  render() {
    const { tarvikkeet } = this.props.tarvike
    const { SearchBar } = Search

    const expandRow = {
      onlyOneExpanding: true,
      background: 'black',
      renderer: row => (
        <Container>
          <Row style={{paddingBottom: '5'}}>
            <Col xs="3">
              <h6>Kuvaus</h6>
              <p>{row.kuvaus} </p>
            </Col>
            <Col xs="3">
              <h6>Muokkaa määrää</h6>
              <TarvikeMaara row={row} />
            </Col>
            <Col xs="3" style={{ paddingLeft: '0', paddingRight: '0', textAlign:'right' }}>
              <h6>Muokkaa</h6>
              <TarvikeMuokkaaModal row={row} />
            </Col>
            <Col xs="3" style={{ paddingRight: '5px' }}>
              <h6>Lisää ostoslistalle</h6>
              <LisaaOstosModal row={row} />
            </Col>
          </Row>
          <Row>
          <Col>
            <h6>Hinta</h6>
            </Col>
            <Col>
            <h6>Yksikkö</h6>
            {row.maarayksikko}
            </Col>
            <Col>
            <h6>Hankintapaikka</h6>
            </Col>

            <Col></Col>
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

    return (
      <div>
        <ToolkitProvider
          keyField="id"
          data={tarvikkeet}
          columns={this.state.columns}
          search
        >
          {
            props => (
              <div>
                <SearchBar className='search' placeholder="Hae" {...props.searchProps} />
                <BootstrapTable
                  hover
                  {...props.baseProps}
                  bordered={false}
                  expandRow={expandRow}
                  pagination={paginationFactory(options)}
                  noDataIndication="Tietoja ei saatavilla"
                  rowStyle={ { backgroundColor: 'whitesmoke' } }
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