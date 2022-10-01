import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post } from '../../typings/post';
import { AddPostToUserFavResponse } from '../../typings/user-posts_interface/addPostToUserFav.interface';

export function addPostToUserFav(
  action: 'remove' | 'add',
  postID: Post['_id']
) {
  const config: AxiosRequestConfig = {
    url: `user/profile/favourite/${action}`,
    method: 'GET',
    params: { postID }
  };
  return axios.request<AddPostToUserFavResponse>(config);
}
