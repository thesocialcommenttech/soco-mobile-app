import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MovePostToTrashResponse } from '../../typings/trash_interface/movePostToTrash.interface';

export function movePostToTrash(): Promise<
  AxiosResponse<MovePostToTrashResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/post/trash',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<MovePostToTrashResponse>(config);
}
