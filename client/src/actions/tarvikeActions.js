import axios from 'axios'
import { GET_TARVIKKEET, ADD_TARVIKE, DELETE_TARVIKE, TARVIKKEET_LADATAAN, UPDATE_TARVIKE } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'
import { returnMessages, clearMessages } from './messageActions'

export const getTarvikkeet = () => (dispatch, getState) => {
  dispatch(setTarvikkeetLadataan())
  axios
    .get('/api/tarvikkeet', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TARVIKKEET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const addTarvike = tarvike => (dispatch, getState) => {
  axios
    .post('/api/tarvikkeet', tarvike, tokenConfig(getState))
    .then(res => {

      dispatch({
        type: ADD_TARVIKE,
        payload: res.data
      })

      dispatch(returnMessages(`Tarvike ${res.data.nimi} lisätty`))
      setTimeout(() => {
        dispatch(clearMessages())
      }, 7000)
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deleteTarvike = id => (dispatch, getState) => {
  axios
    .delete(`/api/tarvikkeet/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_TARVIKE,
        payload: id
      })
      dispatch(returnMessages(`Tarvike poistettu`))
      setTimeout(() => {
        dispatch(clearMessages())
      }, 7000)
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const updateTarvike = tarvike => (dispatch, getState) => {
  axios
    .put(`/api/tarvikkeet/${tarvike.id}`, tarvike, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_TARVIKE,
        payload: res.data
      })
      dispatch(returnMessages(`Tarviketta ${res.data.nimi} muokattu`))
      setTimeout(() => {
        dispatch(clearMessages())
      }, 7000)
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const setTarvikkeetLadataan = () => {
  return {
    type: TARVIKKEET_LADATAAN
  }
}
