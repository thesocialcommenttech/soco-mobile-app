import { authReducer, IAuthState } from './auth';

const rootReducer = {
  auth: authReducer
};

export interface IRootReducer {
  auth: IAuthState;
}

export default rootReducer;
