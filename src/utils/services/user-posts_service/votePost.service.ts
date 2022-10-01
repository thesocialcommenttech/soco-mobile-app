import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  VotePostResponse,
  VotePostRequest
} from '../../typings/user-posts_interface/votePost.interface';

export function votePost({ voteType, postID }: VotePostRequest) {
  const config: AxiosRequestConfig = {
    url: `user/post/vote/${voteType}`,
    method: 'GET',
    params: { postID }
  };
  return axios.request<VotePostResponse>(config);
}
