import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetUserReferredUsersResponse } from '../../typings/user-referral-data_interface/getUserReferredUsers.interface';

export function getUserReferredUsers(): Promise<
  AxiosResponse<GetUserReferredUsersResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/profile/referred-users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetUserReferredUsersResponse>(config);
}
