import {
  deleteAuthCredentials,
  setAuthCredentials
} from '../../lib/auth-credentials';
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
  token: null
};

export const authReducer = async (
  state: IAuthState = initState,
  action: AuthActionTypes
): Promise<IAuthState> => {
  switch (action.type) {
    case AuthAction.LOGIN:
      await setAuthCredentials({
        user_id: action.payload.user._id,
        token: action.payload.token
      });

      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case AuthAction.LOGOUT:
      await deleteAuthCredentials();
      return initState;

    default:
      return state;
  }
};
