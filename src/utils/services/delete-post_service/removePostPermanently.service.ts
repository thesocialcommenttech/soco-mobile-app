import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemovePostPermanentlyResponse } from '../../typings/delete-post_interface/removePostPermanently.interface';
import { Post } from '../../typings/post';

export function removePostPermanently(postID: Post['_id']) {
  const config: AxiosRequestConfig = {
    url: 'user/post/delete',
    method: 'GET',
    params: { postID }
  };

  return axios.request<RemovePostPermanentlyResponse>(config);
}
