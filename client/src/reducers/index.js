import { combineReducers } from 'redux';
import tarvikeReducer from './tarvikeReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  tarvike: tarvikeReducer,
  error: errorReducer,
  auth: authReducer
});
