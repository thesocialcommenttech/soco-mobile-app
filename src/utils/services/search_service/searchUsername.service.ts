import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SearchUsernameResponse } from '../../typings/search_interface/searchUsername.interface';

export function searchUsername(): Promise<AxiosResponse<SearchUsernameResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/search/user',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<SearchUsernameResponse>(config);
}
