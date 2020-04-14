import axios from 'axios'
import { GET_OSTOSLISTAT, ADD_OSTOSLISTA, DELETE_OSTOSLISTA, OSTOSLISTAT_LADATAAN, UPDATE_OSTOSLISTA, SELECT_OSTOSLISTA } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getOstoslistat = () => (dispatch, getState) => {
  dispatch(setOstoslistatLadataan())
  axios
    .get('/api/ostoslistat', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_OSTOSLISTAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const addOstoslista = ostoslista => (dispatch, getState) => {
  axios
    .post('/api/ostoslistat', ostoslista, tokenConfig(getState))
    .then(res => {

      dispatch({
        type: ADD_OSTOSLISTA,
        payload: res.data
      })

      dispatch({
        type: SELECT_OSTOSLISTA,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deleteOstoslista = id => (dispatch, getState) => {
  axios
    .delete(`/api/ostoslistat/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_OSTOSLISTA,
        payload: id
      })
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const updateOstoslista = ostoslista => (dispatch, getState) => {
  axios
    .put(`/api/ostoslistat/${ostoslista.id}`, ostoslista, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_OSTOSLISTA,
        payload: res.data
      })

      console.log(ostoslista)
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const setOstoslistatLadataan = () => {
  return {
    type: OSTOSLISTAT_LADATAAN
  }
}

export const selectOstoslista = ostoslista => (dispatch) => {
  dispatch({
    type: SELECT_OSTOSLISTA,
    payload: ostoslista
  })
}

