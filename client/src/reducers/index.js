import { combineReducers } from 'redux'
import tarvikeReducer from './tarvikeReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import ostoslistaReducer from './ostoslistaReducer'
import messageReducer from './messageReducer'

export default combineReducers({
  tarvike: tarvikeReducer,
  error: errorReducer,
  auth: authReducer,
  ostoslista: ostoslistaReducer,
  message: messageReducer
})
