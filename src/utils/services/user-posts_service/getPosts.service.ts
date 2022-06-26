import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetPostsResponse } from '../../typings/user-posts_interface/getPosts.interface';

export function getPosts(): Promise<AxiosResponse<GetPostsResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/post/all',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetPostsResponse>(config);
}
