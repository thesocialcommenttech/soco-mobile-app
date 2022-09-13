import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post } from '../../typings/post';
import { MovePostToTrashResponse } from '../../typings/trash_interface/movePostToTrash.interface';

export function movePostToTrash(
  postID: Post['_id'],
  postType: Post['postType']
) {
  const config: AxiosRequestConfig = {
    url: 'user/post/trash',
    method: 'GET',
    params: { postID, postType }
  };

  return axios.request<MovePostToTrashResponse>(config);
}
