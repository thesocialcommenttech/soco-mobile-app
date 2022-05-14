import { combineReducers } from 'redux';
import { authReducer, IAuthState } from './auth';
import registerReducer from './register';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer
});

export interface IRootReducer {
  auth: IAuthState;
}

export default rootReducer;
