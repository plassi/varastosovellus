import React, { Component } from 'react'
import { Container, Button, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { deleteOstoslista, selectOstoslista } from '../../actions/ostoslistaActions'
import PropTypes from 'prop-types'
import { AiOutlineDelete, AiOutlineUnorderedList } from 'react-icons/ai'

class OstoslistatTable extends Component {

  state = {
    expandedRows: []
  }

  static propTypes = {
    deleteOstoslista: PropTypes.func.isRequired,
    selectOstoslista: PropTypes.func.isRequired,
    ostoslista: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  renderItem(ostoslista) {

    const onDeleteClick = (id) => this.props.deleteOstoslista(id)
    const openClick = (id) => {
      console.log('id :', id)
      this.props.selectOstoslista(ostoslista)
    }

    const ostoslistaRows = [
      <tr key={'row-data-' + ostoslista.id}>
        <td>{ostoslista.nimi}</td>
        <td>
          <Button
            id='ostoslista-avaa-button'
            color='dark'
            size='sm'
            style={{ marginRight: '8px' }}
            onClick={openClick.bind(this, ostoslista.id)}
          >
            <AiOutlineUnorderedList />
          </Button>
          <Button
            className='remove-btn'
            color='danger'
            size='sm'
            onClick={onDeleteClick.bind(this, ostoslista.id)}
          >
            <AiOutlineDelete />
          </Button></td>
      </tr>
    ]

    return ostoslistaRows
  }

  render() {

    const { ostoslistat } = this.props.ostoslista

    const allOstoslistaRows = ostoslistat.map(ostoslista => {
      return (
        this.renderItem(ostoslista)
      )
    })

    return (
      <>
        <Table size='sm' className='table-hover'>
          <thead>
            <tr>
              <th>Ostoslista</th>
              <th>Avaa Poista</th>
            </tr>
          </thead>
          <tbody>
            {allOstoslistaRows}
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = state => ({
  ostoslista: state.ostoslista,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { deleteOstoslista, selectOstoslista }
)(OstoslistatTable)