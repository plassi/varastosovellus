import React, { Component } from 'react'
import { Container, Button, Table, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { getTarvikkeet, deleteTarvike } from '../../actions/tarvikeActions'
//import { getOstokset } from '../../actions/ostoksetActions'
import PropTypes from 'prop-types'
import {AiOutlineDelete} from 'react-icons/ai'

class OstoslistaTable extends Component {

  state = {
    expandedRows: []
  }

  static propTypes = {
    deleteTarvike: PropTypes.func.isRequired,
    getTarvikkeet: PropTypes.func.isRequired,
//  getOstokset: PropTypes.func.isRequired,
    tarvike: PropTypes.object.isRequired, 
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getTarvikkeet()
 //   this.props.getOstokset()
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(tarvike) {

    const onDeleteClick = (id) => this.props.deleteTarvike(id);

    const clickCallback = () => this.handleRowClick(tarvike.id);
    const tarvikeRows = [
      <tr onClick={clickCallback} key={"row-data-" + tarvike.id}>
        <td>{tarvike.nimi}</td>
        <td>{tarvike.maara} {tarvike.maarayksikko}</td>
        <td>{tarvike.maara} {tarvike.maarayksikko}</td>
        <td> <Button 
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={onDeleteClick.bind(this, tarvike.id)}
                    >
                      <AiOutlineDelete/>
                    </Button></td>
      </tr>
    ];

    if (this.state.expandedRows.includes(tarvike.id)) {
      console.log(tarvike);

      tarvikeRows.push(
        <tr key={"row-expanded-" + tarvike.id}>
          <td>{tarvike.kuvaus}</td>
          <td>{tarvike.kuva}</td>

        </tr>
      );
    }

    return tarvikeRows;
  }

  render() {
    const { tarvikkeet } = this.props.tarvike
    let allTarvikeRows = [];

    tarvikkeet.forEach(tarvike => {
      const perTarvikeRows = this.renderItem(tarvike);
      allTarvikeRows = allTarvikeRows.concat(perTarvikeRows);
    });

    return (
      <Container>

        <Table className="table-hover">
          <thead>
            <tr>
              <th>Nimi</th>
              <th>Määrä varastossa</th>
              <th>Ostettava määrä</th>
              <th>Poista</th>
            </tr>
          </thead>
          <tbody>
            {allTarvikeRows}
          </tbody>
        </Table>
        <Col>
        <Button color='dark'>Tulosta</Button>
        </Col>
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
  { getTarvikkeet, deleteTarvike }
)(OstoslistaTable);