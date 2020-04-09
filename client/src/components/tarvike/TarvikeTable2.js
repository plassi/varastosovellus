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
      renderer: row => (
        <Container>
          <Row>
            <Col>
              <h6>Kuvaus</h6>
              <p>{row.kuvaus} </p>
            </Col>
            <Col >
              <h6>Kuva</h6>
              <picture>
                <img src={row.kuva} />
              </picture>
            </Col>
            <Row>
              <Col style={{ paddingRight: '5px' }}>
                <LisaaOstosModal row={row} />
              </Col>
              <Col style={{ paddingLeft: '0' }}>
                <TarvikeMuokkaaModal row={row} />
              </Col>
            </Row>
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