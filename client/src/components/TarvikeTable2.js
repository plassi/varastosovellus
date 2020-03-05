import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { getTarvikkeet } from '../actions/tarvikeActions'
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"


class TarvikeTable2 extends Component {
    state = {
        columns: [{
          dataField: 'kategoria',
          text: 'Kategoria',
          sort: true
        },
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
          }
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

        const expandRow = {
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

        return (
            <Container>
                <BootstrapTable                
                    hover
                    keyField='id'
                    data={ tarvikkeet }
                    columns={this.state.columns}
                    bordered={false}
                    expandRow={ expandRow }
                    />
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    tarvike: state.tarvike,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getTarvikkeet }
)(TarvikeTable2);