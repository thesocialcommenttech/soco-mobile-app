import axios, { AxiosRequestConfig } from 'axios';
import {
  GetPostRequest,
  GetPostResponse
} from '../../typings/user-posts_interface/getPost.interface';

export function getPost<T>({
  postType,
  postID,
  projection = '',
  edit
}: GetPostRequest) {
  const config: AxiosRequestConfig = {
    url: `user/post/${postType}`,
    method: 'GET',
    params: { postID, projection, ...(edit && { edit }) }
  };
  return axios.request<GetPostResponse<T>>(config);
}
