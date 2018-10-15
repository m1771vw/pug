import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  roomReducer,
  chatReducer,
});