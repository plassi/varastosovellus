import axios from 'axios';
import { GET_TARVIKKEET, ADD_TARVIKE, DELETE_TARVIKE, TARVIKKEET_LADATAAN } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTarvikkeet = () => dispatch => {
  dispatch(setTarvikkeetLadataan());
  axios
    .get('/api/tarvikkeet')
    .then(res =>
      dispatch({
        type: GET_TARVIKKEET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTarvike = tarvike => (dispatch, getState) => {
  axios
    .post('/api/tarvikkeet', tarvike, tokenConfig(getState))
    .then(res => {
            
      dispatch({
        type: ADD_TARVIKE,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTarvike = id => (dispatch, getState) => {
  axios
    .delete(`/api/tarvikkeet/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_TARVIKE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTarvikkeetLadataan = () => {
  return {
    type: TARVIKKEET_LADATAAN
  };
};