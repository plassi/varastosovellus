import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOstoslistat } from '../../actions/ostoslistaActions'
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class OstoslistaTable extends Component {
    state = {
        columns: [{
            dataField: '',
            text: 'Nimi',
            sort: true,
        }, {
            dataField: '',
            text: 'Määrä',
            sort: true,
        },
        ],
    }

    static propTypes = {
        getOstoslistat: PropTypes.func.isRequired,
        ostoslista: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getOstoslistat()

    }

    renderItem(ostoslista) {
       
        const ostoslistaRows = [
            <tr key={"row-data-" + ostoslista.id}>
                <td>{}</td>
                <td>{}</td>
                <td></td>
                <td></td>
            </tr>
        ];
    
        return ostoslistaRows;
    }

    render() {
        const { ostoslistat } = this.props.ostoslista
       console.log("tarvikkeet: " , ostoslistat

       )
        return (
            <div>
                <h6>Ostoslista</h6>
                <BootstrapTable
                    keyField="id"
                    data={ostoslistat}
                    columns={this.state.columns}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ostoslista: state.ostoslista,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getOstoslistat }
)(OstoslistaTable);