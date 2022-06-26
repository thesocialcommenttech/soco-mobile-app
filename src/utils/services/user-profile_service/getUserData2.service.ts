import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserData2Response } from '../../typings/user-profile_interface/getUserData2.interface';

export function getUserData2(
  username: string
): Promise<AxiosResponse<GetUserData2Response>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/profile/2/${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetUserData2Response>(config);
}
