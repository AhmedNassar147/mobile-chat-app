import { combineReducers } from 'redux';
import loginReducer from './login';
import chatReducer from './chat';

export default combineReducers({
  auth: loginReducer,
  chat: chatReducer
});