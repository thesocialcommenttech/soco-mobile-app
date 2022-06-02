import { combineReducers } from 'redux';
import { authReducer, IAuthState } from './auth';
import registerReducer from './register';
import infoReducer from './info';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  userinfo: infoReducer
});

export interface IRootReducer {
  auth: IAuthState;
}

export default rootReducer;
