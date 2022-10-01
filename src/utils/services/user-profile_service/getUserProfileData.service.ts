import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { User } from '../../typings/user-profile_interface/getUserData.interface';
import { GetUserProfileDataResponse } from '../../typings/user-profile_interface/getUserProfileData.interface';

export function getUserProfileData<T extends keyof User>(projection: string) {
  const config: AxiosRequestConfig = {
    url: 'user/profile/data',
    method: 'GET',
    params: { proj: projection }
  };

  return axios.request<GetUserProfileDataResponse<T>>(config);
}
