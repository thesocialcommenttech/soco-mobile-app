import { combineReducers } from 'redux';
import { authReducer, IAuthState } from './auth';
import registerReducer from './register';
import loginReducer from './login';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer
});

export interface IRootReducer {
  auth: IAuthState;
}

export default rootReducer;
