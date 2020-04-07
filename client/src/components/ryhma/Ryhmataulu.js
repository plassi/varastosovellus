import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import { connect } from 'react-redux'
import "../componentStyles.css"
class Ryhmataulu extends Component {

  state = {
    expandedRows: []
  }


  render() {

    return (
      <Container>

        <Table className="table-hover">
          <thead>
            <tr>
              <th>Rooli</th> 
              <th>Nimi/Ryhmä</th>
              <th>Lisätietoja</th>           
            </tr>
          </thead>

        </Table>
      </Container>
        
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
)(Ryhmataulu);