import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTarvikkeet, deleteTarvike } from '../actions/tarvikeActions';
import PropTypes from 'prop-types';

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
            <Table>
              <thead>
                <tr>
                  <th>Kategoria</th>
                  <th>Nimi</th>
                  <th>Kuvaus</th>
                  <th>Määrä</th>
                  <th>Yksikkö</th>
                  <th>Sijainti</th>
                  <th>Avainsanat</th>
                  <th>Kuva</th>
                  <th>Poista</th>
                </tr>
              </thead>
              {tarvikkeet.map(({ _id, nimi, kategoria,
                kuvaus, maara, maarayksikko, sijainti, avainsanat, kuva }) => (
                  <CSSTransition key={_id} timeout={500} classNames='fade'>



                    <tbody>
                      <tr>
                        <td>{kategoria}</td>
                        <td>{nimi}</td>
                        <td>{kuvaus}</td>
                        <td>{maara}</td>
                        <td>{maarayksikko}</td>
                        <td>{sijainti}</td>
                        <td>{avainsanat}</td>
                        <td>{kuva}</td>

                        <td>

                          {this.props.isAuthenticated ? (

                            <Button
                              className='remove-btn'
                              color='danger'
                              size='sm'
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              &times;
                    </Button>
                          ) : null}

                        </td>
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
