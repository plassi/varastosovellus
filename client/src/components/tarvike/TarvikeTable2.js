import React, { Component, Code } from 'react'
import { connect } from 'react-redux'
import { getTarvikkeet } from '../../actions/tarvikeActions'
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class TarvikeTable2 extends Component {
    state = {
        columns: [{
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
        getTarvikkeet: PropTypes.func.isRequired,
        tarvike: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getTarvikkeet()
    }

    renderItem(tarvike) {
        console.log(tarvike);

        const clickCallback = () => this.handleRowClick(tarvike.id);
        const tarvikeRows = [
            <tr onClick={clickCallback} key={"row-data-" + tarvike.id}>
                <td>{tarvike.kategoria}</td>
                <td>{tarvike.nimi}</td>
                <td>{tarvike.maara} {tarvike.maarayksikko}</td>
                <td>{tarvike.sijainti}</td>
            </tr>
        ];

        return tarvikeRows;
    }

    render() {
        const { tarvikkeet } = this.props.tarvike
        const { SearchBar } = Search;

        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => (
                <div className='grid-container'>
                    <div className='grid-item'>
                        <h6>Kuvaus</h6>
                        <p>{row.kuvaus} </p>
                    </div>
                    <div className='grid-item'>
                        <h6>Kuva</h6>
                        <picture>
                            <img src={row.kuva} />
                        </picture>
                    </div>
                </div>
            ),
            showExpandColumn: true,
            expandColumnPosition: 'right'
        };

        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total pagination pagination-sm">
                Näytetään {from} - {to} / {size} tarviketta
            </span>
        );

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
                text: '2', value: 2
            }, {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: tarvikkeet.length
            }] // A numeric array is also available. the purpose of above example is custom the text
        };

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
                            <SearchBar className='search' placeholder='Hae' {...props.searchProps} />
                            <BootstrapTable
                                hover
                                {...props.baseProps}
                                bordered={false}
                                expandRow={expandRow}
                                pagination={paginationFactory(options)}
                                noDataIndication="No Data Is Available"
                            />
                        </div>

                    )
                }
            </ToolkitProvider>
            </div>
        );
    }
}
/*
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
                            <SearchBar className='search' placeholder='Hae' {...props.searchProps} />
                            <BootstrapTable
                                hover
                                {...props.baseProps}
                                bordered={false}
                                expandRow={expandRow}
                                pagination={paginationFactory(options)}
                                noDataIndication="No Data Is Available"
                            />
                        </div>

                    )
                }
            </ToolkitProvider>
            </div>
*/

/*
const options = {
            custom: true,
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
            totalSize: tarvikkeet.length,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '2', value: 2
            }, {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: tarvikkeet.length
            }] // A numeric array is also available. the purpose of above example is custom the text
        };
*/

const mapStateToProps = state => ({
    tarvike: state.tarvike,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getTarvikkeet }
)(TarvikeTable2);