import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemovePostPermanentlyResponse } from '../../typings/delete-post_interface/removePostPermanently.interface';

export function removePostPermanently(): Promise<AxiosResponse<RemovePostPermanentlyResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/post/delete',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<RemovePostPermanentlyResponse>(config);
}
