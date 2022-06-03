import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserProfileDataResponse } from '../../typings/user-profile_interface/getUserProfileData.interface';

export function getUserProfileData(): Promise<
  AxiosResponse<GetUserProfileDataResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/profile/data',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetUserProfileDataResponse>(config);
}
