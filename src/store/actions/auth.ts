import { IAuthData } from '~/src/store/reducers/auth';

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

export type AuthActionTypes = ILogoutAction | ILoginAction;
