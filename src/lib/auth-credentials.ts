import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IUserData } from '../store/reducers/auth';
import isJSON from 'is-json';

export async function deleteAuthCredentials() {
  await Promise.all([
    SecureStore.deleteItemAsync('ut'),
    SecureStore.deleteItemAsync('uid')
  ]);
  delete axios.defaults.headers.common.Authorization;
}

export async function setAuthCredentials({
  token,
  user
}: {
  token: string;
  user: IUserData;
}) {
  await Promise.all([
    SecureStore.setItemAsync('uid', user._id),
    SecureStore.setItemAsync('u', JSON.stringify(user)),
    SecureStore.setItemAsync('ut', token)
  ]);
}

export async function updateProfileImageInAuthCredentials(
  profileImage: string
) {
  const user = JSON.parse(await SecureStore.getItemAsync('u')) as IUserData;
  user.profileImage = profileImage;

  await SecureStore.setItemAsync('u', JSON.stringify(user));
}

export async function getAuthCredentials() {
  const [user_id, user, token] = await Promise.all([
    SecureStore.getItemAsync('uid'),
    SecureStore.getItemAsync('u'),
    SecureStore.getItemAsync('ut')
  ]);

  return {
    user_id,
    token,
    user: isJSON(user) && JSON.parse(user)
  };
}
