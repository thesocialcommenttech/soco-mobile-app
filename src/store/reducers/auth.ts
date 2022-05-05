import {
  deleteAuthCredentials,
  setAuthCredentials
} from '~/src/lib/auth-credentials';
import { AuthActionTypes, AuthAction } from '../actions/auth';

export interface IUserData {
  _id: string;
  username?: string;
  name?: string;
  email?: string;
  profileImage?: string;
}

export interface IAuthData {
  token: string;
  user: IUserData;
}
export interface IAuthState extends IAuthData {
  authenticated: boolean;
}

const initState: IAuthState = {
  user: null,
  authenticated: false,
  token: 'hellowtoken'
};

export const authReducer = (
  state: IAuthState = initState,
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case AuthAction.LOGIN:
      setAuthCredentials({
        token: action.payload.token
      });

      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case AuthAction.LOGOUT:
      deleteAuthCredentials();
      return initState;

    default:
      return state;
  }
};
