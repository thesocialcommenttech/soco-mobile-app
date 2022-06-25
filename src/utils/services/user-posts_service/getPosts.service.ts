import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetPostsResponse } from '../../typings/user-posts_interface/getPosts.interface';

export function getPosts(
  userID: string
): Promise<AxiosResponse<GetPostsResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/post/all',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { userID: userID }
  };
  return axios.request<GetPostsResponse>(config);
}
