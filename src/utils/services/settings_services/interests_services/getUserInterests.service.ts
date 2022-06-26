import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserInterestsResponse } from '~/src/utils/typings/settings_interfaces/interests_interface/getUserInterests.interface';

export function getUserInterests(): Promise<
  AxiosResponse<GetUserInterestsResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/interest',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetUserInterestsResponse>(config);
}
