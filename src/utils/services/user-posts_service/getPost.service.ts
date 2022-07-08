import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetPostResponse } from '../../typings/user-posts_interface/getPost.interface';

export function getPost(
  postType: string
): Promise<AxiosResponse<GetPostResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/post/${postType}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetPostResponse>(config);
}
