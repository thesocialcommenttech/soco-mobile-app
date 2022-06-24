import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemoveUserInterestResponse } from '../../typings/user-profile_interface/removeUserInterest.interface';

export function removeUserInterest(): Promise<
  AxiosResponse<RemoveUserInterestResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/interest',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<RemoveUserInterestResponse>(config);
}
