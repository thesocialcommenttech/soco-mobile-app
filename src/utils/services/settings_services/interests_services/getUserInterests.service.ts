import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserInterestsResponse } from '~/src/utils/typings/settings_interfaces/interests_interface/getUserInterests.interface';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';

export function getUserInterests(userID: User['_id']) {
  const config: AxiosRequestConfig = {
    url: 'user/interest',
    method: 'GET',
    params: { userID }
  };

  return axios.request<GetUserInterestsResponse>(config);
}
