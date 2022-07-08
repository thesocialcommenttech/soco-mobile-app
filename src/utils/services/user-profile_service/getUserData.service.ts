import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserDataResponse } from '../../typings/user-profile_interface/getUserData.interface';

export function getUserData(
  username: string
): Promise<AxiosResponse<GetUserDataResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/profile/${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetUserDataResponse>(config);
}
