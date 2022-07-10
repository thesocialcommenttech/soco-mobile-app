import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SearchPostResponse } from '../../typings/search_interface/searchPost.interface';

export function searchPost(
  postTitleQuery: string
): Promise<AxiosResponse<SearchPostResponse>> {
  const config: AxiosRequestConfig = {
    url: 'search/post',
    method: 'GET',
    params: { q: postTitleQuery }
  };
  return axios.request<SearchPostResponse>(config);
}
