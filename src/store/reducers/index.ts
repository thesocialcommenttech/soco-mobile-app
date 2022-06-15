import { combineReducers } from 'redux';
import { authReducer, IAuthState } from './auth';

const rootReducer = combineReducers({
  auth: authReducer
});

export interface IRootReducer {
  auth: IAuthState;
}

export default rootReducer;
