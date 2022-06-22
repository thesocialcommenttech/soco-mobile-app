import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export async function deleteAuthCredentials() {
  await Promise.all([
    SecureStore.deleteItemAsync('ut'),
    SecureStore.deleteItemAsync('uid')
  ]);
  delete axios.defaults.headers.common.Authorization;
}

export async function setAuthCredentials({
  user_id,
  token
}: {
  token: string;
  user_id: string;
}) {
  await Promise.all([
    SecureStore.setItemAsync('uid', user_id),
    SecureStore.setItemAsync('ut', token)
  ]);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  // set baseurl of axios
  axios.defaults.baseURL =
    'https://thesocialcomment-backend-test.herokuapp.com';
}

export async function getAuthCredentials() {
  const [user_id, token] = await Promise.all([
    SecureStore.getItemAsync('uid'),
    SecureStore.getItemAsync('ut')
  ]);

  return {
    user_id,
    token
  };
}
