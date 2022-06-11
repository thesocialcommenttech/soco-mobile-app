import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SearchPostResponse } from '../../typings/search_interface/searchPost.interface';

export function searchPost(): Promise<AxiosResponse<SearchPostResponse>> {
  const config: AxiosRequestConfig = {
    url: '/search/post',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<SearchPostResponse>(config);
}
