import { IAuthData, IAuthState } from '../../store/reducers/auth';
import { ThunkAction } from 'redux-thunk';
import {
  deleteAuthCredentials,
  setAuthCredentials
} from '../../lib/auth-credentials';
import { IRootReducer } from '../reducers';

export enum AuthAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

interface ILogoutAction {
  type: AuthAction.LOGOUT;
}

export const logoutAction = (): ILogoutAction => ({
  type: AuthAction.LOGOUT
});

interface ILoginAction {
  type: AuthAction.LOGIN;
  payload: IAuthData;
}

export const loginAction = (authData: IAuthData): ILoginAction => ({
  type: AuthAction.LOGIN,
  payload: authData
});

export type ISetAuthToLogin = ThunkAction<any, IRootReducer, any, ILoginAction>;

export function setAuthToLogin(authData: IAuthData): ISetAuthToLogin {
  return async dispatch => {
    await setAuthCredentials({
      user_id: authData.user._id,
      token: authData.token
    });

    dispatch(loginAction(authData));
  };
}

export type ISetAuthLogout = ThunkAction<
  void,
  IRootReducer,
  any,
  ILogoutAction
>;

export function setAuthToLogout(): ISetAuthLogout {
  return async dispatch => {
    await deleteAuthCredentials();
    dispatch(logoutAction());
  };
}

export type AuthActionTypes = ILogoutAction | ILoginAction;
