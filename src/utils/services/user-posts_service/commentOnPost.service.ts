import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CommentOnPostResponse } from '../../typings/user-posts_interface/commentOnPost.interface';

export function commentOnPost(): Promise<AxiosResponse<CommentOnPostResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/post/comment/create',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<CommentOnPostResponse>(config);
}
