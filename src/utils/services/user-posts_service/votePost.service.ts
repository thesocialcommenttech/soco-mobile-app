import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  VotePostResponse,
  VotePostRequest
} from '../../typings/user-posts_interface/votePost.interface';

export function votePost({
  type
}: VotePostRequest): Promise<AxiosResponse<VotePostResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/post/vote/${type}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<VotePostResponse>(config);
}
