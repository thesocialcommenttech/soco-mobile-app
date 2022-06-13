import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AddPostToUserFavResponse } from '../../typings/user-posts_interface/addPostToUserFav.interface';

export function addPostToUserFav(action:string): Promise<AxiosResponse<AddPostToUserFavResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/profile/favourite/${action}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<AddPostToUserFavResponse>(config);
}
