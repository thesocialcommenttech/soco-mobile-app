import axios, { AxiosRequestConfig } from 'axios';
import { GetUserReferredUsersResponse } from '../../typings/user-referral-data_interface/getUserReferredUsers.interface';

export function getUserReferredUsers() {
  const config: AxiosRequestConfig = {
    url: 'user/profile/referred-users',
    method: 'GET'
  };
  return axios.request<GetUserReferredUsersResponse>(config);
}
