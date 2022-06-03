import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserInterestsResponse } from '~/src/utils/typings/settings_interfaces/interests_interface/getUserInterests.interface';

export function getUserInterests(): Promise<
  AxiosResponse<GetUserInterestsResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/interest',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetUserInterestsResponse>(config);
}
