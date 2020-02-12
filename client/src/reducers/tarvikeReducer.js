import {
  GET_TARVIKKEET,
  ADD_TARVIKE,
  DELETE_TARVIKE,
  TARVIKKEET_LADATAAN
} from '../actions/types';

const initialState = {
  tarvikkeet: [],
  ladataan: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TARVIKKEET:
      return {
        ...state,
        tarvikkeet: action.payload,
        ladataan: false
      };
    case DELETE_TARVIKE:
      return {
        ...state,
        tarvikkeet: state.tarvikkeet.filter(tarvike => tarvike._id !== action.payload)
      };
    case ADD_TARVIKE:
      return {
        ...state,
        tarvikkeet: [action.payload, ...state.tarvikkeet]
      };
    case TARVIKKEET_LADATAAN:
      return {
        ...state,
        ladataan: true
      };
    default:
      return state;
  }
}
