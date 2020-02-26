import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTarvikkeet, deleteTarvike } from '../actions/tarvikeActions';
import PropTypes from 'prop-types';
import "./componentStyles.css"

class TarvikeLista extends Component {
  static propTypes = {
    getTarvikkeet: PropTypes.func.isRequired,
    tarvike: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getTarvikkeet();
  }

  onDeleteClick = id => {
    this.props.deleteTarvike(id);
  };
        
     
  render() {
    const { tarvikkeet } = this.props.tarvike;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='tarvike-lista'>
            <Table className='table'>
              <thead>
                <tr>
                  <th>Kategoria</th>
                  <th>Nimi</th>                  
                  <th>Määrä</th>
                  <th>Yksikkö</th>
                  <th>Sijainti</th>
                  <th>Lisätiedot</th>
                </tr>
              </thead>
              {tarvikkeet.map(({ _id, nimi, kategoria,
                kuvaus, maara, maarayksikko, sijainti, avainsanat, kuva }) => (
                  <CSSTransition key={_id} timeout={500} classNames='fade'>

                    <tbody>
                      <tr>
                        <td>{kategoria}</td>
                        <td>{nimi}</td>                        
                        <td>{maara}</td>
                        <td>{maarayksikko}</td>
                        <td>{sijainti}</td>
                        <td>-></td>
                      </tr>
                    </tbody>

                  </CSSTransition>
                ))}
            </Table>
          </TransitionGroup>
        </ListGroup>
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
)(TarvikeLista);
