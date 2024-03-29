import axios from 'axios';
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

export const authReducer = (
  state: IAuthState = initState,
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case AuthAction.LOGIN:
      // setting bearer token
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;

      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case AuthAction.LOGOUT:
      return initState;

    case AuthAction.UPDATE_PROFILE_IMAGE:
      const newAuthUser = { ...state.user };
      newAuthUser.profileImage = action.payload.profileImage;
      return { ...state, user: newAuthUser };

    default:
      return state;
  }
};
