import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post } from '../../typings/post';
import { CommentOnPostResponse } from '../../typings/user-posts_interface/commentOnPost.interface';

export function commentOnPost(
  postID: Post['_id'],
  comment: string
): Promise<AxiosResponse<CommentOnPostResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/post/comment/create',
    method: 'GET',
    params: { postID, comment }
  };
  return axios.request<CommentOnPostResponse>(config);
}
