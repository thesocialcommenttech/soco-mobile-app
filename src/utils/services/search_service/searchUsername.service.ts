import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SearchUsernameResponse } from '../../typings/search_interface/searchUsername.interface';

export function searchUsername(
  usernameQuery: string
): Promise<AxiosResponse<SearchUsernameResponse>> {
  const config: AxiosRequestConfig = {
    url: 'search/user',
    method: 'GET',
    params: { q: usernameQuery }
  };
  return axios.request<SearchUsernameResponse>(config);
}
