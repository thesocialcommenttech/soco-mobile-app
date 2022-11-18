import { IAuthData, IAuthState } from '../../store/reducers/auth';
import { ThunkAction } from 'redux-thunk';
import {
  deleteAuthCredentials,
  setAuthCredentials,
  updateProfileImageInAuthCredentials
} from '../../lib/auth-credentials';
import { IRootReducer } from '../reducers';
import { setUser as Sentry_setUser } from '@sentry/react-native';

export enum AuthAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE'
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

interface IUpdateUserProfileImageAction {
  type: AuthAction.UPDATE_PROFILE_IMAGE;
  payload: { profileImage: string };
}

export const loginAction = (authData: IAuthData): ILoginAction => {
  // setting user data in sentry
  Sentry_setUser({
    id: authData.user._id,
    username: authData.user.username,
    email: authData.user.email
  });

  return {
    type: AuthAction.LOGIN,
    payload: authData
  };
};

export type ISetAuthToLogin = ThunkAction<any, IRootReducer, any, ILoginAction>;

export function setAuthToLogin(authData: IAuthData): ISetAuthToLogin {
  return async dispatch => {
    await setAuthCredentials({
      user: authData.user,
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

export type IUpdateUserProfileImage = ThunkAction<
  void,
  IRootReducer,
  any,
  IUpdateUserProfileImageAction
>;

export function setAuthToLogout(): ISetAuthLogout {
  return async dispatch => {
    await deleteAuthCredentials();
    dispatch(logoutAction());
  };
}

export const updateUserProfileImageAction = (
  profileImage: string
): IUpdateUserProfileImageAction => ({
  type: AuthAction.UPDATE_PROFILE_IMAGE,
  payload: { profileImage }
});

export function updateUserProfileImageGlobalState(
  profileImage: string
): IUpdateUserProfileImage {
  return async dispatch => {
    await updateProfileImageInAuthCredentials(profileImage);
    dispatch(updateUserProfileImageAction(profileImage));
  };
}

export type AuthActionTypes =
  | ILogoutAction
  | ILoginAction
  | IUpdateUserProfileImageAction;
