import React, { Component } from 'react'
import { Button, Table, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AiOutlineDelete, AiOutlineUnorderedList } from 'react-icons/ai'
import { deleteOstoslista, selectOstoslista } from '../../actions/ostoslistaActions'
import { returnMessages, clearMessages } from '../../actions/messageActions'
import confirm from "reactstrap-confirm";

class OstoslistatTable extends Component {

  state = {
    expandedRows: []
  }

  static propTypes = {
    deleteOstoslista: PropTypes.func.isRequired,
    selectOstoslista: PropTypes.func.isRequired,
    returnMessages: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired,
    ostoslista: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  renderItem(ostoslista) {

    const onDeleteClick = (id) => {
      confirm({
        title: (
          <>
            HUOM!
          </>
        ),
        message: "Oletko varma, että haluat poistaa ostoslistan?",
        confirmText: "Poista",
        confirmColor: "dark",
        cancelColor: "link text-danger",
        cancelText: "Peruuta"
      })
        .then((varmistus) => {
          if (varmistus) {
            this.props.deleteOstoslista(id)
            this.props.returnMessages('ostoslista poistettu')
            setTimeout(() => this.props.clearMessages(), 5000)
          }
        })

    }

    const openClick = () => {
      this.props.selectOstoslista(ostoslista)
      this.props.returnMessages(`ostoslista ${ostoslista.nimi} avattu`)
      setTimeout(() => this.props.clearMessages(), 5000)
    }

    const ostoslistaRows = [
      <tr id="hiddenRow" key={'row-data-' + ostoslista.id}>
        <td >{ostoslista.nimi}</td>
        <td style={{ textAlign: 'center' }}>
          <Row>
            <Col style={{textAlign:'right'}}>
              <Button
                id='ostoslista-avaa-button'
                color='dark'
                size='sm'
                style={{ marginRight: '8px' }}
                onClick={openClick.bind(this, ostoslista.id)}
              >
                <AiOutlineUnorderedList />
              </Button>
            </Col>
            <Col style={{textAlign:'left'}}>
              <Button
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={onDeleteClick.bind(this, ostoslista.id)}
              >
                <AiOutlineDelete />
              </Button>
            </Col>
          </Row>
        </td>
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
              <th style={{ textAlign: 'center' }}><Row><Col style={{ textAlign: 'right' }}>Avaa</Col><Col style={{ textAlign: 'left' }}>Poista</Col></Row></th>
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
  { deleteOstoslista, selectOstoslista, returnMessages, clearMessages }
)(OstoslistatTable)