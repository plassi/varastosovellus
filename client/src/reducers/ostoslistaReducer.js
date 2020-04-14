import {
  GET_OSTOSLISTAT,
  ADD_OSTOSLISTA,
  DELETE_OSTOSLISTA,
  OSTOSLISTAT_LADATAAN,
  UPDATE_OSTOSLISTA,
  SELECT_OSTOSLISTA
} from '../actions/types'

const initialState = {
  ostoslistat: [],
  ladataan: false,
  selected: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OSTOSLISTAT:
      return {
        ...state,
        ostoslistat: action.payload,
        ladataan: false
      }
    case DELETE_OSTOSLISTA:
      // Jos poistettava ostoslista on sama, kuin selected ostoslista, poistetaan myös selected.
      if (action.payload === state.selected.id) {
        return {
          ...state,
          ostoslistat: state.ostoslistat.filter(ostoslista => ostoslista.id !== action.payload),
          selected: null
        }
      }
      return {
        ...state,
        ostoslistat: state.ostoslistat.filter(ostoslista => ostoslista.id !== action.payload)
      }
    case UPDATE_OSTOSLISTA:
      console.log(state)
      console.log(action.payload)

      return {
        ...state,
        ostoslistat: [...state.ostoslistat.map(ostoslista => ostoslista.id === action.payload.id ? action.payload : ostoslista)]
      }
    case ADD_OSTOSLISTA:
      return {
        ...state,
        ostoslistat: [...state.ostoslistat, action.payload]
      }
    case OSTOSLISTAT_LADATAAN:
      return {
        ...state,
        ladataan: true
      }
    case SELECT_OSTOSLISTA:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}
