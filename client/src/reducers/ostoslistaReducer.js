import {
    GET_OSTOSLISTAT,
    ADD_OSTOSLISTA,
    DELETE_OSTOSLISTA,
    OSTOSLISTAT_LADATAAN,
    UPDATE_OSTOSLISTA
  } from '../actions/types';
  
  const initialState = {
    ostoslistat: [],
    ladataan: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_OSTOSLISTAT:
        return {
          ...state,
          ostoslistat: action.payload,
          ladataan: false
        };
      case DELETE_OSTOSLISTA:
        return {
          ...state,
          ostoslistat: state.ostoslistat.filter(ostoslista => ostoslista._id !== action.payload)
        };
      case UPDATE_OSTOSLISTA:
        console.log(state);
        console.log(action.payload);
        
        return {
          ...state,
          ostoslistat: [...state.ostoslistat.map(ostoslista => ostoslista.id === action.payload.id ? ostoslista = action.payload : ostoslista)]
        }
      case ADD_OSTOSLISTA:
        return {
          ...state,
          ostoslistat: [action.payload, ...state.ostoslistat]
        };
      case OSTOSLISTAT_LADATAAN:
        return {
          ...state,
          ladataan: true
        };
      default:
        return state;
    }
  }
  